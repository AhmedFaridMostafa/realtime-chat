# Real-Time Chat Application

This is a full-stack real-time chat application built with the latest web technologies. It allows users to sign in with their Google account, add friends, and chat with them in real-time.

## Features

- **User Authentication:** Secure user authentication with NextAuth.js and Google Provider.
- **Real-Time Messaging:** Instant messaging with Pusher and WebSockets.
- **Friend System:** Users can send, accept, and deny friend requests.
- **Real-Time Notifications:** Users receive real-time notifications for new friend requests and messages.
- **Modern UI:** A beautiful and responsive user interface built with Tailwind CSS and shadcn/ui.
- **Database:** Redis database with Upstash for storing user data, friends, and chat messages.
- **TypeScript:** Fully typed codebase for better developer experience and fewer bugs.

## Tech Stack

- **Framework:** [Next.js](https://nextjs.org/) 15
- **Authentication:** [NextAuth.js](https://next-auth.js.org/)
- **Database:** [Upstash Redis](https://upstash.com/)
- **Real-Time:** [Pusher](https://pusher.com/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **UI Components:** [shadcn/ui](https://ui.shadcn.com/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Validation:** [Zod](https://zod.dev/)
- **Forms:** [React Hook Form](https://react-hook-form.com/)

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/en/) (v20 or higher)
- [pnpm](https://pnpm.io/) (or npm/yarn)

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/AhmedFaridMostafa/realtime-chat.git
   cd realtime-chat
   ```

2. **Install dependencies:**

   ```bash
   pnpm install
   ```

3. **Set up environment variables:**

   Create a `.env.local` file in the root of the project and add the following environment variables:

   ```
   # NextAuth
   AUTH_SECRET=
   AUTH_URL=http://localhost:3000
   GOOGLE_CLIENT_ID=
   GOOGLE_CLIENT_SECRET=

   # Upstash Redis
   UPSTASH_REDIS_REST_URL=
   UPSTASH_REDIS_REST_TOKEN=

   # Pusher
   NEXT_PUBLIC_PUSHER_APP_KEY=
   PUSHER_APP_ID=
   PUSHER_APP_SECRET=
   ```

4. **Run the development server:**

   ```bash
   pnpm dev
   ```

   Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Available Scripts

- `dev`: Runs the development server with Turbopack.
- `build`: Creates a production build of the application.
- `start`: Starts the production server.
- `lint`: Lints the codebase with ESLint.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.