# 🚀 Frontend Developer Internship Assignment

A full-stack scalable web app built using **React + Node.js + MongoDB**, featuring authentication, profile management, and CRUD operations.

---

## 📌 Features

### **Frontend**
- React + Vite  
- Tailwind CSS  
- JWT-based Auth Context  
- Protected Routes  
- Login & Register Pages  
- Dashboard  
- Tasks CRUD  
- Search + Filter  
- Profile Update  
- Responsive UI  

### **Backend**
- Node.js + Express  
- MongoDB (Mongoose)  
- JWT Authentication  
- Bcrypt Password Hashing  
- Task CRUD  
- User Profile Fetch/Update  
- Auth Middleware  

---

## 📦 Installation

### **Backend**
```bash
cd backend
npm install
npm run dev
```

Create a `.env` file:

```
MONGO_URI=mongodb+srv://...
JWT_SECRET=your_secret
PORT=5000
```

---

### **Frontend**
```bash
cd frontend
npm install
npm run dev
```

---

## 🔥 API Endpoints

### **Auth**
| Method | Endpoint | Description |
|--------|------------|-------------|
| POST | /api/users/register | Register new user |
| POST | /api/users/login | Login user + get JWT |

### **Profile**
| Method | Endpoint | Description |
|--------|------------|-------------|
| GET | /api/users/profile | Get profile |
| PUT | /api/users/profile | Update profile |

### **Tasks**
| Method | Endpoint | Description |
|--------|------------|-------------|
| POST | /api/tasks | Create task |
| GET | /api/tasks | Get all tasks |
| PUT | /api/tasks/:id | Update task |
| DELETE | /api/tasks/:id | Delete task |

---

## 🛠 Technologies Used
- React  
- TailwindCSS  
- Node.js  
- Express  
- MongoDB  
- JWT  
- Bcrypt  
- Axios  

---

## 📂 Project Structure
```
backend/
  controllers/
  models/
  routes/
  middleware/
  server.js

frontend/
  src/
    components/
    pages/
    context/
    api/
```

---

## 📈 Scalability Notes

### **Frontend**
- Component-based architecture for reusability  
- Context API for global auth state  
- API abstraction layer  
- Can migrate to Redux if app grows  
- Lazy loading & code-splitting ready  

### **Backend**
- Modular MVC structure  
- Can migrate to microservices  
- JWT auth scalable for distributed systems  
- MongoDB Atlas handles sharding & scaling  
- Env-based config for deployment  

### **Deployment Ready**
- Frontend can be deployed on Vercel/Netlify  
- Backend can be deployed on Render/Railway  
- MongoDB Atlas cloud database  
- CORS + security headers can be added  

---
