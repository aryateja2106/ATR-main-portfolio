# Vercel Deployment Configuration

## Overview
This project is configured to only deploy the `main` branch to production. Feature branches and development branches will not trigger Vercel builds, allowing developers to work freely without unnecessary deployments.

## Configuration Files

### 1. `vercel.json`
Located at the root of the project, this file contains:
- **Cron jobs**: Scheduled tasks for the application
- **Git deployment settings**: Specifies which branches can be deployed
- **Ignore command**: Points to the build decision script

```json
{
  "crons": [...],
  "git": {
    "deploymentEnabled": {
      "main": true
    }
  },
  "ignoreCommand": "bash scripts/ignore-build.sh"
}
```

### 2. `scripts/ignore-build.sh`
This bash script determines whether Vercel should proceed with a build:
- **Exit code 0**: Skip the build (ignore)
- **Exit code 1**: Proceed with the build

The script checks the `VERCEL_GIT_COMMIT_REF` environment variable to determine the current branch.

## How It Works

1. **Push to any branch**: When you push code to any branch, Vercel receives a webhook
2. **Branch check**: Vercel runs the ignore build script
3. **Decision**:
   - If branch is `main`: Build proceeds → Production deployment
   - If branch is anything else: Build is skipped → No deployment

## Branch Strategy

### ✅ Main Branch
- **Deploys**: Yes, always
- **Environment**: Production
- **URL**: Your primary domain

### 🚫 Feature/Development Branches
- **Deploys**: No
- **Preview**: Not created
- **Purpose**: Safe development without triggering builds

## Testing the Configuration

### Test 1: Push to Feature Branch
```bash
git checkout -b feature/test-deployment
git commit --allow-empty -m "test: Verify no deployment on feature branch"
git push origin feature/test-deployment
```
**Expected**: Vercel shows "Skipped" status, no build runs

### Test 2: Push to Main Branch
```bash
git checkout main
git commit --allow-empty -m "test: Verify deployment on main branch"
git push origin main
```
**Expected**: Vercel builds and deploys successfully

## Vercel Dashboard Settings

You should also verify in your Vercel dashboard:

1. **Project Settings** → **Git**
2. **Production Branch**: Set to `main`
3. **Ignored Build Step**: Should show the custom command from `vercel.json`

## Modifying the Configuration

### To Allow Multiple Branches
Edit `vercel.json` to add more branches:
```json
{
  "git": {
    "deploymentEnabled": {
      "main": true,
      "staging": true
    }
  }
}
```

### To Customize Build Logic
Edit `scripts/ignore-build.sh` to add custom conditions:
```bash
# Example: Also build branches starting with "release/"
if [[ "$VERCEL_GIT_COMMIT_REF" == "main" ]] || [[ "$VERCEL_GIT_COMMIT_REF" == release/* ]]; then
  echo "✅ Building: $VERCEL_GIT_COMMIT_REF"
  exit 1
else
  echo "⏭️  Skipping: $VERCEL_GIT_COMMIT_REF"
  exit 0
fi
```

## Troubleshooting

### Issue: Branch still deploying
1. Check that the script is executable: `chmod +x scripts/ignore-build.sh`
2. Verify the script path in `vercel.json` is correct
3. Check Vercel logs for the ignore command output

### Issue: Main branch not deploying
1. Verify the script logic in `ignore-build.sh`
2. Check that exit codes are correct (1 = build, 0 = skip)
3. Review Vercel environment variables

## Environment Variables

The ignore build script uses these Vercel environment variables:
- `VERCEL_GIT_COMMIT_REF`: The git branch or tag name
- `VERCEL_ENV`: The deployment environment (production, preview, development)

## Additional Resources

- [Vercel Ignored Build Step Documentation](https://vercel.com/docs/concepts/projects/overview#ignored-build-step)
- [Vercel Git Integration](https://vercel.com/docs/concepts/git)
- [Environment Variables](https://vercel.com/docs/concepts/projects/environment-variables)

