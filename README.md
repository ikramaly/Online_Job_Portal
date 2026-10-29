# Jivika Job Portal

Jivika is a React frontend built with Vite. It includes a **frontend-only demo sign up/sign in** for Student and Recruiter roles. No backend or database is required for the demo authentication.

## Requirements

- Node.js 20.19+ or 22.12+ (Vite 8 requirement; Node.js 24 is also suitable)
- npm 10+

## Run locally

```sh
npm ci
npm run dev
```

Open the URL printed by Vite (normally `http://localhost:5173`). Alternatively, `npm start` starts Vite on the local network interface and prints its URL.

Create a student and recruiter account using Sign Up, then sign in with the same email/password and select the matching role. Student sign-in opens the student landing experience with sample jobs; recruiter sign-in opens the Recruiter Dashboard. Recruiters can create, edit, and delete listings with title, company, location, job type, salary, experience, openings, description, and requirements. Listings are shared with the student job views and persist in the current browser. Student demo applications are also stored locally and update the sample applicant count.

Demo accounts, the active demo session, and recruiter sample listings use browser `localStorage`. This is for interviews and local previews only: it is not secure authentication, data does not sync across devices/browsers, and clearing site data removes it. Passwords are stored as salted hashes, but localStorage can be edited by the browser user; do not use real passwords or sensitive information. Google sign-in is not part of this demo. Other job/profile/admin features still call the original API at `http://localhost:8080` and need that separate backend; standalone resume, salary, interview, skills, and resume-analysis features are frontend-only.

`VITE_DEMO_MODE` defaults to demo behavior: the student home uses sample job listings without trying to contact the missing backend. Set `VITE_DEMO_MODE=false` in `.env.local` to use the original job API instead. Other API-backed profile and application routes still need the backend.

The account and demo-session keys are `jivika-demo-accounts` and `jivika-demo-session`; recruiter listing data uses `jivika-demo-recruiter-jobs`.

## Checks

```sh
npm run lint
npm run build
```

`vercel.json` retains the SPA fallback rewrite used when deploying this frontend to Vercel; Vite handles client-side routes during local development. `.env.example` documents the optional backend API URL for other API-backed features.
