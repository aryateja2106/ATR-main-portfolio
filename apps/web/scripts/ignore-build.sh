#!/bin/bash
set -euo pipefail

BRANCH="${VERCEL_GIT_COMMIT_REF:-}"

cat <<MSG
🔍 Vercel ignored build check
Branch: ${BRANCH}
MSG

if [[ "${BRANCH}" == "main" ]] || [[ -z "${BRANCH}" ]]; then
  echo "✅ Building deployment for '${BRANCH:-main}'"
  exit 1
fi

echo "⏭️  Skipping deployment for branch '${BRANCH}'"
exit 0
