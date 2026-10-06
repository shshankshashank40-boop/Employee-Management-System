# Employee Management System

A full-stack Employee Management System built as a practical assignment for the **Gupio Campus Placement Full Stack Developer** evaluation. It provides a complete CRUD interface for managing employee records, backed by a REST API and MongoDB Atlas for persistent storage.

---

## Features

- **List Employees** — View all employees in a responsive table (desktop) or card grid (mobile)
- **Employee Details** — Click any employee to view their complete profile in a modal
- **Create Employee** — Add new employees via a validated form
- **Edit Employee** — Update existing employee information
- **Delete Employee** — Remove employees with a confirmation dialog
- **Search** — Search employees by name or email via backend API query
- **Department Filter** — Filter employees by department via backend API query
- **Combined Search + Filter** — Use both simultaneously
- **Frontend Validation** — Field-level validation with inline error messages
- **Backend Validation** — Server-side validation with clear error messages
- **Duplicate Email Detection** — Prevents duplicate email addresses
- **Loading States** — Animated skeleton rows while data is being fetched
- **Empty States** — Separate UI for "no employees" vs "no search results"
- **Toast Notifications** — Success/error feedback after every operation
- **Error Handling** — API errors displayed with a Retry option

---

## Technologies Used

### Frontend
| Technology | Version | Purpose |
|---|---|---|
| React | 18.3.1 | UI framework |
| Vite | 6.x | Build tool and dev server |
| Tailwind CSS | 3.4.x | Utility-first CSS styling |
| Axios | 1.7.9 | HTTP client for API calls |
| Lucide React | 0.475.0 | Icon library |

### Backend
| Technology | Version | Purpose |
|---|---|---|
| Node.js | 24.x | JavaScript runtime |
| Express.js | 4.21.x | REST API framework |
| Mongoose | 8.9.5 | MongoDB ODM |
| CORS | 2.8.5 | Cross-origin request handling |
| dotenv | 16.4.7 | Environment variable management |
| Morgan | 1.10.0 | HTTP request logging |

### Database
| Technology | Purpose |
|---|---|
| MongoDB Atlas | Cloud-hosted MongoDB database |

---

## Architecture

```
React Frontend (Vite, port 5173)
         │
         │  HTTP requests via Axios
         │  VITE_API_URL = http://localhost:5001/api
         ▼
Express/Node.js REST API (port 5001)
         │
         │  Mongoose ODM
         │  MONGODB_URI (env variable)
         ▼
MongoDB Atlas (Cloud Database)
         │
         └── Collection: employees
             Fields: name, email, department, designation, createdAt, updatedAt
```

---

## Project Structure

```
employee-management/
├── .gitignore                          # Root gitignore
│
├── client/                             # React Frontend
│   ├── .env                            # Local env vars (gitignored)
│   ├── .env.example                    # Env vars template
│   ├── .gitignore                      # Client-level gitignore
│   ├── index.html                      # HTML entry point
│   ├── vite.config.js                  # Vite configuration + dev proxy
│   ├── tailwind.config.js              # Tailwind CSS config
│   ├── postcss.config.js               # PostCSS config
│   ├── package.json
│   └── src/
│       ├── main.jsx                    # React app entry point
│       ├── App.jsx                     # Root component
│       ├── index.css                   # Global styles + Tailwind directives
│       ├── components/
│       │   ├── Header.jsx              # Top navigation bar
│       │   ├── SearchBar.jsx           # Search input + department filter + Add button
│       │   ├── StatsOverview.jsx       # Summary stat cards
│       │   ├── EmployeeTable.jsx       # Desktop table + mobile card grid
│       │   ├── EmployeeModal.jsx       # Add / Edit employee form modal
│       │   ├── EmployeeDetailModal.jsx # View employee details modal
│       │   ├── DeleteConfirmModal.jsx  # Delete confirmation modal
│       │   ├── EmptyState.jsx          # Empty list / no search results UI
│       │   └── Toast.jsx               # Success / error toast notification
│       ├── pages/
│       │   └── Dashboard.jsx           # Main page — state management and layout
│       └── services/
│           ├── api.js                  # Axios instance with base URL and interceptor
│           └── employeeService.js      # API call functions for all employee operations
│
└── server/                             # Node.js / Express Backend
    ├── .env                            # Local env vars (gitignored)
    ├── .env.example                    # Env vars template
    ├── .gitignore                      # Server-level gitignore
    ├── package.json
    ├── seed.js                         # Optional: seeds sample employee data
    ├── test-api.js                     # Automated API integration tests
    └── src/
        ├── server.js                   # Express app entry point
        ├── config/
        │   └── db.js                   # MongoDB connection via Mongoose
        ├── models/
        │   └── Employee.js             # Mongoose Employee schema + model
        ├── controllers/
        │   └── employeeController.js   # CRUD logic for all API endpoints
        ├── routes/
        │   └── employeeRoutes.js       # Express router — maps URLs to controllers
        └── middleware/
            └── errorHandler.js         # Global error handler + 404 handler
```

