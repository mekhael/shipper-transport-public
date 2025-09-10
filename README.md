# E2E Playwright Template (TypeScript + dotenv)

A minimal, ready-to-run Playwright setup that reads secrets from `.env` and sets `baseURL` from env.

## Prereqs
- Node.js 18+ (`node -v`)

## 1) Steps after cloning the repo
```bash
# clone
git clone https://github.com/mekhael/shipper-transport-public.git
cd shipper-transport-public

# create local env (never commit .env)
cat > .env <<'EOF'
E2E_EMAIL=your.stage.user@example.com
E2E_PASSWORD=yourStagePassword
BASE_URL=https://stage.4shipper.transportly.eu
EOF

# install + run
npm ci
npx playwright install --with-deps
npx playwright test

## 3) See results
After a run:
- HTML report: `playwright-report/` (opens automatically if you use `--open`)
- Traces: attach `--trace on` and open with `npx playwright show-trace trace.zip`

 ## Bugs / Issues

### Form Validation
- Submitting the **Register** form with an email or phone number that is already in use prevents submission, but no **descriptive error message** is displayed.  
- No inline feedback appears under the inputs (e.g., “Email already exists” or “Phone number already registered”).  
- Result: users cannot tell why the form failed.

---

### Missing Input Limits
- Input fields accept excessively long text or invalid values without restriction.  
- No max length or format validation is enforced (e.g., names, company names, phone numbers).


###  Run Tests
Install dependencies and run Playwright tests in UI mode:

```bash
# 1) Install deps & Playwright browsers
npm ci
npx playwright install --with-deps

# 2) Create .env (or set env inline; see below)
cat > .env <<'EOF'
E2E_EMAIL=you@example.com
E2E_PASSWORD=yourPassword123
BASE_URL=https://stage.4shipper.transportly.eu
EOF

npx playwright test --ui