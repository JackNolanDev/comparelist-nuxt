#!/usr/bin/env sh

# abort on errors
set -e

node ./scripts/buildData.js
pnpm run generate

cd .output/public

# prevents github pages from using jekyll, since we need to serve files starting an underscore _
# https://github.blog/2009-12-29-bypassing-jekyll-on-github-pages/
touch .nojekyll

# git init

# # comparelist.github.io uses master as the main branch
# git checkout -b master

# git add -A
# git commit -m "deploy $(date)"

# # if you are deploying to https://<USERNAME>.github.io
# git push -f git@github.com:comparelist/comparelist.github.io.git master

cd ../..
