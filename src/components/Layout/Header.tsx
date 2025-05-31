import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';
import logoIcon from '../../assets/Favicon.ico';

export const Header: React.FC = () => {
  const { currentUser, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
    }
  };

  return (
    <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50 shadow-sm dark:shadow-gray-800/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-4">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="relative">
                <img
                  src={logoIcon}
                  alt="Environment Manager Logo"
                  className="h-8 w-8 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 dark:shadow-gray-800"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-purple-400/20 dark:from-blue-400/30 dark:to-purple-400/30 rounded-lg"></div>
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-gray-100 dark:to-gray-300 bg-clip-text text-transparent">
                  Environment Manager
                </h1>
                <p className="text-xs text-gray-500 dark:text-gray-400 hidden sm:block">
                  Gestionnaire de variables
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {/* Bouton toggle thème */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
              title={theme === 'light' ? 'Passer en mode sombre' : 'Passer en mode clair'}
            >
              {theme === 'light' ? (
                // Icône lune (mode sombre)
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              ) : (
                // Icône soleil (mode clair)
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              )}
            </button>

            {currentUser && (
              <>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 text-white rounded-full flex items-center justify-center text-sm font-medium shadow-lg hover:shadow-xl transition-shadow duration-200 dark:shadow-gray-800">
                    {currentUser.email?.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-sm text-gray-700 dark:text-gray-300 hidden sm:block font-medium">
                    {currentUser.email}
                  </span>
                </div>
                <button
                  onClick={handleLogout}
                  className="inline-flex items-center px-3 py-1.5 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-lg text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-gray-400 dark:hover:border-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-blue-400 dark:focus:ring-offset-gray-900 transition-all duration-200 shadow-sm hover:shadow-md dark:shadow-gray-800"
                >
                  <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  Déconnexion
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}; 