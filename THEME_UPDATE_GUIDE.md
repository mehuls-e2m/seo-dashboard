# Theme Update Guide

## ✅ Completed
- ThemeContext created with dark/light mode support
- Tailwind config updated with darkMode: 'class'
- Main layout components (Sidebar, TopBar, MainLayout) updated
- Auth pages (Login, ForgotPassword, ResetPassword, InviteAccept) updated with logos
- ClientHeader and ClientSidebar updated
- Public ToolOverview page updated
- Logo files copied to public directory

## Pattern for Updating Remaining Pages

### Common Replacements:

1. **Backgrounds:**
   - `bg-primary-dark` → `bg-white dark:bg-primary-dark transition-colors`
   - `bg-[#2a2a2a]` → `bg-white dark:bg-[#2a2a2a] transition-colors`
   - `bg-[#1f1f1f]` → `bg-white dark:bg-[#1f1f1f] transition-colors`
   - `bg-[#1a1a1a]` → `bg-gray-50 dark:bg-[#1a1a1a] transition-colors`

2. **Text:**
   - `text-white` → `text-gray-900 dark:text-white transition-colors`
   - `text-gray-400` → `text-gray-600 dark:text-gray-400 transition-colors`
   - `text-gray-300` → `text-gray-700 dark:text-gray-300 transition-colors`

3. **Borders:**
   - `border-gray-800` → `border-gray-200 dark:border-gray-800 transition-colors`
   - `border-gray-700` → `border-gray-300 dark:border-gray-700 transition-colors`

4. **Inputs:**
   - `bg-[#1a1a1a] border border-gray-700 text-white` → `bg-gray-50 dark:bg-[#1a1a1a] border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white transition-colors`

5. **Cards:**
   - `bg-[#2a2a2a] border border-gray-800` → `bg-white dark:bg-[#2a2a2a] border border-gray-200 dark:border-gray-800 transition-colors`

## Files Still Needing Updates

### Dashboard Pages:
- `src/pages/admin/AdminDashboard.jsx`
- `src/pages/manager/ManagerDashboard.jsx`
- `src/pages/admin/ClientList.jsx`
- `src/pages/manager/ManagerClientList.jsx`
- `src/pages/admin/AccountManagers.jsx`
- `src/pages/Settings.jsx`

### Client Pages:
- `src/pages/client/Overview.jsx`
- `src/pages/client/SEOAudit.jsx`
- `src/pages/client/Analytics.jsx`
- `src/pages/client/Ads.jsx`
- `src/pages/client/SearchConsole.jsx`

### Components:
- `src/components/ClientModal.jsx`
- `src/components/ManagerModal.jsx`

## Logo Usage

All pages should use:
```jsx
import { useTheme } from '../contexts/ThemeContext'

const { theme } = useTheme()

<img
  src={theme === 'dark' ? '/dark-logo-leadgear.png' : '/light-logo-leadgear.png'}
  alt="LEADGEAR"
  className="h-10 w-auto" // or appropriate size
/>
```

## Theme Toggle

Add theme toggle button in TopBar (already done) and any public pages:
```jsx
import { useTheme } from '../contexts/ThemeContext'
import { Moon, Sun } from 'lucide-react'

const { theme, toggleTheme } = useTheme()

<button onClick={toggleTheme}>
  {theme === 'dark' ? <Sun /> : <Moon />}
</button>
```