---

## Prerequisites

- **Node.js** v18 or higher (`node -v`)
- **npm** v9 or higher (`npm -v`)
- **MongoDB Atlas** account (free tier is sufficient) — OR local MongoDB for development
- **Git**

---

## Environment Variables

### Backend — `server/.env`

Copy from `server/.env.example` and fill in your values:

```env
PORT=5000
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/employee_management?retryWrites=true&w=majority
CLIENT_URL=http://localhost:5173
NODE_ENV=development
```

| Variable | Description | Example |
|---|---|---|
| `PORT` | Port the Express server listens on | `5000` |
| `MONGODB_URI` | MongoDB Atlas connection string | `mongodb+srv://...` |
| `CLIENT_URL` | Frontend URL (used for CORS) | `http://localhost:5173` |
| `NODE_ENV` | Environment mode | `development` or `production` |

> ⚠️ **Never commit `server/.env` or any file containing real credentials.**

### Frontend — `client/.env`

Copy from `client/.env.example`:

```env
VITE_API_URL=http://localhost:5000/api
```

| Variable | Description | Example |
|---|---|---|
| `VITE_API_URL` | Full base URL of the backend API | `http://localhost:5000/api` |

---

## Local Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/<your-username>/employee-management.git
cd employee-management
```

### 2. Set up the Backend

```bash
cd server
cp .env.example .env
```

Edit `server/.env` and set your `MONGODB_URI` from MongoDB Atlas.

Install dependencies:

```bash
npm install
```

### 3. Set up the Frontend

```bash
cd ../client
cp .env.example .env
```

The default `VITE_API_URL=http://localhost:5000/api` works for local development. Install dependencies:

```bash
npm install
```

### 4. (Optional) Seed sample data

```bash
cd ../server
node seed.js
```

This inserts 6 sample employees if the database has fewer than 3 records.

---

## Running the Application Locally

Open **two separate terminals**:

### Terminal 1 — Backend

```bash
cd employee-management/server
npm run dev
```

Expected output:
```
Server running in development mode on port 5000
MongoDB Connected: cluster0.xxxxx.mongodb.net
```

For production start (no auto-reload):
```bash
npm start
```

### Terminal 2 — Frontend

```bash
cd employee-management/client
npm run dev
```

Expected output:
```
VITE v6.x.x  ready in 200ms
➜  Local: http://localhost:5173/
```

Open **http://localhost:5173** in your browser.

---

## API Endpoints

Base URL: `http://localhost:5000/api`

All responses follow this format:

**Success:**
```json
{
  "success": true,
  "data": { ... }
}
```

**Error:**
```json
{
  "success": false,
  "message": "Descriptive error message"
}
```

### Endpoints

| Method | URL | Description | Success Code |
|---|---|---|---|
| `GET` | `/api/health` | Health check | 200 |
| `GET` | `/api/employees` | Get all employees | 200 |
| `GET` | `/api/employees?search=john` | Search by name or email | 200 |
| `GET` | `/api/employees?department=Engineering` | Filter by department | 200 |
| `GET` | `/api/employees?search=john&department=Engineering` | Search + filter combined | 200 |
| `GET` | `/api/employees/:id` | Get single employee by ID | 200 |
| `POST` | `/api/employees` | Create a new employee | 201 |
| `PUT` | `/api/employees/:id` | Update an existing employee | 200 |
| `DELETE` | `/api/employees/:id` | Delete an employee | 200 |

---

