# QuickHire - Simple Job Board Application

QuickHire is a modern, responsive job board application built with Next.js. It allows users to browse job listings, search and filter by category or location, view job details, and submit applications. It also features a robust Admin Dashboard for managing job listings with role-based access control.

## 🚀 Live Demo
- **Frontend:** [https://quick-hire-demo.vercel.app](#)
- **Admin Dashboard:** [https://quick-hire-demo.vercel.app/admin](#)
- **Loom/Video Demo:** [https://loom.com/share/demo-link](#)

## ✨ Features

### Frontend (User)
- **Job Listings:** Browse all available jobs in a clean, responsive grid.
- **Search & Filter:** Search by job title and filter by category or location.
- **Job Details:** View full job descriptions and requirements.
- **Job Application:** Submit applications with name, email, resume link, and cover note.
- **Authentication:** Secure login and registration (Credentials & Google OAuth).
- **Responsive UI:** Fully optimized for Mobile, Tablet, and Desktop.

### Admin Dashboard
- **Protected Access:** Only users with the `admin` role can access the dashboard.
- **Job Management:** Add new job listings and delete existing ones.
- **Quick Insights:** View active job counts and manage listings in one place.

## 🛠️ Tech Stack
- **Framework:** Next.js 15+ (App Router)
- **Styling:** Tailwind CSS & DaisyUI
- **Database:** MongoDB
- **Authentication:** NextAuth.js
- **Icons:** React Icons
- **Notifications:** React Hot Toast

## ⚙️ Environment Variables

Create a `.env.local` file in the root directory and add the following:

```env
# Database
MONGO_URI=your_mongodb_connection_string
DB_NAME=quick-hire-db

# NextAuth Configuration
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:3000

# Google OAuth (Optional for Google Login)
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

## 🏃 Local Setup Instructions

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/quick-hire.git
   cd quick-hire
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up Environment Variables:**
   Follow the "Environment Variables" section above to configure your `.env.local` file.

4. **Run the development server:**
   ```bash
   npm run dev
   ```

5. **Access the application:**
   Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🔑 Quick Login (For Testing)
On the login page, you can use the "Quick Login" buttons for:
- **User:** `alex@gmail.com` / `123`
- **Admin:** `admin@gmail.com` / `456`

## 📁 Project Structure
```text
src/
├── app/            # Next.js App Router (Pages & API)
├── components/     # Reusable UI components
├── lib/            # Database connection and Auth options
├── providers/      # Context providers (Auth, etc.)
└── tmp_designs/    # Design assets and assessment requirements
```

## 📝 License
This project is for technical assessment purposes.
