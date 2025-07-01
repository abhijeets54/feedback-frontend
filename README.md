# Employee Feedback Management System - Frontend

A modern, responsive React frontend for the Employee Feedback Management System, built with TypeScript, Tailwind CSS, and Vite for optimal performance and developer experience.

## 🚀 Overview

This frontend application provides an intuitive, professional interface for managing employee feedback workflows. It features role-based dashboards, real-time updates, and a clean design that works seamlessly across all devices. Built with modern React patterns and TypeScript for type safety and maintainability.

### Key Features

- **🎨 Modern UI/UX**: Clean, professional interface with Tailwind CSS
- **📱 Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **🔐 Secure Authentication**: JWT-based authentication with automatic token management
- **👥 Role-Based Interface**: Separate dashboards for managers and employees
- **⚡ Real-Time Updates**: Instant feedback on user actions and data changes
- **🎯 Type Safety**: Full TypeScript implementation for robust development
- **🚀 Performance Optimized**: Built with Vite for fast development and production builds
- **♿ Accessibility**: WCAG compliant with proper ARIA labels and keyboard navigation
- **🎭 Smooth Animations**: Subtle animations that enhance user experience
- **📊 Interactive Dashboards**: Rich analytics and data visualization
- **🔄 Offline Support**: Service worker for basic offline functionality

## 🛠️ Technology Stack

### Core Framework
- **React 18**: Latest React with concurrent features and hooks
- **TypeScript 5**: Full type safety and modern JavaScript features
- **Vite 5**: Lightning-fast build tool and development server

### Styling & UI
- **Tailwind CSS 3**: Utility-first CSS framework for rapid UI development
- **Lucide React**: Beautiful, customizable SVG icons
- **CSS Modules**: Scoped styling for component isolation

### State Management & Data
- **React Context**: Built-in state management for authentication and global state
- **Axios**: HTTP client with interceptors and error handling
- **React Router 6**: Modern routing with data loading and error boundaries

### Development Tools
- **ESLint**: Code linting with TypeScript and React rules
- **Prettier**: Code formatting for consistent style
- **PostCSS**: CSS processing with autoprefixer
- **Vite PWA**: Progressive Web App capabilities

## 📋 Prerequisites

- Node.js 18 or higher
- npm 9 or higher (or yarn/pnpm equivalent)
- Modern web browser with ES2020 support

## 🚀 Quick Start

### 1. Environment Setup

```bash
# Clone the repository
git clone <repository-url>
cd feedback-frontend

# Install dependencies
npm install

# Copy environment template
cp .env.example .env.local

# Edit environment variables
VITE_API_URL=http://localhost:8000
VITE_APP_NAME=Employee Feedback System
```

### 2. Development Server

```bash
# Start development server
npm run dev

# Or with specific port
npm run dev -- --port 3000

# Open in browser
open http://localhost:5173
```

### 3. Build for Production

```bash
# Create production build
npm run build

# Preview production build
npm run preview

# Serve production build
npm run serve
```

## 📁 Project Structure

```
feedback-frontend/
├── public/
│   ├── favicon.ico          # Application favicon
│   ├── manifest.json        # PWA manifest
│   └── robots.txt           # SEO robots file
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── common/          # Shared components
│   │   │   ├── AnimatedButton.tsx
│   │   │   ├── AnimatedCard.tsx
│   │   │   └── LoadingSpinner.tsx
│   │   ├── auth/            # Authentication components
│   │   │   ├── Login.tsx
│   │   │   └── Register.tsx
│   │   ├── dashboard/       # Dashboard components
│   │   │   ├── Dashboard.tsx
│   │   │   ├── ManagerDashboard.tsx
│   │   │   └── EmployeeDashboard.tsx
│   │   ├── feedback/        # Feedback-related components
│   │   │   ├── FeedbackForm.tsx
│   │   │   ├── FeedbackList.tsx
│   │   │   ├── FeedbackRequest.tsx
│   │   │   └── FeedbackRequests.tsx
│   │   └── layout/          # Layout components
│   │       ├── Layout.tsx
│   │       ├── Header.tsx
│   │       └── Sidebar.tsx
│   ├── contexts/            # React contexts
│   │   └── AuthContext.tsx  # Authentication state management
│   ├── hooks/               # Custom React hooks
│   │   ├── useAuth.ts
│   │   ├── useApi.ts
│   │   └── useLocalStorage.ts
│   ├── services/            # API and external services
│   │   ├── api.ts           # API client configuration
│   │   └── auth.ts          # Authentication service
│   ├── types/               # TypeScript type definitions
│   │   ├── index.ts         # Main type exports
│   │   ├── auth.ts          # Authentication types
│   │   ├── user.ts          # User-related types
│   │   └── feedback.ts      # Feedback-related types
│   ├── utils/               # Utility functions
│   │   ├── constants.ts     # Application constants
│   │   ├── helpers.ts       # Helper functions
│   │   └── validation.ts    # Form validation utilities
│   ├── styles/              # Global styles
│   │   ├── globals.css      # Global CSS styles
│   │   └── components.css   # Component-specific styles
│   ├── App.tsx              # Main application component
│   ├── main.tsx             # Application entry point
│   └── vite-env.d.ts        # Vite type definitions
├── .env.example             # Environment variables template
├── .env.local               # Local environment variables
├── .gitignore               # Git ignore rules
├── eslint.config.js         # ESLint configuration
├── index.html               # HTML template
├── package.json             # Dependencies and scripts
├── postcss.config.js        # PostCSS configuration
├── tailwind.config.js       # Tailwind CSS configuration
├── tsconfig.json            # TypeScript configuration
├── tsconfig.node.json       # Node.js TypeScript configuration
├── vite.config.ts           # Vite configuration
└── README.md                # This file
```

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file with the following variables:

