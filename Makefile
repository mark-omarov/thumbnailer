IMAGE_NAME := ghcr.io/mark-omarov/thumbnailer
LATEST_VERSION := $(shell sed -n 's/.*"version": "\([^"]*\)".*/\1/p' package.json)
BUILD_PLATFORMS = linux/arm64,linux/amd64

.PHONY: init
init:
	@pnpm install
	@mkdir -p .volumes
	@pnpm exec turbo build

.PHONY: up
up:
	@docker compose up -d

.PHONY: down
down:
	@docker compose down

.PHONY: build
build:
	@docker compose build

.PHONY: test
test:
	@pnpm exec turbo test

.PHONY: tester
tester:
	@docker compose -f .github/ci.compose.yml up --abort-on-container-exit

.PHONY: version
version:
	@sh version.sh

.PHONY: release
release:
	@docker buildx build \
		--target migrator \
		-t ${IMAGE_NAME}:${LATEST_VERSION}-migrator \
		--platform ${BUILD_PLATFORMS} \
		--push \
		. &

	@docker buildx build \
		--target api \
		-t ${IMAGE_NAME}:${LATEST_VERSION}-api \
		--platform ${BUILD_PLATFORMS} \
		--push \
		. &

	@docker buildx build \
		--target processor \
		-t ${IMAGE_NAME}:${LATEST_VERSION}-processor \
		--platform ${BUILD_PLATFORMS} \
		--push \
		. &
