---
name: create-pr
description: Create a GitHub PR for the current branch using this repo's PR template. Use when the user asks to open/create a PR for the current branch's changes.
---

# Create PR

Opens a PR on GitHub for the current branch, filled in from `.github/PULL_REQUEST_TEMPLATE.md`. This repo tracks work with GitHub Issues (not Linear), so the template's issue line asks for a GitHub Issue link.

## Steps

1. **Sanity checks**
   - `git status` — current branch isn't `main`, no uncommitted changes worth flagging.
   - `git log main..HEAD --oneline` — confirm there are commits to PR.
   - `gh pr view --json number 2>/dev/null` — if a PR already exists for this branch, report it instead of creating a duplicate.

2. **Push the branch** if it has no upstream or is behind: `git push -u origin HEAD`.

3. **Gather context**: `git log main..HEAD` and `git diff main...HEAD` to understand what changed.

4. **Fill the template** (`.github/PULL_REQUEST_TEMPLATE.md`) into a temp file:
   - `### GitHub Issue:` — link the issue if the user gave one or it's findable from branch name/commits; otherwise leave the placeholder for the user to fill in.
   - "What does this change do?" — 2-4 bullets of material impact, based on the commits/diff.
   - "What is risky about this change?" — only note real risk; write "Nothing notable." if none.
   - "How to test this change?" — concrete steps a reviewer can follow.
   - "Other Steps" — only if there's genuinely a follow-up; otherwise "None."
   - Keep the `> Ex:` blockquote guidance lines as-is (they're instructional, not to be deleted).

5. **Create the PR**: `gh pr create --title "<imperative, <72 chars>" --body-file <temp file> --base main`.

6. Report the PR URL to the user.
