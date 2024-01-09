#!/usr/bin/env sh

# abort on errors
set -e

bun install
bun ./scripts/buildData.js
bun run generate

cd .output/public

git init

# comparelist.github.io uses master as the main branch
git checkout -b master

git add -A
git commit -m "deploy $(date)"

# if you are deploying to https://<USERNAME>.github.io
git push -f git@github.com:comparelist/comparelist.github.io.git master

cd ../..
