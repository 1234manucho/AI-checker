import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import { useTheme } from '../contexts/ThemeContext';

function Layout() {
  const { theme } = useTheme();
  
  return (
    <div className={`min-h-screen flex flex-col ${theme}`}>
      <Header />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default Layout;