## Example Request Bodies

### POST /api/employees — Create Employee

```json
{
  "name": "Jane Doe",
  "email": "jane.doe@example.com",
  "department": "Engineering",
  "designation": "Senior Software Engineer"
}
```

**Success Response (201):**
```json
{
  "success": true,
  "message": "Employee created successfully",
  "data": {
    "_id": "6ac4a586783e733652a982cb",
    "name": "Jane Doe",
    "email": "jane.doe@example.com",
    "department": "Engineering",
    "designation": "Senior Software Engineer",
    "createdAt": "2026-10-06T07:38:46.696Z",
    "updatedAt": "2026-10-06T07:38:46.696Z"
  }
}
```

**Error Response — Validation (400):**
```json
{
  "success": false,
  "message": "Name is required and must be at least 2 characters long, A valid email address is required"
}
```

**Error Response — Duplicate Email (400):**
```json
{
  "success": false,
  "message": "An employee with email 'jane.doe@example.com' already exists"
}
```

### PUT /api/employees/:id — Update Employee

Partial updates are supported (send only fields you want to change):

```json
{
  "designation": "Staff Engineer",
  "department": "Platform Engineering"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Employee updated successfully",
  "data": {
    "_id": "6ac4a586783e733652a982cb",
    "name": "Jane Doe",
    "email": "jane.doe@example.com",
    "department": "Platform Engineering",
    "designation": "Staff Engineer",
    "createdAt": "2026-10-06T07:38:46.696Z",
    "updatedAt": "2026-10-06T07:45:00.000Z"
  }
}
```

### DELETE /api/employees/:id

No request body required.

**Success Response (200):**
```json
{
  "success": true,
  "message": "Employee deleted successfully",
  "data": { "id": "6ac4a586783e733652a982cb" }
}
```

**Not Found (404):**
```json
{
  "success": false,
  "message": "Employee not found"
}
```

---

## Search and Filtering

Search and filter are handled entirely by the backend API, not the frontend.

### Search by name or email
```
GET /api/employees?search=jane
GET /api/employees?search=jane.doe@example.com
```

- Case-insensitive
- Searches both `name` and `email` fields simultaneously using MongoDB `$or` with `$regex`

### Filter by department
```
GET /api/employees?department=Engineering
```

- Case-insensitive exact match

### Combined
```
GET /api/employees?search=jane&department=Engineering
```

### Frontend behaviour
- The search input debounces 250ms before firing the API request
- Department filter fires immediately on change
- Selecting "All Departments" removes the department filter

---

## Validation and Error Handling

### Frontend Validation (client-side, in `EmployeeModal.jsx`)

| Field | Rules |
|---|---|
| Name | Required. Minimum 2 characters after trim. |
| Email | Required. Must match `/^[^\s@]+@[^\s@]+\.[^\s@]+$/` |
| Department | Required. Cannot be empty. |
| Designation | Required. Cannot be empty. |

- Errors shown inline under each field with red border highlight
- Errors clear as user types (reactive)
- Form does not submit if any validation fails

### Backend Validation (server-side, in `employeeController.js`)

Same rules enforced independently on the server:
- Name: minimum 2 characters
- Email: valid format, unique (no duplicates)
- Department: required
- Designation: required

### HTTP Error Codes Used

| Code | Meaning |
|---|---|
| `200` | Success (GET, PUT, DELETE) |
| `201` | Created (POST) |
| `400` | Bad request (validation failure, duplicate email, invalid ObjectId) |
| `404` | Employee not found |
| `500` | Internal server error |

---

## Database Setup (MongoDB Atlas)