```env
# API Configuration
VITE_API_URL=http://localhost:8000

# Application Settings
VITE_APP_NAME=Employee Feedback System
VITE_APP_VERSION=1.0.0

# Feature Flags
VITE_ENABLE_ANALYTICS=false
VITE_ENABLE_PWA=true

# Development Settings
VITE_DEBUG_MODE=false
```

### Production Configuration

For production deployment:

```env
VITE_API_URL=https://your-backend-api.com
VITE_APP_NAME=Employee Feedback System
VITE_APP_VERSION=1.0.0
VITE_ENABLE_ANALYTICS=true
VITE_ENABLE_PWA=true
VITE_DEBUG_MODE=false
```

### Tailwind CSS Configuration

The project uses a custom Tailwind configuration with:

```javascript
// tailwind.config.js
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
        },
        // Custom color palette
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
}
```

## 🎨 Component Architecture

### Authentication Components

**Login Component** (`src/components/auth/Login.tsx`)
- Secure login form with validation
- JWT token handling
- Error state management
- Responsive design

**Register Component** (`src/components/auth/Register.tsx`)
- User registration with role selection
- Manager assignment for employees
- Form validation and error handling
- Success state management

### Dashboard Components

**Manager Dashboard** (`src/components/dashboard/ManagerDashboard.tsx`)
- Team overview and statistics
- Pending feedback requests
- Team member management
- Analytics and insights

**Employee Dashboard** (`src/components/dashboard/EmployeeDashboard.tsx`)
- Personal feedback history
- Feedback request functionality
- Acknowledgment tracking
- Performance insights

### Feedback Components

**Feedback Form** (`src/components/feedback/FeedbackForm.tsx`)
- Structured feedback creation
- Employee selection
- Sentiment analysis
- Rich text editing

**Feedback List** (`src/components/feedback/FeedbackList.tsx`)
- Paginated feedback display
- Filtering and sorting
- Status indicators
- Action buttons

## 🔐 Authentication & Security

### JWT Token Management

```typescript
// Automatic token handling
const api = axios.create({
  baseURL: API_BASE_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Automatic logout on token expiration
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);
```

### Protected Routes

```typescript
// Route protection with role-based access
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) return <LoadingSpinner />;
  if (!user) return <Navigate to="/login" />;

  return <>{children}</>;
};
```

## 📱 Responsive Design

### Breakpoint System

```css
/* Tailwind CSS breakpoints */
sm: 640px   /* Small devices (landscape phones) */
md: 768px   /* Medium devices (tablets) */
lg: 1024px  /* Large devices (laptops) */
xl: 1280px  /* Extra large devices (desktops) */
2xl: 1536px /* 2X large devices (large desktops) */
```

### Mobile-First Approach

```typescript
// Responsive component example
const ResponsiveCard: React.FC = () => (
  <div className="
    w-full
    p-4 sm:p-6
    bg-white
    rounded-lg sm:rounded-xl
    shadow-sm sm:shadow-md
    border border-gray-200
  ">
    <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold">
      Responsive Title
    </h2>
  </div>
);
```

## 🎭 State Management

### Authentication Context

```typescript
// AuthContext implementation
interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (data: RegisterRequest) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Implementation details...

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
```

### Custom Hooks

```typescript
// useAuth hook
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// useApi hook for data fetching
export const useApi = <T>(url: string) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await api.get<T>(url);
        setData(response.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, loading, error };
};
```

## 🎨 Styling Guidelines

### Design System

```typescript
// Color palette
const colors = {
  primary: {
    50: '#eff6ff',
    100: '#dbeafe',
    500: '#3b82f6',
    600: '#2563eb',
    700: '#1d4ed8',
    900: '#1e3a8a',
  },
  gray: {
    50: '#f9fafb',
    100: '#f3f4f6',
    500: '#6b7280',
    700: '#374151',
    900: '#111827',
  },
  success: '#10b981',
  warning: '#f59e0b',
  error: '#ef4444',
};

// Typography scale
const typography = {
  xs: '0.75rem',    // 12px
  sm: '0.875rem',   // 14px
  base: '1rem',     // 16px
  lg: '1.125rem',   // 18px
  xl: '1.25rem',    // 20px
  '2xl': '1.5rem',  // 24px
  '3xl': '1.875rem', // 30px
};
```

