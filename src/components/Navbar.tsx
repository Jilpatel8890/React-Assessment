

import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { User, LogOut, Sparkles } from 'lucide-react';

const Navbar: React.FC = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();


  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-xl">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          
          <Link to="/" className="flex items-center gap-2 transition-opacity hover:opacity-80">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg gradient-primary">
              <Sparkles className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="font-display text-xl font-semibold text-foreground">
              AccountHub
            </span>
          </Link>

      
          <div className="flex items-center gap-3">
            {isAuthenticated ? (
              <>
                
                <span className="hidden text-sm text-muted-foreground sm:inline">
                  Welcome, <span className="font-medium text-foreground">{user?.firstName}</span>
                </span>
                <Link to="/profile">
                  <Button variant="ghost" size="sm" className="gap-2 rounded-full">
                    <User className="h-4 w-4" />
                    <span className="hidden sm:inline">Profile</span>
                  </Button>
                </Link>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleLogout} 
                  className="gap-2 rounded-full border-border/50 hover:bg-destructive/10 hover:text-destructive hover:border-destructive/30"
                >
                  <LogOut className="h-4 w-4" />
                  <span className="hidden sm:inline">Logout</span>
                </Button>
              </>
            ) : (
              <>
                
                <Link to="/login">
                  <Button variant="ghost" size="sm" className="rounded-full">
                    Sign in
                  </Button>
                </Link>
                <Link to="/register">
                  <Button size="sm" className="rounded-full gradient-primary border-0 shadow-md hover:shadow-lg transition-shadow">
                    Get Started
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
