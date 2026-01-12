import { useTheme } from '../contexts/ThemeContext'

export default function AuthLayout({ title, subtitle, children }) {
  const { theme } = useTheme()

  return (
    <div className="min-h-screen bg-white dark:bg-primary-dark flex items-center justify-center p-4 transition-colors">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <img
              src={theme === 'dark' ? '/dark-logo-leadgear.png' : '/light-logo-leadgear.png'}
              alt="LEADGEAR"
              className="h-20 w-auto"
            />
          </div>
          {title && <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 transition-colors">{title}</h1>}
          {subtitle && <p className="text-gray-600 dark:text-gray-400 transition-colors">{subtitle}</p>}
        </div>

        <div className="bg-white dark:bg-[#2a2a2a] rounded-xl p-8 border border-gray-200 dark:border-gray-800 shadow-lg transition-colors">
          {children}
        </div>
      </div>
    </div>
  )
}

