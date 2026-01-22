<a id="top"></a>

# Momentum Frontend Testing

Back to the [README](README.md)

---

## Introduction

Project Milestone 5 for the Code Institute Full Stack Software Development programme.

This document details frontend testing carried out for the Momentum React application. Testing was performed continuously throughout development to verify user flows, authentication behaviour, CRUD functionality, responsive design, and error handling.

The application was deployed early to Heroku to ensure consistency between local and production environments.

---

## Manual Functional Testing

<a href="#top">Back to the top</a>

Manual testing focused on validating complete user journeys and ensuring the frontend behaved correctly when interacting with the backend API.

### Manual Testing Checklist

| Test Case             | Test Description       | Steps                                           | Expected Result                       | Actual Result | Pass/Fail |
| --------------------- | ---------------------- | ----------------------------------------------- | ------------------------------------- | ------------- | --------- |
| **Authentication**    |
| TC001                 | User Registration      | Navigate to Register → submit valid credentials | Account created, redirected to login  | As expected   | ✅ Pass   |
| TC002                 | User Login (valid)     | Navigate to Login → submit valid credentials    | User logged in, redirected to habits  | As expected   | ✅ Pass   |
| TC003                 | User Login (invalid)   | Submit invalid credentials                      | Error message displayed               | As expected   | ✅ Pass   |
| TC004                 | User Logout            | Click Logout while authenticated                | Tokens cleared, redirected to login   | As expected   | ✅ Pass   |
| TC005                 | Protected Route Access | Navigate to /habits while logged out            | Redirected to login page              | As expected   | ✅ Pass   |
| **Navigation**        |
| TC006                 | Navbar (logged out)    | View navbar                                     | Login/Register links visible          | As expected   | ✅ Pass   |
| TC007                 | Navbar (logged in)     | View navbar                                     | Habit links, username, logout visible | As expected   | ✅ Pass   |
| TC008                 | Mobile Navigation      | Toggle hamburger menu                           | Menu expands/collapses correctly      | As expected   | ✅ Pass   |
| **Habit CRUD**        |
| TC009                 | Create Habit           | Submit valid habit form                         | Habit created, redirected to list     | As expected   | ✅ Pass   |
| TC010                 | Create Habit (invalid) | Submit with missing required field              | Validation error shown                | As expected   | ✅ Pass   |
| TC011                 | View Habits            | Load habits page                                | User habits displayed                 | As expected   | ✅ Pass   |
| TC012                 | Edit Habit             | Edit owned habit                                | Habit updated successfully            | As expected   | ✅ Pass   |
| TC013                 | Delete Habit           | Confirm deletion                                | Habit removed from list               | As expected   | ✅ Pass   |
| **Responsive Design** |
| TC014                 | Desktop Layout         | View >992px                                     | Layout displays correctly             | As expected   | ✅ Pass   |
| TC015                 | Tablet Layout          | View 768–991px                                  | Layout adapts correctly               | As expected   | ✅ Pass   |
| TC016                 | Mobile Layout          | View <768px                                     | Navigation collapses, UI usable       | As expected   | ✅ Pass   |
| **Error Handling**    |
| TC017                 | API 401 Handling       | Expire token → perform action                   | Redirected to login with message      | As expected   | ✅ Pass   |
| TC018                 | Network Error          | Disable network → submit form                   | Error message displayed               | As expected   | ✅ Pass   |

---

## Automated Testing

Automated testing was implemented using **Vitest** to verify that core components and routes render without runtime errors.

Automated tests include:

- Application smoke tests
- Layout rendering tests
- Page component rendering tests

Automated tests were run locally during development.

![Vitest Results](documentation/testing/vitest-test-results.webp)

---

## Messaging / Alerts

The application uses toast notifications to provide clear feedback to users.

### Authentication Alerts

- Login success
- Logout success
- Registration success
- Invalid login error

### Habit Alerts

- Habit created
- Habit updated
- Habit deleted
- API error responses

Screenshots of messaging behaviour are included below.

---

## ESLint Validation

All relevant ESLint warnings were addressed. The project validates successfully using the configured ESLint rules.

![ESLint Validation](documentation/testing/eslint-validation.webp)

---

## HTML Validation

The rendered HTML output was validated using the W3C Markup Validation Service.

![HTML Validation](documentation/testing/html-validation.webp)

---

## CSS Validation

Custom CSS was validated using the W3C Jigsaw validation service.

Warnings shown relate to vendor prefixes and third-party libraries and do not impact functionality.

![CSS Validation](documentation/testing/css-validation.webp)

---

## Console Results

The browser console was inspected during normal usage.

- No errors present when logged out
- No errors present when logged in

![Console Logged Out](documentation/testing/console-logged-out.webp)
![Console Logged In](documentation/testing/console-logged-in.webp)

---

## Lighthouse Testing

Lighthouse was used to test performance, accessibility, best practices, and SEO.

### Desktop

![Lighthouse Desktop](documentation/testing/lighthouse-desktop.webp)

### Mobile

![Lighthouse Mobile](documentation/testing/lighthouse-mobile.webp)

---

## Bugs / Issues

The following issues were identified and resolved during development:

### Bug 1: Authentication Errors

Resolved by switching from cookie-based authentication to JWT with Axios interceptors.

### Bug 2: Logout Errors

Resolved by implementing client-side logout handling.

### Bug 3: ESLint Warnings in Tests

Resolved by configuring Vitest globals in ESLint.

No unresolved issues remain at the time of submission.

---

<a href="#top">Back to the top</a>
