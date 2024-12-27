.PHONY: init
init:
	@pnpm install
	@mkdir -p .volumes

.PHONY: up
up:
	@docker compose up -d

.PHONY: down
down:
	@docker compose down

.PHONY: build
build:
	@docker compose build
