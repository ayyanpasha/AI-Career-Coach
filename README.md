

# AI Career Coach

AI Career Coach is a web application designed to guide users through career decisions in the AI field. The app provides an onboarding flow, user authentication, and integrates with external APIs to provide personalized career insights and coaching.

## Description

This project leverages **Clerk** for user authentication, connecting to a database, and integrating with the **Gemini API** to offer AI-based career coaching services. The app allows users to sign up, sign in, and proceed with an onboarding process to receive personalized career advice.

## Features

- **User Authentication**: Secure sign-in and sign-up with Clerk.
- **Onboarding**: Personalized onboarding experience after successful authentication.
- **AI Career Coaching**: Integration with the Gemini API to provide AI-powered career insights.
- **Seamless Integration**: Easily configurable environment for integration with other services and APIs.

## Technologies Used

- **Clerk**: Handles user authentication (sign-up, sign-in, and user management).
- **Gemini API**: Provides AI-powered insights for career coaching.
- **Database**: Stores user data securely (configured via `DATABASE_URL`).

## Environment Variables

Make sure to configure the following environment variables in your `.env` file:

```bash
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=<your-clerk-publishable-key>
CLERK_SECRET_KEY=<your-clerk-secret-key>

NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/onboarding
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/onboarding

DATABASE_URL=<your-database-url>

GEMINI_API_KEY=<your-gemini-api-key>
```

- **NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY**: Public key for Clerk (client-side).
- **CLERK_SECRET_KEY**: Clerk's secret key (server-side).
- **NEXT_PUBLIC_CLERK_SIGN_IN_URL**: URL for the sign-in page.
- **NEXT_PUBLIC_CLERK_SIGN_UP_URL**: URL for the sign-up page.
- **NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL**: URL users will be redirected to after signing in.
- **NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL**: URL users will be redirected to after signing up.
- **DATABASE_URL**: URL to your database connection string.
- **GEMINI_API_KEY**: API key for interacting with the Gemini AI API.

## Setup Instructions

To set up and run the project locally, follow the steps below:

### 1. Clone the repository

First, clone the repository to your local machine:

```bash
git clone https://github.com/ayyanpasha/AI-Career-Coach.git
```

Navigate into the project directory:

```bash
cd AI-Career-Coach
```

### 2. Install dependencies

Install the required dependencies for the project using either `npm` or `yarn`:

Using **npm**:

```bash
npm install
```

Using **yarn**:

```bash
yarn install
```

### 3. Set up environment variables

Create a `.env` file in the root directory of the project, and add your environment variables. You can refer to the **Environment Variables** section above for a list of required keys.

### 4. Start the development server

Once dependencies are installed and your `.env` file is configured, start the development server:

Using **npm**:

```bash
npm run dev
```

Using **yarn**:

```bash
yarn dev
```

The application will now be available at [http://localhost:3000](http://localhost:3000) in your browser.

---