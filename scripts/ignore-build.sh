#!/bin/bash

# This script determines whether Vercel should build the project
# Exit code 0 = Don't build (skip)
# Exit code 1 = Proceed with build

echo "🔍 Checking if build should proceed..."
echo "Current branch: $VERCEL_GIT_COMMIT_REF"

# Only build if we're on the main branch
if [[ "$VERCEL_GIT_COMMIT_REF" == "main" ]]; then
  echo "✅ Building main branch"
  exit 1
else
  echo "⏭️  Skipping build for branch: $VERCEL_GIT_COMMIT_REF"
  echo "Only the 'main' branch triggers production deployments"
  exit 0
fi