1. Go to [https://cloud.mongodb.com](https://cloud.mongodb.com) and create a free account
2. Create a new **Cluster** (free M0 tier is sufficient)
3. Under **Database Access**, create a database user with read/write access
4. Under **Network Access**, add `0.0.0.0/0` to allow connections (or your specific IP)
5. Click **Connect** on your cluster → **Drivers** → copy the connection string
6. Replace `<username>` and `<password>` in the string with your credentials
7. Paste the full string into `server/.env` as `MONGODB_URI`

### Mongoose Schema

```javascript
{
  name:        { type: String, required: true, minlength: 2, trim: true },
  email:       { type: String, required: true, unique: true, lowercase: true },
  department:  { type: String, required: true, trim: true },
  designation: { type: String, required: true, trim: true },
  createdAt:   Date,   // auto-managed by Mongoose timestamps
  updatedAt:   Date    // auto-managed by Mongoose timestamps
}
```

---

## Deployment Instructions

### Backend → Render

1. Push code to GitHub (ensure `server/.env` is gitignored)
2. Go to [https://render.com](https://render.com) → **New Web Service**
3. Connect your GitHub repository
4. Configure:
   - **Root Directory:** `server`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
5. Under **Environment Variables**, add:
   ```
   MONGODB_URI = <your Atlas connection string>
   CLIENT_URL  = <your Vercel frontend URL>
   NODE_ENV    = production
   ```
   > Render assigns `PORT` automatically — do not set it manually.
6. Deploy and note the Render URL (e.g. `https://employee-api.onrender.com`)

### Frontend → Vercel

1. Go to [https://vercel.com](https://vercel.com) → **Add New Project**
2. Import your GitHub repository
3. Configure:
   - **Root Directory:** `client`
   - **Framework Preset:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
4. Under **Environment Variables**, add:
   ```
   VITE_API_URL = https://employee-api.onrender.com/api
   ```
5. Deploy

### After Deployment

Update `server/.env` on Render:
```
CLIENT_URL = https://your-app.vercel.app
```

This ensures CORS allows requests from your deployed frontend.

---

## Testing and Verification Performed

An automated test suite is included at `server/test-api.js`. Run it while the server is running:

```bash
cd server
node test-api.js
```

### Test Results (19/19 PASSED)

| Test | Result |
|---|---|
| GET /api/health returns 200 | ✅ PASS |
| POST /api/employees creates employee | ✅ PASS |
| GET /api/employees returns array | ✅ PASS |
| GET /api/employees has correct count | ✅ PASS |
| GET /api/employees/:id retrieves single employee | ✅ PASS |
| GET /api/employees/:id returns correct name | ✅ PASS |
| PUT /api/employees/:id updates name | ✅ PASS |
| PUT /api/employees/:id updates designation | ✅ PASS |
| Search by name finds employee | ✅ PASS |
| Search by email finds employee | ✅ PASS |
| Filter by department filters accurately | ✅ PASS |
| Combined search + department works | ✅ PASS |
| POST with invalid data returns 400 | ✅ PASS |
| POST with duplicate email returns 400 | ✅ PASS |
| GET with invalid ObjectId returns 400 | ✅ PASS |
| GET non-existent employee returns 404 | ✅ PASS |
| DELETE /api/employees/:id deletes employee | ✅ PASS |
| GET after delete returns 404 | ✅ PASS |

---

## Completed Features

- [x] Employee list with table (desktop) and card grid (mobile)
- [x] View employee details modal
- [x] Create employee with form validation
- [x] Edit employee
- [x] Delete employee with confirmation dialog
- [x] Search by name (backend)
- [x] Search by email (backend)
- [x] Filter by department (backend)
- [x] Combined search + department filter
- [x] Frontend field-level validation
- [x] Backend validation with clear error messages
- [x] Duplicate email prevention
- [x] Consistent `{ success, data/message }` API response format
- [x] HTTP status codes: 200, 201, 400, 404, 500
- [x] CORS configured with `CLIENT_URL` environment variable
- [x] MongoDB Atlas connection via `MONGODB_URI` environment variable
- [x] Mongoose timestamps (`createdAt`, `updatedAt`)
- [x] Loading skeleton states
- [x] Empty state for no employees
- [x] Empty state for no search results
- [x] Toast notifications for create, update, delete
- [x] API error banner with Retry button
- [x] Responsive layout (desktop table + mobile cards)
- [x] `.env.example` files for both frontend and backend
- [x] `.gitignore` at root, `server/`, and `client/` level
- [x] Seed script for sample data

## Known Limitations

- No authentication or authorization — all endpoints are publicly accessible
- No pagination — all employees are loaded in a single API call (suitable for small datasets)
- No unit or component tests — only integration API tests are included
- Department list in the form dropdown is predefined; a custom input option is available
- Search is not real-time debounced beyond 250ms; very large datasets may cause slight delay
- No dark mode
