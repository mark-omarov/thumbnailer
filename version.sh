#!/bin/env zsh

set -eu
set -o pipefail

pnpm exec changeset version

# collect versions of all services
VERSIONS=()
for d in services/*; do
  if [ -f "$d/package.json" ]; then
    v=$(jq -r '.version' "$d/package.json")
    VERSIONS+=("$v")
  fi
done

# check if all versions are the same
REF="${VERSIONS[0]}"
for v in "${VERSIONS[@]}"; do
  if [ "$v" != "$REF" ]; then
    echo "Error: version mismatch, check and try again"
    exit 1
  fi
done

# update root package.json version
sed -i '' -e "s/\"version\": \".*\"/\"version\": \"${REF}\"/g" ./package.json
echo "Updated root package.json version to ${REF}"

echo "Run 'make release' to publish new version"
