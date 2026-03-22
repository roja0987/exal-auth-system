# Full-Stack Authentication System (Exal Consortium Assessment)

A robust, enterprise-ready Identity and Access Management (IAM) solution built with React and Supabase. This project implements secure authentication flows, social SSO, and passwordless OTP verification.

## Project Checklist (Requirements Met)

| Feature | Status | Implementation Detail |
| :--- | :--- | :--- |
| **Multi-Method Sign-in** | ✅ Done | Supports Email/Password and Phone-formatted identifiers. |
| **Sign-up Flow** | ✅ Done | Collects full user data with mandatory Terms & Conditions consent. |
| **Google SSO** | ✅ Done | Integrated Google OAuth 2.0 with secure redirect handling. |
| **OTP Login** | ✅ Done | Implemented 6-digit Email/Token verification for passwordless access. |
| **Identity Management** | ✅ Done | Uses Supabase (Open-source GoTrue engine) for enterprise IAM. |
| **Security Standards** | ✅ Done | Industry-standard Bcrypt hashing and JWT-based session management. |
| **GDPR Compliance** | ✅ Done | Minimal data collection and explicit user consent during registration. |

## Technical Stack

- **Frontend**: React.js 18 (Vite), Tailwind CSS
- **Backend/Database**: PostgreSQL (via Supabase)
- **Authentication**: Supabase Auth (Open-source IAM)
- **Routing**: React Router v6

## Getting Started

### 1. Prerequisites
- Node.js (v16 or higher)
- A Supabase Project

### 2. Installation
```bash
git clone [https://github.com/roja0987/exal-auth-system.git](https://github.com/roja0987/exal-auth-system.git)
cd exal-auth-system
npm install
