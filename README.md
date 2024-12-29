# Thumbnailer

A simple web-based image to thumbnail convertor.

Author: [Mark Omarov](https://github.com/mark-omarov)

## How to run

Make sure you have Docker and Docker Compose, if you use Podman or any other container engine, you'll need to adjust the `Makefile` or use docker bindings in your engine.

To run locally without LSP and editor support - `make up`.
It will launch all services, wait for infrastructure, apply migrations, and start the application.

To stop - `make down`.

If you need the LSP and editor support (usually for development only), run `make init`.
It will install dependencies and build the project.

### Available APIs

If you use [Insomia](https://insomnia.rest/), below is the json export for the API collection.
Import it to get a better experience. Don't forget to update URLs to your environment.

<details>
<summary>API Collection</summary>

```json
{
  "_type": "export",
  "__export_format": 4,
  "__export_date": "2024-12-27T15:21:22.090Z",
  "__export_source": "insomnia.desktop.app:v9.3.2",
  "resources": [
    {
      "_id": "req_40ca0a0efe96494fb37bc5bc66433d46",
      "parentId": "wrk_3013f1bc07834376b8101a59d7574bcd",
      "modified": 1735312844864,
      "created": 1735274655339,
      "url": "http://localhost:3000/health",
      "name": "Health",
      "description": "",
      "method": "GET",
      "body": {},
      "parameters": [],
      "headers": [
        {
          "name": "User-Agent",
          "value": "insomnia/9.3.2",
          "id": "pair_5ddb7b6ec3a24c339be362d3902fc547"
        }
      ],
      "authentication": {},
      "metaSortKey": -1735280829243,
      "isPrivate": false,
      "pathParameters": [],
      "settingStoreCookies": true,
      "settingSendCookies": true,
      "settingDisableRenderRequestBody": false,
      "settingEncodeUrl": true,
      "settingRebuildPath": true,
      "settingFollowRedirects": "global",
      "_type": "request"
    },
    {
      "_id": "wrk_3013f1bc07834376b8101a59d7574bcd",
      "parentId": null,
      "modified": 1735312131380,
      "created": 1735274647532,
      "name": "Thimbnailer API",
      "description": "",
      "scope": "collection",
      "_type": "workspace"
    },
    {
      "_id": "req_8b2d2a4dac394d42a9020986db787161",
      "parentId": "wrk_3013f1bc07834376b8101a59d7574bcd",
      "modified": 1735312851310,
      "created": 1735283320176,
      "url": "http://localhost:3000/jobs/",
      "name": "Get Jobs",
      "description": "",
      "method": "GET",
      "body": {},
      "parameters": [],
      "headers": [{ "name": "User-Agent", "value": "insomnia/9.3.2" }],
      "authentication": {},
      "metaSortKey": -1735280829193,
      "isPrivate": false,
      "pathParameters": [],
      "settingStoreCookies": true,
      "settingSendCookies": true,
      "settingDisableRenderRequestBody": false,
      "settingEncodeUrl": true,
      "settingRebuildPath": true,
      "settingFollowRedirects": "global",
      "_type": "request"
    },
    {
      "_id": "req_fbbdbea9d3054c8d997d26828e26dc0a",
      "parentId": "wrk_3013f1bc07834376b8101a59d7574bcd",
      "modified": 1735312838711,
      "created": 1735283242543,
      "url": "http://localhost:3000/jobs/d1693d57-ced5-42e8-abe1-6279077e07e6",
      "name": "Get Job",
      "description": "",
      "method": "GET",
      "body": {},
      "parameters": [],
      "headers": [{ "name": "User-Agent", "value": "insomnia/9.3.2" }],
      "authentication": {},
      "metaSortKey": -1735280829168,
      "isPrivate": false,
      "pathParameters": [],
      "settingStoreCookies": true,
      "settingSendCookies": true,
      "settingDisableRenderRequestBody": false,
      "settingEncodeUrl": true,
      "settingRebuildPath": true,
      "settingFollowRedirects": "global",
      "_type": "request"
    },
    {
      "_id": "req_422f48720f4549ae9700e9489c7c1489",
      "parentId": "wrk_3013f1bc07834376b8101a59d7574bcd",
      "modified": 1735312873294,
      "created": 1735283306881,
      "url": "http://localhost:3000/jobs/d1693d57-ced5-42e8-abe1-6279077e07e6/thumbnail",
      "name": "Get Thumbnail",
      "description": "",
      "method": "GET",
      "body": {},
      "parameters": [],
      "headers": [{ "name": "User-Agent", "value": "insomnia/9.3.2" }],
      "authentication": {},
      "metaSortKey": -1735280829155.5,
      "isPrivate": false,
      "pathParameters": [],
      "settingStoreCookies": true,
      "settingSendCookies": true,
      "settingDisableRenderRequestBody": false,
      "settingEncodeUrl": true,
      "settingRebuildPath": true,
      "settingFollowRedirects": "global",
      "_type": "request"
    },
    {
      "_id": "req_12d28b1930314dc0aecf01672db70a1b",
      "parentId": "wrk_3013f1bc07834376b8101a59d7574bcd",
      "modified": 1735312867966,
      "created": 1735280829143,
      "url": "http://localhost:3000/jobs",
      "name": "Upload Job",
      "description": "",
      "method": "POST",
      "body": {
        "mimeType": "multipart/form-data",
        "params": [
          {
            "id": "pair_53397c5f6ae341bbb951cb9f620512be",
            "name": "image",
            "value": "",
            "description": "",
            "disabled": false,
            "type": "file"
          }
        ]
      },
      "parameters": [],
      "headers": [
        { "name": "Content-Type", "value": "multipart/form-data" },
        { "name": "User-Agent", "value": "insomnia/9.3.2" }
      ],
      "authentication": {},
      "metaSortKey": -1735280829055.5,
      "isPrivate": false,
      "pathParameters": [],
      "settingStoreCookies": true,
      "settingSendCookies": true,
      "settingDisableRenderRequestBody": false,
      "settingEncodeUrl": true,
      "settingRebuildPath": true,
      "settingFollowRedirects": "global",
      "_type": "request"
    },
    {
      "_id": "env_07d9dfd128d80e278b30d3210a6a740d34013cc7",
      "parentId": "wrk_3013f1bc07834376b8101a59d7574bcd",
      "modified": 1735274647534,
      "created": 1735274647534,
      "name": "Base Environment",
      "data": {},
      "dataPropertyOrder": null,
      "color": null,
      "isPrivate": false,
      "metaSortKey": 1735274647534,
      "_type": "environment"
    },
    {
      "_id": "jar_07d9dfd128d80e278b30d3210a6a740d34013cc7",
      "parentId": "wrk_3013f1bc07834376b8101a59d7574bcd",
      "modified": 1735274647536,
      "created": 1735274647536,
      "name": "Default Jar",
      "cookies": [],
      "_type": "cookie_jar"
    }
  ]
}
```

</details>

Otherwise, here are all available API endpoints:

- `GET /health` - a simple health check
- `POST /jobs` - create a new job, expects `form-data` with `image` field
- `GET /jobs` - get all jobs
- `GET /jobs/:id` - get a job by id
- `GET /jobs/:id/thumbnail` - get a thumbnail by job id

## System Architecture

The system consists of three main services:

- `api` - a simple express server responsible for creating and retrievign jobs.
  When a user upploads an image, it's stored in Minio (S3 compatible storage), saves the job's metadata in Postgres, and enqueus the message via BullMQ (Redis-based job queue).

- `processor` - a worker that processes the enqueued jobs. It downloads the original image from Minio, creates the thumbnail 100x100 version, and uploads the result back to Minio.

- `migrator` - a service powered by drizzle-kit to handle database schema migrations. This service is executed before the application launches but after depending services are up (see below).

They rely on the following services that can be hosted separately if needed:

- `minio` - S3 compatible srotage, it can easily be swapped with any other S3 provider.

- `postgres` - database to store job's metadata.

- `redis` - key-value store powering BullMQ for decoupled job processing.

## Reasoning

1. Architecture and communication:

- I chose to use a distribured queue over simpler webhooks for reliability and scalability. It gives clear separation of concerns - the `api` service fucuses on handling requests and saving data, while the `processor` handles the image processing asynchronously.
- For object storage I went with minio for it's S3 compatilibity, meaning we can easily switch to any S3 provider as needed.
- The application is build with hexagonal architecture in mind allowing easy implementation of different adapters. As long as adapters match the ports, it's simple and quick to swap technologies.
- I decided to use drizzle for it's typescript support. It provides a good set of tools without abstracting the details allowing efficient queries. It also handles schema migrations automatically with it's drizzle-kit.

2. Monorepo setup

- I'm a big fan and contributor of pnpm. It's workspace protocol powers this monorepo and allows easy code sharing across services. It also makes dependency management exceptionally easy.
- For build system I often go with Nx, but decided to give Turborepo a chance. For what is required on this project, it works greatly. I primarily use it for task execution, eg. build dependencies before dependents.
- Test runner for CI is implemented with GHA using docker compose, see details in `Makefile` and `.github/ci.compose.yml`.
- Versioning is configured with [changesets](https://github.com/changesets/changesets). I love the file-based tracking and automated bumping and changelog generation. It can be paired with a bot and gha workflow to automate the release and publishing process, but I won't set it up for this project.

3. Containerized services

- All services run in containers and can easily by started by `compose` (supports all container engines but might require docker cli bindings, depending on the engine)
- Each service is stateless, so scaling horizontally is straightforward.
- I use sindle `Dockerfile` to get maximum efficiency out of pnpm. All packages built and deployed in multiple stages with local caching. I also use `pnpm deploy` to produce slim distributions. Note: to optimize for CI runs it would require small update for it's caching mechanism.

## Trade-offs and what's left out

- A proper observability stack (eg. Prometherus, Grafana, ELK, Datadog, New Relic) was skipped due to time constraints.
  In a production environment, we'd have structured logs, metrics, tracing, and alerting to identify and troubleshoot issues.
- Error handling is currently minimal. In production, each service would gracefully handle and report issues.
- Input validation is skipped. I would implement input validation with Zod using express middleware. Proper validation would be essential in production environment.
  There's some form of validation, but not for inputs.
- OpenAPI spec is missing. Adding this would make the APIs more transpacent and serve as documentation for other developers.
- There's an issue with naming collisions. Right now, if someone uploads a file named `thumbnail`, there could be a collision between original image and thumbnail. The fix is simple, a different naming schemen could be employed, but it's importance depends whether I wish to preserve the original image or not.
- The system is mostly stateless and scalable, but the job statuses might need refinement to ensure two processors don't process the same job simultaneously. This would require locking or load balancing.
- Tests implemented with vitest, I only covered a few units so far.

## Future imporovements and production readiness

- Scalability

Each service can scale horizontally by adding more containers. BullMQ can handle increased queue throughput, and Redis, Postgres, and Minio can be upgraded to managed services with minimal changes.

- Perormance

Processor tasks can be parallelized if image transformations become a bottleneck. And Postgres indexing and query optimization can help under high W/R loads.

- Monitoring

Application metrics and log collection with alerting would be required for production environment as well.

- Security

As it stands there's not access control. For production environment all endpoints would require some for of restricted access.
