# 🔐 MagicAuth – Passwordless Authentication API

MagicAuth is a SaaS-based passwordless authentication system using **magic links**. It simplifies secure user login by eliminating the need for traditional passwords.

---

## 🚀 Features

- ✅ Passwordless login via magic links sent to email
- 📧 Custom SMTP support for email sending
- 🔑 Secure token-based verification (JWT support)
- 🔗 Expirable magic links with token lifecycle control
- 🔐 Developer dashboard to generate API keys
- 🌐 Option to use custom domain and custom database (advanced users)
- 📊 Logs & user login tracking (optional future feature)

---

## 📁 Folder Structure

src/
├── app/
│ ├── api/
│ │ ├── auth/
│ │ │ ├── send-link/
│ │ │ └── verify/
│ │ ├── client/
│ │ │ ├── register/
│ │ │ ├── login/
│ │ │ └── verify/
│ ├── auth/
│ │ └── login/
│ ├── dashboard/
│ ├── documentation/
│ ├── client/
│ │ ├── register/
│ │ └── login/
│ └── Components/
│ ├── UI/
│ └── Sections/
│
├── lib/
│ ├── db.ts
│ └── mailer.ts
├── models/
│ ├── User.ts
│ └── DevUser.ts

yaml
Copy
Edit

---

## 🛠️ Tech Stack

- **Next.js 15** (App Router)
- **TypeScript**
- **MongoDB Atlas**
- **Tailwind CSS**
- **Nodemailer**
- **JWT** for secure session handling

---

## ⚙️ Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/MagicAuth.git
cd MagicAuth
2. Install Dependencies
bash
Copy
Edit
npm install
# or
pnpm install
3. Set Environment Variables
Create .env.local in the root directory:

env
Copy
Edit
MONGODB_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/magicauth
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
JWT_SECRET=your-secret-key
JWT_EXPIRY=1h
NEXT_PUBLIC_APP_URL=http://localhost:3000
4. Start the Dev Server
bash
Copy
Edit
npm run dev
# or
pnpm run dev
Open http://localhost:3000

📦 API Endpoints
1. Send Magic Link
http
Copy
Edit
POST /api/auth/send-link
{
  "email": "user@example.com"
}
2. Verify Token
http
Copy
Edit
POST /api/auth/verify
{
  "email": "user@example.com",
  "token": "12345"
}
3. Developer Register/Login
/api/client/register

/api/client/login

/api/client/verify

📄 Documentation
A full documentation page is available at:
/documentation route on your local or hosted deployment.

🧠 Use Case
MagicAuth is perfect for:

SaaS startups

Internal admin panels

Modern apps avoiding password hassle

Onboarding flows where login friction must be minimal

📸 Screenshots
Include hero section, login screen, dashboard, and magic link email previews

🙋‍♂️ Team Members
Harsh Kushwaha – Frontend & Backend

[Add others if any]

🧪 Future Scope
Multi-provider SMTP

Multi-tenant user storage

Dashboard analytics

OAuth fallback login

Rate limiting / security guardrails

📃 License
MIT License – Free to use and modify

MagicAuth – Simplifying logins, one link at a time ✨