### Component Patterns

```typescript
// Button component with variants
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  loading = false,
  children,
  onClick,
}) => {
  const baseClasses = 'font-medium rounded-lg transition-colors focus:outline-none focus:ring-2';

  const variantClasses = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
    secondary: 'bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-500',
    outline: 'border border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-blue-500',
  };

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${
        loading ? 'opacity-50 cursor-not-allowed' : ''
      }`}
      onClick={onClick}
      disabled={loading}
    >
      {loading ? <LoadingSpinner /> : children}
    </button>
  );
};
```

## 🧪 Testing

### Testing Setup

```bash
# Install testing dependencies
npm install --save-dev @testing-library/react @testing-library/jest-dom @testing-library/user-event vitest jsdom

# Run tests
npm run test

# Run tests with coverage
npm run test:coverage

# Run tests in watch mode
npm run test:watch
```

### Test Examples

```typescript
// Component test example
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Button from '../Button';

describe('Button Component', () => {
  it('renders with correct text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click me</Button>);

    fireEvent.click(screen.getByText('Click me'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('shows loading state', () => {
    render(<Button loading>Loading</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });
});
```

## 🚀 Performance Optimization

### Code Splitting

```typescript
// Lazy loading components
const Dashboard = lazy(() => import('./components/Dashboard'));
const FeedbackForm = lazy(() => import('./components/FeedbackForm'));

// Route-based code splitting
const App: React.FC = () => (
  <Router>
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/feedback/new" element={<FeedbackForm />} />
      </Routes>
    </Suspense>
  </Router>
);
```

### Memoization

```typescript
// Memoized components
const ExpensiveComponent = React.memo<Props>(({ data, onUpdate }) => {
  const processedData = useMemo(() => {
    return data.map(item => ({
      ...item,
      processed: true,
    }));
  }, [data]);

  const handleUpdate = useCallback((id: string) => {
    onUpdate(id);
  }, [onUpdate]);

  return (
    <div>
      {processedData.map(item => (
        <Item key={item.id} data={item} onUpdate={handleUpdate} />
      ))}
    </div>
  );
});
```

## 📦 Build & Deployment

### Build Configuration

```typescript
// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
      },
    }),
  ],
  build: {
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
          ui: ['@headlessui/react', 'lucide-react'],
        },
      },
    },
  },
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
      },
    },
  },
});
```

### Deployment Scripts

```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview",
    "test": "vitest",
    "test:coverage": "vitest --coverage",
    "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
    "lint:fix": "eslint . --ext ts,tsx --fix",
    "type-check": "tsc --noEmit",
    "format": "prettier --write \"src/**/*.{ts,tsx,css,md}\"",
    "analyze": "npx vite-bundle-analyzer"
  }
}
```

## 🔧 Development Workflow

### Git Hooks

```bash
# Install husky for git hooks
npm install --save-dev husky lint-staged

# Pre-commit hook
npx husky add .husky/pre-commit "npx lint-staged"
```

```json
// package.json
{
  "lint-staged": {
    "*.{ts,tsx}": [
      "eslint --fix",
      "prettier --write"
    ],
    "*.{css,md}": [
      "prettier --write"
    ]
  }
}
```

### Code Quality

```typescript
// ESLint configuration
module.exports = {
  extends: [
    '@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:jsx-a11y/recommended',
  ],
  rules: {
    'react/react-in-jsx-scope': 'off',
    '@typescript-eslint/no-unused-vars': 'error',
    'jsx-a11y/anchor-is-valid': 'off',
  },
};
```

## 🐛 Troubleshooting

### Common Issues

**Build Errors**:
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Clear Vite cache
rm -rf node_modules/.vite
npm run dev
```

**TypeScript Errors**:
```bash
# Check TypeScript configuration
npx tsc --noEmit

# Update type definitions
npm update @types/react @types/react-dom
```

**Styling Issues**:
```bash
# Rebuild Tailwind CSS
npx tailwindcss -i ./src/styles/globals.css -o ./dist/output.css --watch

# Check PostCSS configuration
npm run build -- --debug
```

## 📚 Additional Resources

- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Vite Documentation](https://vitejs.dev/)
- [React Router Documentation](https://reactrouter.com/)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes following the coding standards
4. Add tests for new functionality
5. Ensure all tests pass (`npm run test`)
6. Run linting and formatting (`npm run lint:fix`)
7. Commit your changes (`git commit -m 'Add amazing feature'`)
8. Push to the branch (`git push origin feature/amazing-feature`)
9. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- React team for the excellent framework
- Tailwind CSS team for the utility-first CSS framework
- Vite team for the lightning-fast build tool
- TypeScript team for bringing type safety to JavaScript
- Open source community for the amazing ecosystem
