# Momentum Frontend (React)

Live Site: [https://momentum-frontend-36fec0aa93f7.herokuapp.com](https://momentum-frontend-36fec0aa93f7.herokuapp.com)

Backend Repository: [https://github.com/Bear81/momentum-backend](https://github.com/Bear81/momentum-backend)

---

## Introduction

**Momentum** is a productivity and habit-tracking web application built using React and Django REST Framework.  
This repository contains the **frontend** React application, which interacts with the backend API to provide users with authentication, CRUD habit management, and progress tracking features.

This project is a **resubmission of Code Institute’s Portfolio Project 5**, meeting all **Pass-level criteria** for functionality, testing, and deployment.

---

Recent Fixes (Resubmission)
Authentication & API Integration

Fixed broken registration and login flows caused by malformed API URLs and duplicated path prefixes.

Standardised frontend API configuration to use a single canonical Axios instance.

Centralised /api/v1/ handling in the Axios base URL to prevent duplicated paths (e.g. /api/v1/api/v1/...).

Removed legacy/duplicate Axios configuration that caused inconsistent request behaviour.

Ensured authentication tokens are not attached to public endpoints (e.g. user registration).

Updated backend registration endpoint to explicitly allow unauthenticated access.

CRUD Functionality

Restored full authenticated CRUD functionality for Habits:

Create habit

View habit list

Edit habit

Delete habit

Verified that protected routes are inaccessible to unauthenticated users.

Production Verification

The following flows have been manually tested on the deployed production environment:

User registration

Login / logout

Auth persistence across hard refresh

Full CRUD lifecycle for habits while authenticated

## UX / User Experience

### Goals

- Provide a clean, minimal interface for managing daily habits.
- Enable secure login, registration, and logout.
- Allow users to add, edit, delete, and view their habits.
- Deliver responsive layouts for desktop, tablet, and mobile.

### Target Audience

- Students and professionals seeking a lightweight daily habit tracker.
- Users who prefer simple interfaces with immediate feedback.

---

## Features

| Feature               | Description                                                           |
| --------------------- | --------------------------------------------------------------------- |
| **Authentication**    | Users can register, log in, and log out securely via the backend API. |
| **Dashboard**         | Displays the user’s list of habits with key progress info.            |
| **CRUD Operations**   | Users can create, view, edit, and delete habits.                      |
| **Responsive Design** | Built with React Bootstrap for all device sizes.                      |
| **User Feedback**     | Toast notifications confirm actions or display errors.                |
| **Testing**           | Automated Vitest suite and full manual test plan included.            |

---

## Technologies Used

### Languages

- JavaScript (React 19)
- HTML5 / CSS3

### Frameworks, Libraries & Tools

- React 19 (via Vite)
- React Router DOM
- React Bootstrap / Bootswatch
- Axios (API communication)
- React Hot Toast
- ESLint
- Vitest + React Testing Library
- Git / GitHub for version control
- Heroku for deployment

---

## Testing

### Automated Testing

Automated tests were implemented using **Vitest** and **React Testing Library**.

#### Files Tested

- `App.smoke.test.jsx` — Verifies App renders within providers.
- `RootLayout.render.test.jsx` — Ensures layout renders children correctly.
- `pages.smoke.test.jsx` — Confirms all page components render.

All tests pass successfully, confirming the frontend compiles and loads correctly.

---

### Manual Testing

| Feature               | Expected Result                                                     | Actual Result      | Pass |
| --------------------- | ------------------------------------------------------------------- | ------------------ | ---- |
| **Login**             | User logs in with valid credentials and is redirected to dashboard. | Works as expected. | ✅   |
| **Register**          | New user can create account and log in.                             | Works as expected. | ✅   |
| **Logout**            | Clears session and redirects to login screen.                       | Works as expected. | ✅   |
| **Add Habit**         | Creates a new habit via API and refreshes list.                     | Works as expected. | ✅   |
| **Edit Habit**        | Opens form and updates habit successfully.                          | Works as expected. | ✅   |
| **Delete Habit**      | Deletes habit and removes it from view.                             | Works as expected. | ✅   |
| **Responsive Layout** | UI adapts on tablet and mobile devices.                             | Works as expected. | ✅   |
| **Error Handling**    | Displays toast on failed login or missing field.                    | Works as expected. | ✅   |

---

## Deployment

This frontend was deployed on **Heroku**.

### Deployment Steps

1. Run build command locally:
   ```bash
   npm run build
   ```
2. Create a Heroku app and connect it to the GitHub repository.
3. Set buildpack to Node.js.
4. Configure environment variables for API URL.
5. Push to GitHub; Heroku automatically builds and deploys.

---

## Bugs & Fixes

| Bug                                   | Fix                                                      |
| ------------------------------------- | -------------------------------------------------------- |
| CSRF / Cookie errors during login     | Added Axios interceptor for CSRF token handling.         |
| Logout endpoint error                 | Created custom logout route in backend to clear cookies. |
| ESLint `test is not defined` warnings | Added Vitest globals in ESLint config.                   |

---

## Credits

- Based on Code Institute “Moments” walkthrough project structure.
- Adapted following FoodSnap example by Art Cuddy.
- Icons and visual style provided by Bootstrap and Bootswatch.

---

## Acknowledgements

Thanks to the Code Institute mentor team and community for support, and to my family for their patience during development.

---
