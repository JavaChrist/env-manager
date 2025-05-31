import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

interface ThemeProviderProps {
  children: React.ReactNode;
}

// Fonction utilitaire pour appliquer le thème
const applyTheme = (theme: Theme) => {
  const root = document.documentElement;

  if (theme === 'dark') {
    root.classList.add('dark');
  } else {
    root.classList.remove('dark');
  }
};

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    // Vérifier d'abord si on est côté client
    if (typeof window === 'undefined') {
      return 'light';
    }

    try {
      // Récupérer le thème sauvegardé
      const savedTheme = localStorage.getItem('theme') as Theme;
      if (savedTheme && (savedTheme === 'light' || savedTheme === 'dark')) {
        return savedTheme;
      }

      // Détecter la préférence système
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark';
      }

      return 'light';
    } catch (error) {
      console.error('Erreur lors de l\'initialisation du thème:', error);
      return 'light';
    }
  });

  const toggleTheme = () => {
    setTheme(prevTheme => {
      const newTheme = prevTheme === 'light' ? 'dark' : 'light';

      try {
        localStorage.setItem('theme', newTheme);
      } catch (error) {
        console.error('Erreur lors de la sauvegarde du thème:', error);
      }

      return newTheme;
    });
  };

  // Application initiale du thème
  useEffect(() => {
    applyTheme(theme);
  }, []);

  // Application du thème à chaque changement
  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  // Écouter les changements de préférences système
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const handleChange = (e: MediaQueryListEvent) => {
      // Ne changer que si aucune préférence n'est sauvegardée
      const savedTheme = localStorage.getItem('theme');
      if (!savedTheme) {
        const systemTheme = e.matches ? 'dark' : 'light';
        setTheme(systemTheme);
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const value = {
    theme,
    toggleTheme,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}; 