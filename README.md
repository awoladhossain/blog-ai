# 🚀 MERN Blog Application (Real-Time Chat + Gen‑AI Integrated)

A full‑stack **MERN Blog Platform** featuring authentication, blog &
category management, rich‑text editing, image uploads, likes, comments,
**real‑time chat using Socket.io**, and **AI‑powered content + image
generation**.

------------------------------------------------------------------------

## ✨ Features

### 🔐 Authentication

-   JWT-based register & login\
-   Google OAuth\
-   Protected routes (client & server)\
-   Role system: `user` & `admin`\
-   Redux Persist for session continuity

### 📝 Blogging

-   Create, Read, Update, Delete blogs\
-   CKEditor 5 rich-text editor\
-   Slug generation\
-   Category-based blog filtering\
-   Search functionality\
-   Like/Unlike blogs\
-   Comment system

### 🗂 Category Management

-   Admin-protected category CRUD\
-   Slug-based categorization

### 💬 Real-Time Chat (Socket.io)

-   User ↔ User chat\
-   User ↔ Admin support chat\
-   Online user presence\
-   Message delivery indicators\
-   Scalable event-driven architecture

### 🤖 Gen‑AI Features

-   AI Content Generation (titles, paragraphs, summaries)\
-   AI Image Generation (via OpenAI / Replicate / Cloud API)\
-   Smart blog suggestions\
-   Optional moderation using AI

### 📸 Media & Uploads

-   Cloudinary integration\
-   Multer upload middleware\
-   React Dropzone on frontend

### 🧩 Frontend Stack

-   React 19\
-   Vite\
-   React Router v7\
-   Redux Toolkit + Redux Persist\
-   TailwindCSS 4\
-   Lucide Icons\
-   Sonner Toasts

### 🛠 Backend Stack

-   Node.js\
-   Express 5\
-   MongoDB + Mongoose\
-   JWT Auth\
-   Multer + Cloudinary\
-   Socket.io Server\
-   Bcrypt\
-   Cookie Parser

------------------------------------------------------------------------

## 📁 Project Structure

    blog-mern/
    ├── client/         # React Frontend
    ├── server/         # Node + Express Backend
    └── README.md

------------------------------------------------------------------------

## ⚙️ Installation

### Clone the project

``` bash
git clone <your-repo-url> blog-mern
cd blog-mern
```

------------------------------------------------------------------------

## 🖥️ Client Setup

``` bash
cd client
npm install
npm run dev
```

------------------------------------------------------------------------

## 🛠 Server Setup

``` bash
cd server
npm install
npm run dev
```

------------------------------------------------------------------------

## 🔧 Environment Variables

### Server `.env`

    PORT=5000
    MONGODB_URI=your_mongodb_connection
    JWT_SECRET=your_secret
    CLOUDINARY_CLOUD_NAME=your_cloud
    CLOUDINARY_API_KEY=your_key
    CLOUDINARY_API_SECRET=your_secret
    AI_API_KEY=your_openai_or_other_key

### Client `.env`

    VITE_API_URL=http://localhost:5000/api
    VITE_GOOGLE_CLIENT_ID=your_google_client_id
    VITE_SOCKET_URL=http://localhost:5000
    VITE_AI_API_KEY=your_key

------------------------------------------------------------------------

## 🔌 Socket.io Integration

### Server

-   Initializes Socket.io\
-   Stores active users\
-   Handles private messages\
-   Emits new message events

### Client

-   Connects using auth token\
-   Handles real-time chats\
-   Tracks online users

------------------------------------------------------------------------

## 🤖 AI Integration

### AI Content Generation

-   Title generator\
-   Paragraph generator\
-   Full blog draft generation

### AI Image Generation

-   Prompt-based image generation\
-   Integration via your chosen model

------------------------------------------------------------------------

## 📦 Deployment (Vercel / Render)

1.  Deploy **client** on Vercel\
2.  Deploy **server** on Render / Railway\
3.  Add required environment variables\
4.  Update CORS + Socket.io origins

------------------------------------------------------------------------

## 🤝 Contributing

PRs are welcome!\
Follow conventional commits and create feature branches.

------------------------------------------------------------------------

## 📄 License

MIT License.

------------------------------------------------------------------------

## 👤 Developer

**Awolad Hossain**\
For support, open an issue or contact via GitHub.

------------------------------------------------------------------------

*Happy coding and keep building amazing things!* 🚀
