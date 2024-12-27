FROM node:22.12-slim AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

FROM base AS build
COPY . /usr/src/app
WORKDIR /usr/src/app
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
RUN pnpm run -r build
RUN pnpm deploy --filter=migrator --prod /prod/migrator
RUN pnpm deploy --filter=api --prod /prod/api
RUN pnpm deploy --filter=processor --prod /prod/processor

FROM base AS migrator
COPY --from=build /prod/migrator /prod/migrator
WORKDIR /prod/migrator
CMD [ "pnpm", "migrate" ]

FROM base AS api
COPY --from=build /prod/api /prod/api
WORKDIR /prod/api
CMD [ "pnpm", "start" ]

FROM base AS processor
COPY --from=build /prod/processor /prod/processor
WORKDIR /prod/processor
CMD [ "pnpm", "start" ]