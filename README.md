# Employee Management Dashboard

A modern, responsive employee management system built with React, Vite, and Tailwind CSS. This application provides a clean interface for managing employees, departments, and organizational data with full CRUD operations.

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![React](https://img.shields.io/badge/React-19.2.0-61dafb.svg)
![Vite](https://img.shields.io/badge/Vite-7.2.4-646cff.svg)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.1.18-38bdf8.svg)

## ✨ Features

### 🔐 Authentication
- **Sleek Login Page** with modern gradient design and glassmorphism effects
- **Mock Authentication** system with localStorage-based session management
- **Protected Routes** with automatic redirect to login
- **Demo Credentials**:
  - Email: `admin@demo.com`
  - Password: `admin123`

### 📊 Dashboard
- **Real-time Statistics** showing total employees and departments
- **Recent Employees Table** with quick overview
- **Responsive Grid Layout** for metrics cards
- **Clean, minimal design** with professional aesthetics

### 👥 Employee Management
- **Full CRUD Operations** (Create, Read, Update, Delete)
- **Employee Fields**:
  - Employee ID
  - Full Name
  - Email
  - Phone
  - Department
  - Designation
  - Employment Type
  - Status
- **Modal Forms** for adding/editing employees
- **Data Validation** with required fields
- **Responsive Table** with hover effects

### 🏢 Department Management
- **Complete Department CRUD** operations
- **Department Fields**:
  - Department ID
  - Department Name
  - Description
  - Manager
- **Protected ID Field** (disabled during edit)
- **Clean UI** with consistent design patterns

### 🎨 UI/UX Features
- **Fixed Sidebar Navigation** that stays visible while scrolling
- **Responsive Design** that works on all screen sizes
- **Modern Color Scheme** with blue-950 primary color
- **Smooth Transitions** and hover effects
- **Loading States** with user feedback
- **Error Handling** with informative messages

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   VITE_API_BASE_URL=https://695cf70a79f2f34749d681fe.mockapi.io/api/v1
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   
   Navigate to `http://localhost:5173`

## 📁 Project Structure

```
dashboard/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx          # Top navigation bar with logout
│   │   └── Sidebar.jsx         # Fixed sidebar navigation
│   ├── pages/
│   │   ├── Login.jsx           # Authentication page
│   │   ├── Dashboard.jsx       # Main dashboard with stats
│   │   ├── Employees.jsx       # Employee management
│   │   ├── Departments.jsx     # Department management
│   │   └── Designations.jsx    # Designations page (placeholder)
│   ├── services/
│   │   └── authService.js      # Authentication utilities
│   ├── App.jsx                 # Main app component with routing
│   ├── index.css               # Global styles
│   └── main.jsx                # Application entry point
├── .env                        # Environment variables
├── package.json                # Dependencies and scripts
├── vite.config.js              # Vite configuration
└── README.md                   # This file
```

## 🛠️ Built With

- **[React 19.2.0](https://react.dev/)** - UI library
- **[Vite 7.2.4](https://vitejs.dev/)** - Build tool and dev server
- **[Tailwind CSS 4.1.18](https://tailwindcss.com/)** - Utility-first CSS framework
- **[React Router DOM 7.11.0](https://reactrouter.com/)** - Client-side routing
- **[MockAPI](https://mockapi.io/)** - Mock REST API for development

## 📜 Available Scripts

### `npm run dev`
Starts the development server at `http://localhost:5173`

### `npm run build`
Builds the app for production to the `dist` folder

### `npm run preview`
Preview the production build locally

### `npm run lint`
Runs ESLint to check code quality

## 🔌 API Integration

The application uses MockAPI for backend operations. The API base URL is configured in the `.env` file.

### API Endpoints

- **Employees**: `/employees`
  - GET - Fetch all employees
  - POST - Create new employee
  - PUT - Update employee by ID
  - DELETE - Delete employee by ID

- **Departments**: `/departments`
  - GET - Fetch all departments
  - POST - Create new department
  - PUT - Update department by ID
  - DELETE - Delete department by ID

## 🎨 Design System

### Colors
- **Primary**: Blue-950 (`#172554`)
- **Background**: Gray-50 (`#f9fafb`)
- **Text**: Gray-900 (`#111827`)
- **Borders**: Gray-200 (`#e5e7eb`)

### Typography
- **Headings**: 2xl, medium weight
- **Body**: sm/md, normal weight
- **Labels**: sm, medium weight

### Spacing
- **Container Padding**: 8 (2rem)
- **Card Padding**: 6 (1.5rem)
- **Gap**: 4-6 (1-1.5rem)

## 🔒 Authentication Flow

1. User navigates to `/` (Login page)
2. Enters credentials (admin@demo.com / admin123)
3. On successful login:
   - User data stored in localStorage
   - Token stored in localStorage
   - Redirected to `/dashboard`
4. Logout clears localStorage and redirects to login

## 📱 Responsive Design

The application is fully responsive with breakpoints:
- **Mobile**: < 768px (single column layout)
- **Tablet**: 768px - 1024px (2-column grid)
- **Desktop**: > 1024px (4-column grid)

## 🐛 Known Issues & Limitations

- No real backend authentication (uses mock service)
- No password encryption (demo purposes only)
- No role-based access control
- Limited error handling for network failures

## 🚧 Future Enhancements

- [ ] Add role-based access control (Admin, Manager, Employee)
- [ ] Implement real backend API integration
- [ ] Add employee profile pictures
- [ ] Export data to CSV/Excel
- [ ] Advanced filtering and search
- [ ] Dark mode support
- [ ] Email notifications
- [ ] Attendance tracking
- [ ] Performance reviews module
- [ ] Reports and analytics

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Author

**Dev Trusttech**

## 🙏 Acknowledgments

- Design inspiration from modern admin dashboards
- Icons from Heroicons (SVG)
- Color palette from Tailwind CSS

---

**Note**: This is a demonstration project using mock APIs. For production use, implement proper backend authentication, validation, and security measures.
