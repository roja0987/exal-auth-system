# Full-Stack Authentication System

A secure authentication system built for the technical assessment at Exal Consortium. This project implements multiple login methods and follows security best practices.
## Key Features
- **Email & Password Authentication**: Standard secure login flow.
- **Email OTP (One-Time Password)**: Passwordless login using 6-digit verification codes.
- **Google OAuth (SSO)**: One-click sign-in with Google and automatic dashboard redirection.
- **Dynamic Input Detection**: A single input field that intelligently handles both email and phone identifiers.
- **Protected Routes**: A secure Dashboard accessible only to authenticated users.

##  Tech Stack
- **Frontend**: React (Vite), Tailwind CSS
- **Backend/Auth**: Supabase (PostgreSQL)
- **State Management**: React Hooks & Supabase Auth Listeners

##  Local Setup
1. Clone the repository:
   ```bash
   git clone [https://github.com/roja0987/exal-auth-system.git](https://github.com/roja0987/exal-auth-system.git)
