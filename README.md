# 🧠 Project: **Cliques - Service Booking and Chat Platform**

A full-stack application that connects clients with service providers. This project features:

- User authentication (clients and providers)
- Service listings with categories
- Appointment booking
- Real-time messaging
- Ticket and review system

---

## 📁 Project Structure

```
cliques/
├── backend/                    # Node.js + Express backend
│   ├── db.js                   # MongoDB connection setup
│   ├── index.js                # Main server entry
│   ├── middleware/             # Middleware (e.g., user verification)
│   ├── models/                 # Mongoose models
│   │   ├── employee/
│   │   ├── services/
│   │   └── users/
│   ├── routes/                 # API routes
│   │   ├── employee/
│   │   ├── service/
│   │   └── website/
│   └── package.json            # Backend dependencies
├── frontend/                   # React frontend (assumed, based on `MyChat.js`)
│   ├── public/
│   ├── src/
│   │   ├── components/         # Reusable components (Sidebar, Chat, etc.)
│   │   ├── Context/            # Context API (UserContext, etc.)
│   │   ├── pages/              # Pages like MyChat, Login, Register
│   │   └── App.js              # Main frontend entry point
│   └── package.json            # Frontend dependencies
├── .env                        # Environment variables
├── .gitignore
├── README.md                   # Documentation (you are reading it)
```

---

## 🔧 Technologies Used

**Frontend:**
- React.js
- React Bootstrap
- Context API for global state

**Backend:**
- Node.js + Express
- MongoDB + Mongoose
- JWT for authentication

---

## 🔌 API Overview 

### 🔐 Auth & Users
- `POST /auth/user/register` – Register new user
- `POST /auth/user/login` – Login
- `POST /auth/user/show` – Get Current Login User Data
- `POST /auth/user/delete` – Delete User Data
- `POST /auth/user/status/:id` – Update user status to Suspend or Activate
- `POST /auth/user/update` – Update password
- `POST /auth/user/updateinfo` – Update information 
- `POST /auth/user/updateotherinfo` – Update other information for Service provider

### 🗂️ Categories
- `GET /api/category/show` – Show all categories  
- `GET /api/category/getedititem/:id` – Get category by ID  
- `POST /api/category/add` – Add category  
- `PUT /api/category/updatecategory/:id` – Update category  
- `DELETE /api/category/deletecategory/:id` – Delete category  

### 🧰 Services
- `GET /api/service/show` – Show all services  
- `GET /api/service/getedititem/:id` – Get service by ID  
- `POST /api/service/add` – Add service  
- `PUT /api/service/update/:id` – Update service  
- `DELETE /api/service/delete/:id` – Delete service  
 
### 👥 Client & Review
- `GET/POST/PUT/DELETE /api/client/*`  
- `GET/POST/PUT/DELETE /api/review/*`  

### 📞 Contact
- `GET/POST/PUT/DELETE /api/contact/*`  

### 🌐 Web APIs

#### Categories
- `GET /web-api/category/show`  
- `GET /web-api/category/getedititem/:id`  

#### Services
- `GET /web-api/service/getservicesbycategory/:categoryId`  

#### Service Providers
- `GET /web-api/service-provider/show`  
- `GET /web-api/service-provider/getinfo/:id`  
- `GET /web-api/service-provider/category/:categoryId`  
- `GET /web-api/service-provider/city/:cityName`  
- `GET /web-api/service-provider/availability/:YesOrNo`  
- `GET /web-api/service-provider/experience/:years`  
- `GET /web-api/service-provider/pricing`  
- `GET /web-api/service-provider/filters`  

#### Appointments
- `POST /web-api/appointment/add`  
- `GET /web-api/appointment/show/client/:clientId`  
- `GET /web-api/appointment/show/provider/:providerId`  
- `GET /web-api/appointment/getinfo/:id`  

#### Tickets
- `POST /web-api/ticket/add`  
- `GET /web-api/ticket/all`  
- `GET /web-api/ticket/client/:clientId`  
- `GET /web-api/ticket/admin-tickets`  

#### Reviews
- `GET /web-api/review/client/:clientId`  
- `GET /web-api/review/getedititem/:id`


## 🚀 Getting Started

### 1. Backend

```bash
cd backend
npm install
node index.js
```

Ensure MongoDB is running and `.env` contains:

```
MONGO_URI=mongodb+srv://sauravchaudhary3355:qmmdOIn38McXTWaF@cliques-db.8uor3.mongodb.net/cliques
JWT_SECRET=commonAdmin
```

### 2. Frontend

```bash
cd frontend
npm install
npm start
```

---

## 🛠️ Features In Progress

- ✅ Chat between clients and providers
- ✅ Ticketing system per appointment
- ✅ Review system with rating
- 🔄 Admin dashboard (WIP)
- 🔄 Real-time chat with WebSockets (Planned)

---

## ✍️ Authors

- **CLIQUES** – Full-stack developer behind this project
- Contributions welcome!