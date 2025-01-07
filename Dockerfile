FROM node:22.12-slim AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

FROM base AS build
COPY . /usr/src/app
WORKDIR /usr/src/app
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
RUN pnpm exec turbo @thumbnailer/api#build @thumbnailer/processor#build && \
  pnpm deploy --filter=migrator --prod /prod/migrator && \
  pnpm deploy --filter=api --prod /prod/api && \
  pnpm deploy --filter=processor --prod /prod/processor

FROM base AS tester
COPY . /usr/src/app
WORKDIR /usr/src/app
RUN pnpm install --frozen-lockfile
CMD [ "pnpm", "exec" ,"turbo", "test" ]

FROM base AS migrator
COPY --from=build /prod/migrator /prod/migrator
WORKDIR /prod/migrator
CMD [ "pnpm", "migrate" ]

FROM base AS api
COPY --from=build /prod/api /prod/api
WORKDIR /prod/api
CMD [ "node", "dist/index.js" ]

FROM base AS processor
COPY --from=build /prod/processor /prod/processor
WORKDIR /prod/processor
CMD [ "node", "dist/index.js" ]
