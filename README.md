# Thumbnailer

A simple, web-based, image to thumbnail convertor.

## How to run

> [!IMPORTANT]
> This project requires a container engine. We use Docker with Compose, but any should work as long as you got docker compose cli bindings.

To start services:

```bash
make up
```

To stop services:

```bash
make down
```

To start development:

```bash
make init
```

You only need it for LSP and editor support, unless you enjoy pain, of course.

### Available APIs

If you use [Insomia](https://insomnia.rest/), here is the [API collection json export](docs/insomnia-collection.json).

Otherwise, here are all available API endpoints:

- `GET /health` - a simple health check
- `POST /jobs` - create a new job, expects `form-data` with `image` field
- `GET /jobs` - get all jobs
- `GET /jobs/:id` - get a job by id
- `GET /jobs/:id/thumbnail` - get a thumbnail by job id

## System Architecture

The system consists of three main services:

- `api` - a simple express server responsible for creating and retrieve jobs.
  Images stored in Minio (S3 compatible storage), job's metadata stored in Postgres, and messages stored in Redis with BullMQ.

- `processor` - a worker that processes the enqueued jobs. It downloads the original image from Minio, creates the thumbnail 100x100 version, and uploads the result back to Minio.

- `migrator` - a service powered by drizzle-kit to handle database schema migrations. This service is executed before the application launches but after depending services are up (see below).

They rely on the following services:

- `minio` - S3 compatible storage. It can be swapped with any other S3 provider with minimal changes.

- `postgres` - database to store job's metadata.

- `redis` - key-value store powering BullMQ for decoupled job processing.

## Reasoning

### Architectural decisions

- I use a distributed queue over simpler webhooks for reliability, scalability, and resilience. Even if the `processor` service is down, all enqueued messages will begin processing as soon as at least one instance of the `processor` is up and running.
- For object storage I went with Minio for its S3 compatibility, it can be replaced with any S3 provider with minimal changes.
- The application is built with hexagonal architecture in mind allowing easy implementation of different adapters.
- Database schema definition and migrations powered by drizzle. It's a great mixture of tools providing TS support without abstracting too much. The migration tool is an added benefit I would like to highlight.

### Monorepo setup

- I'm a big fan and contributor of pnpm. It's workspace protocol powers this monorepo.
- For the build system I usually go with Nx, but went with Turborepo this time as it became more robust in the recent years since I last time tried it. For my requirements, it's great, and might be my new go-to build system.
- Test runner for CI is implemented with GHA using docker compose, see details in `Makefile` and `.github/ci.compose.yml`.
- Versioning is powered by [changesets](https://github.com/changesets/changesets). I love their file-based tracking, fantastic monorepo support, automatic version bumping, and changelog generation. It can be paired with a bot and gha workflow to automate the release and publishing process, but at the moment I do not consider implementing this part, mostly because I don't expect often releases on this project.

### Containerization

- All services run in containers and can be started with `docker compose up`, however, I recommend using provided `Makefile` to execute tasks.
- Each service is stateless, scaling is straightforward.
- There is single `Dockerfile` to get maximum efficiency out of pnpm. All packages built and deployed in multiple stages with local caching. PNPM also powers production of deployable packages with `pnpm deploy` command.

> [!NOTE]
> The caching is configured for local development only.
> To optimize for CI runs it would require small update to support different caching types, such as `gha`.

## Trade-offs and what's left out

- A proper observability stack (eg. Prometherus, Grafana, ELK, Datadog, New Relic) was skipped due to time constraints and complexity.
  In a production environment, we'd have structured logs, metrics, tracing, and alerting to identify and troubleshoot issues.
- Error handling is currently minimal. In production, each service would gracefully handle and report issues.
- Input validation is skipped. I would implement input validation with Zod using express middleware. Proper validation would be essential in production environment.
  There's some form of validation, but not for inputs (yet).
- OpenAPI spec is missing. Adding this would make the APIs more transparent and serve as documentation.
- Tests implemented with vitest, but so far only a few units are covered.

## Future plans

I built this service as an assignment but now consider completing it and bringing to production. I might add UI service as well, I wanted to try Astro for a very long time, this might be it.

To address production readiness I would consider:

- Scalability: Each service already can scale horizontally. BullMQ can handle increased queue throughput, and Redis, Postgres, and Minio can be upgraded to managed services with minimal changes. That is considering I don't wish to maintain self-hosted options myself.
- Performance: Processor service is likely the heavies part, but iirc BullMQ already balances the load, additional instances can be brought up for faster processing.
- Monitoring: Goes without saying, for production I would likely go with self-hosted community version of [hyperdx](https://github.com/hyperdxio/hyperdx) (which I happened to contribute to btw).
- Security: There's no access control and rate-limiting as it wasn't a requirement. Going production I would consider adding at least one of those.
