Absolutely — here’s a **clean, condensed Markdown summary** of everything meaningful from this chat, ready to paste straight into your project notes.

---

# 🧱 Momentum Frontend – Setup & Scaffold Notes

## ✅ Summary

This chat covered the setup and completion of the **Momentum Frontend Repository & Scaffold** card.
All foundational setup for the React frontend is complete and integrated with the Momentum backend.

---

## ⚙️ Environment Setup

- **Node:** v22.21.0 (pinned via Volta)
- **NPM:** 10.9.4
- **Framework:** Vite + React
- **Linting:** ESLint + Prettier configured
- **Routing:** React Router DOM v6
- **HTTP Client:** Axios (with JWT + refresh interceptor)
- **State:** Context API (AuthContext)
- **Notifications:** React Hot Toast
- **Project linked:** GitHub Project (Control Tower)

---

## 📁 Project Structure

```
src/
├─ main.jsx
├─ App.jsx
├─ routes.jsx
├─ layouts/
│  └─ RootLayout.jsx
├─ components/
│  ├─ Navbar.jsx
│  └─ ProtectedRoute.jsx
├─ context/
│  └─ AuthContext.jsx
├─ lib/
│  └─ axios.js
└─ pages/
   ├─ Home.jsx
   ├─ Dashboard.jsx
   ├─ Login.jsx
   └─ Register.jsx
```

---

## 🌍 Environment Variables

`.env` (local)

```
VITE_API_BASE=https://momentum-backend-d83acc164707.herokuapp.com/api/v1/
VITE_JWT_OBTAIN=/auth/token/
VITE_JWT_REFRESH=/auth/token/refresh/
```

`.env.example` (commit this, ignore real `.env`)

```
VITE_API_BASE=http://127.0.0.1:8000/api/v1/
VITE_JWT_OBTAIN=/auth/token/
VITE_JWT_REFRESH=/auth/token/refresh/
```

`.gitignore`

```
node_modules
dist
.env
.env.*
!.env.example
```

---

## 🔐 Auth System Overview

### **Axios Interceptor**

- Adds `Authorization: Bearer <access>` header.
- Refreshes token once on 401 via `/auth/token/refresh/`.
- Clears state & redirects to `/login` if refresh fails.

### **AuthContext**

- Manages `tokens`, `user`, and `isAuthenticated`.
- Stores JWTs in localStorage.
- Provides `login()` and `logout()` functions.
- Displays toast notifications for success/error.

### **ProtectedRoute**

- Wraps private pages (e.g., `/dashboard`).
- Redirects to `/login` if not authenticated.

### **Login Page**

- Validates input.
- Calls `login()` from context.
- Redirects after successful login using `useEffect` (fixes Router state update warning).

---

## 🧭 Routing & Layout

- `RootLayout` wraps all routes with Navbar and main content area.
- `AppRoutes` defines routes for:

  - `/` – Home
  - `/login`
  - `/register`
  - `/dashboard` (protected)
  - `*` – fallback to Home

---

## 🪶 ESLint / Prettier

- Rule `react-refresh/only-export-components` disabled at top of `AuthContext.jsx` to silence Fast Refresh warning.
- Line-ending warnings (LF ↔ CRLF) resolved by adding `.gitattributes`:

```
* text=auto
```

Then normalizing:

```bash
git add --renormalize .
git commit -m "chore: enforce consistent line endings"
```

---

## 🚀 Dev Proxy (CORS Workaround)

To bypass Heroku CORS issues during local dev:
`vite.config.js`

```js
server: {
  proxy: {
    "/api/v1": {
      target: "https://momentum-backend-d83acc164707.herokuapp.com",
      changeOrigin: true,
      secure: true,
    },
  },
},
```

Then use:

```
VITE_API_BASE=/api/v1/
```

---

## 🧩 Issues Fixed

- Node version mismatch (Vite 7 requires Node ≥20) → fixed with Volta Node 22.
- `AuthProvider is not defined` → import corrected in `main.jsx`.
- `ProtectedRoute is not defined` → import corrected in `routes.jsx`.
- CRLF warnings → `.gitattributes` and renormalization added.
- Router “Cannot update BrowserRouter while rendering Login” → fixed with redirect in `useEffect`.
- Backend CORS → temporarily bypassed via Vite proxy and documented for backend update.

---

## ✅ Completed Tasks (Card: _Setup & Scaffold_)

- Frontend repo initialized and connected to project.
- Vite + React scaffold created and verified.
- Routing, layout, navbar configured.
- AuthContext, Axios, and ProtectedRoute implemented.
- Login/logout working with live backend API.
- ESLint, Prettier, and `.gitignore` configured.
- CORS proxy in place for local dev.
- `.env` secured and `.env.example` added.
- Branch merged into `main` via PR:

  ```
  feat(scaffold): complete Momentum frontend setup and scaffold
  ```

---

## 🧱 Next Phase (M2 – CRUD + Auth)

- **Next card:** Register User Form & Password Validation

  - Implement registration form (POST `/auth/register/`)
  - Add client-side password match validation
  - Show backend errors via toast
  - Redirect to `/login` on success

---

**Notes captured:** Momentum Frontend scaffold complete and stable ✅
Ready to proceed with registration feature build in new chat.
