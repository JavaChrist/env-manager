// 📁 App.tsx - Interface stylée avec TailwindCSS pour ton gestionnaire de projets .env

import { useAuth } from './contexts/AuthContext';
import { AuthForm } from './components/Auth/AuthForm';
import { Header } from './components/Layout/Header';
import { Dashboard } from './components/Dashboard/Dashboard';

function App() {
  const { currentUser } = useAuth();

  if (!currentUser) {
    return <AuthForm />;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <Header />
      <Dashboard />
    </div>
  );
}

export default App;
