// Utility functions for theme-aware classes
export const themeClasses = {
  // Backgrounds
  card: 'bg-white dark:bg-[#2a2a2a] border border-gray-200 dark:border-gray-800 transition-colors',
  cardHover: 'bg-white dark:bg-[#2a2a2a] border border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors',
  sidebar: 'bg-white dark:bg-[#1f1f1f] border-r border-gray-200 dark:border-gray-800 transition-colors',
  topbar: 'bg-white dark:bg-[#2a2a2a] border-b border-gray-200 dark:border-gray-800 transition-colors',
  main: 'bg-gray-50 dark:bg-primary-dark transition-colors',
  page: 'bg-white dark:bg-primary-dark transition-colors',
  
  // Text
  textPrimary: 'text-gray-900 dark:text-white transition-colors',
  textSecondary: 'text-gray-600 dark:text-gray-400 transition-colors',
  textTertiary: 'text-gray-500 dark:text-gray-500 transition-colors',
  
  // Inputs
  input: 'bg-gray-50 dark:bg-[#1a1a1a] border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-orange focus:border-transparent transition-colors',
  
  // Buttons
  buttonSecondary: 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors',
}


