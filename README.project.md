# Momentum Frontend

6. Manual test script (copy into your project docs)

Navigate to /register as a logged-out user.

Leave fields blank → submit → see required field errors under each input.

Enter invalid email → see “Enter a valid email”.

Enter weak password (e.g., abcdefg) → see strength rule message.

Enter two different passwords → see “Passwords do not match” under Confirm field (addresses previous fail).

Use an already-taken username/email (simulate server error) → see field-level server error.

Submit valid data → see success toast → redirected to /login.

Login, confirm Nav shows Hi, {username}.

ESLint: no new errors; console: no unhandled promise rejections.

7. README notes to add (brief)

Forms & Validation: Implemented with react-hook-form + yup. Client-side rules for email, username length, password strength, and confirm-password match. Errors are displayed beneath inputs; API errors map to specific fields where possible.

User Feedback: Inline field errors + toast notifications for success/failure (LO4.2).

Security & UX: No plaintext secrets in FE; login state reflected in navigation with greeting (LO4.7).

Endpoints: Registration posts to /dj-rest-auth/registration/. Adjust if your backend differs.

## Authentication Setup (Momentum)

**Frontend**

- Uses SimpleJWT access/refresh tokens.
- Tokens saved under:
  - `localStorage.access`
  - `localStorage.refresh`
  - `localStorage.authTokens` (bundle for compatibility)
- `axios.js` sends tokens in `Authorization: Bearer <access>` automatically.

**Backend**

- `/api/v1/auth/token/` and `/api/v1/auth/token/refresh/` use SimpleJWT.
- `REST_FRAMEWORK` includes:
  - `SessionAuthentication`
  - `JWTAuthentication`
- All endpoints accept either (safe for existing views).

**Rules**

- No leading slashes in API calls (`api.get("habits/")` ✅).
- Tokens refreshed manually via `/auth/token/refresh/` if needed.

Here’s a clean, copy-paste **Testing Checklist (Markdown)** you can drop into your README / docs.

---

# QA / Manual Testing Checklist – Momentum (Phase 2)

## Environment

- Frontend: `VITE_API_BASE` points to live API (ends with `/api/v1/`).
- User exists with valid credentials.
- Browser DevTools open (Network + Console).

---

## 1) Authentication Flow

### Login

1. Go to `/login`.
2. Enter valid username/password → **Submit**.
   **Expect:** toast “Login successful!”, redirect to `/dashboard` (or previous route), localStorage has `access`, `refresh`, `authTokens`.

### Navbar state

3. Navbar shows “Welcome, <username>”, **Logout**, and **My Habits / New Habit** links.
   **Expect:** no console errors.

### 401 handling (global)

4. Manually clear `localStorage.access`.
5. Visit `/habits`.
   **Expect:** toast “Session expired. Please log in again.” and auto-redirect to `/login`.

---

## 2) Habits – List / Search / Filter

### List loads

1. Go to `/habits`.
   **Expect:** spinner → list of habit cards **or** “No habits found.”
   **Each card:** name, period, target (if set), tags (if set), description (optional), created date, **Edit** + **Delete** buttons.

### Search (client-side)

2. In “Search by name, tags, or description…”, type a known term.
   **Expect:** list narrows to matching cards; clear input restores full list.

### Filter by period

3. Change period dropdown (All → Daily → Weekly → Monthly).
   **Expect:** only habits with selected period remain; “No habits match your filters.” if none.

---

## 3) Create Habit

### Valid create

1. Go to `/habits/create`.
2. Fill:

   - **Name**: “Morning Run”
   - **Period**: Daily
   - **Target**: 1
   - (Optional) description, tags

3. **Save Habit**.
   **Expect:** toast “Habit created successfully!”, redirect to `/habits`, new habit card visible.

### Client validation

4. Try submit with empty **Name**.
   **Expect:** inline error “Name is required.”, no request sent.
5. Set **Target** to `0` or blank and submit.
   **Expect:** inline error “Target must be 1 or greater.”, no request sent.
6. Set **Period** to an invalid value (if you can).
   **Expect:** inline error “Period must be daily, weekly, or monthly.”

---

## 4) Edit Habit

### Load + update

1. From `/habits`, click **Edit** on an existing habit.
   **Expect:** form prefilled with current values.
2. Change **Name** and **Target** → **Update Habit**.
   **Expect:** toast “Habit updated!”, redirect to `/habits`, card shows updated values.

### Validation

3. Clear **Name** and submit.
   **Expect:** inline error; request not sent.

---

## 5) Delete Habit

1. From `/habits`, click **Delete** on a habit.
   **Expect:** details page shows the habit summary and a warning.
2. Click **Delete Habit** → confirm.
   **Expect:** toast “Habit deleted successfully!”, redirect to `/habits`, card removed.
3. Click **Cancel** instead.
   **Expect:** returns to list; no changes.

---

## 6) Error Handling & Edge Cases

- **Network/Server error (simulate by temporary bad URL in code):**
  **Expect:** toast “Server error. Please try again later.” (from global interceptor) and/or inline alert on the page.
- **401 during CRUD (simulate by clearing token before submit):**
  **Expect:** global 401 toast + redirect to `/login`.
- **404 on Edit/Delete (manually change URL to an invalid id):**
  **Expect:** “Failed to load habit.” alert in Edit/Delete pages.

---

## 7) Routing & Guards

- Visit `/habits`, `/habits/create`, `/habits/:id/edit`, `/habits/:id/delete` **while logged out**.
  **Expect:** info alert or redirect to `/login` (depending on your `ProtectedRoute` behavior).
- Navbar links:

  - Logged in → **My Habits**, **New Habit**, **Logout** visible.
  - Logged out → **Login**, **Register** visible.

---

## 8) Console & Lint

- Open Console while navigating all flows.
  **Expect:** no errors or unhandled promise rejections.
- Run:

  ```bash
  npm run lint
  npm run build
  ```

  **Expect:** no blocking issues; build succeeds.

---

## 9) Optional Backend Smoke (already verified)

- `POST /api/v1/auth/token/` returns `{access, refresh}`.
- Authenticated `GET /api/v1/habits/` returns list or empty array.
- `POST/PUT/DELETE` on `/habits/` succeed with valid JWT.

---

### Pass Criteria

- All above checks meet “Expect” outcomes without console errors.
- CRUD operations visible immediately in list after actions.
- 401s always funnel to `/login` with a clear toast.

---

If you want, I can also prep a **one-page PDF checklist** (same content) you can hand in as assessment evidence.
