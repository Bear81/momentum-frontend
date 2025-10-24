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
