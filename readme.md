# Blog MERN Application

A full‑stack **MERN Blog Application** featuring authentication, blog and category management, profile updates, image uploads, rich-text editing, comments, likes, real-time chat, AI-generated content, and deployment on Vercel.

---

## 🚀 Overview

This project is a complete blog platform built with the MERN stack (MongoDB, Express, React, Node). It includes both client and server code, role-aware authentication, real-time chat using Socket.io, Cloudinary file uploads, CKEditor for rich-text blog creation, Google OAuth, and AI-assisted content creation.

### Tech Stack

**Frontend**
- React
- React Router
- Redux Toolkit & Redux Persist
- Axios
- Tailwind CSS (or plain CSS)
- CKEditor 5
- React Dropzone
- Socket.io client

**Backend**
- Node.js
- Express
- MongoDB + Mongoose
- JWT for authentication
- Multer + Cloudinary for file uploads
- Google OAuth
- Socket.io server

**Dev / Infra**
- Vite / Create React App
- MongoDB Atlas
- Vercel (frontend + functions if used)
- Postman / Thunder Client

---

## 📁 Project Structure

```
blog-mern/
├── client/            # React frontend
├── server/            # Node + Express backend
├── README.md
├── .env.example
└── package.json
```

---

## 🔧 Getting Started

### Prerequisites
- Node.js (v16+)
- npm or yarn
- MongoDB (Atlas recommended)
- Cloudinary account (for image uploads)
- Google OAuth credentials (if using Google Sign-In)

### Clone the repository

```bash
git clone <your-repo-url> blog-mern
cd blog-mern
```

### Frontend setup

```bash
cd client
npm install
npm run dev # or npm start
```

### Backend setup

```bash
cd server
npm install
npm run dev # nodemon or ts-node-dev
```

---

## ⚙️ Environment Variables

Create a `.env` (or `.env.local`) file in both `client` and `server` (where applicable). Example server `.env`:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

Frontend `.env` example:

```env
VITE_API_URL=http://localhost:5000/api
VITE_GOOGLE_CLIENT_ID=your_google_client_id
```

---

## 🧭 Feature List (What’s implemented)

### Frontend
- Common layout: Topbar, Sidebar, Footer
- Dynamic routes for pages (Home, Explore, Category, Blog Details, Profile)
- Styling and fonts configuration
- Sign-In & Sign-Up pages (email/password + Google login)
- Redux Toolkit + Redux Persist for login state
- User dropdown and logout
- Profile page with image upload (React Dropzone + Cloudinary)
- Category UI (Add / Show / Update / Delete)
- Blog UI with CKEditor (Add / Show / Update / Delete)
- Search functionality
- Blog listing on home page and blog details page
- Comments (Add / Show)
- Like/Unlike blogs
- Related posts by category
- Responsive design
- Client-side route protection (private routes)
- Chat sidebar using Socket.io client
- AI content generation integration (e.g., OpenAI)

### Backend
- User model (email, name, password hash, avatar, role, etc.)
- Auth controller: register, login, Google auth
- Profile APIs & image upload (Multer + Cloudinary)
- Category model + CRUD controllers
- Blog model + CRUD controllers (with category refs)
- Comment model + APIs
- Like/Unlike blog API
- Search and filter APIs
- JWT middleware for route protection
- Socket.io server for real-time chat

---

## 🔐 Authentication Flow

- Register: `POST /api/auth/register` — creates user, returns JWT
- Login: `POST /api/auth/login` — verifies credentials, returns JWT
- Google Login: `POST /api/auth/google` — verifies Google token, issues local JWT
- Protected routes require `Authorization: Bearer <token>` header

---

## 🗂 API Endpoints (example list)

> Base: `/api`

### Auth
- `POST /api/auth/register` — register user
- `POST /api/auth/login` — login user
- `POST /api/auth/google` — google auth

### Users
- `GET /api/users/me` — get current user (protected)
- `PUT /api/users/me` — update profile (protected)

### Categories
- `GET /api/categories` — list categories
- `POST /api/categories` — create category (protected/admin)
- `PUT /api/categories/:id` — update category (protected/admin)
- `DELETE /api/categories/:id` — delete category (protected/admin)

### Blogs
- `GET /api/blogs` — list blogs (with query params: search, category, page)
- `POST /api/blogs` — create blog (protected)
- `GET /api/blogs/:id` — blog details
- `PUT /api/blogs/:id` — update blog (protected/owner)
- `DELETE /api/blogs/:id` — delete blog (protected/owner)
- `POST /api/blogs/:id/like` — like/unlike blog (protected)

### Comments
- `POST /api/blogs/:id/comments` — add comment (protected)
- `GET /api/blogs/:id/comments` — list comments

### Uploads
- `POST /api/upload` — upload image (protected) — uses Multer -> Cloudinary

---

## 🧩 Redux & State Management

- Use **Redux Toolkit** for slices (auth, user, categories, blogs, comments)
- Use **Redux Persist** to persist auth token and user across sessions
- Use Axios interceptors to attach auth token to requests

---

## 🖼️ File Uploads

- Client: React Dropzone to collect image file
- Server: Multer middleware to receive file, then upload to Cloudinary
- Save returned Cloudinary URL in user's profile or blog document

---

## ✍️ Rich Text Editor

- CKEditor 5 integrated for blog content creation
- Save content as HTML in `blog.content`
- Render with `dangerouslySetInnerHTML` in React (sanitize if necessary)

---

## 💬 Real-Time Chat

- Socket.io server listens for connections
- Client connects with token and receives user list, messages
- Chat messages saved to a messages collection (optional)

---

## 🤖 AI Content Generation

- Integrate with an AI API (OpenAI or similar) to assist post creation
- Example features: generate title, outline, or draft paragraph

---

## 📱 Responsiveness

Use Tailwind utilities or CSS breakpoints to support mobile, tablet and desktop layouts. Ensure sidebar collapses on small screens.

---

## ✅ Deployment (Vercel)

1. Build frontend for production: `npm run build` in client
2. Configure env vars in Vercel dashboard
3. Deploy backend as serverless functions or use a separate hosting (Heroku, Railway, Render) and point frontend to that API
4. Use MongoDB Atlas for production DB

---

## 🛠️ Tips & Best Practices

- Hash passwords using bcrypt
- Validate inputs on server-side and client-side
- Use rate limiting / request throttling for auth endpoints
- Sanitize editor HTML to prevent XSS
- Keep Cloudinary credentials secret (do not expose in client)
- Use pagination for blog listing

---

## 🔁 Common Commands

**Client**
```bash
cd client
npm install
npm run dev
```

**Server**
```bash
cd server
npm install
npm run dev
```

---

## 🤝 Contributing

1. Fork the repo
2. Create a new branch (`git checkout -b feature/your-feature`)
3. Commit changes (`git commit -m "feat: add ..."`)
4. Push (`git push origin feature/your-feature`)
5. Open a Pull Request

---

## 📄 License

This project is open source — add an appropriate license (e.g. MIT) if you want others to use and contribute.

---

## ✉️ Contact

**Developer:** Awolad Hossain

Project maintained by Awolad Hossain. For questions or help, open an issue on the repository or message me on GitHub.

---

*Happy coding — build something awesome!*

