/**
 * Index.tsx
 * 
 * Landing page component that displays a welcome message
 * and provides navigation to login or register.
 */

import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, User, Settings } from 'lucide-react';

const Index: React.FC = () => {
  const { isAuthenticated, user } = useAuth();

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <div className="mx-auto max-w-3xl text-center">
        <h1 className="mb-4 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          Account Management System
        </h1>
        <p className="mb-8 text-lg text-muted-foreground">
          A simple and secure way to manage your account. Create an account, login, 
          and manage your profile information all in one place.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          {isAuthenticated ? (
            <>
              <p className="text-muted-foreground">
                Welcome back, <span className="font-medium text-foreground">{user?.firstName}</span>!
              </p>
              <Link to="/profile">
                <Button size="lg">View Profile</Button>
              </Link>
            </>
          ) : (
            <>
              <Link to="/register">
                <Button size="lg">Get Started</Button>
              </Link>
              <Link to="/login">
                <Button variant="outline" size="lg">Login</Button>
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Features Section */}
      <div className="mx-auto mt-16 grid max-w-4xl gap-6 sm:grid-cols-3">
        {/* Feature 1: Secure Authentication */}
        <Card>
          <CardHeader>
            <Shield className="mb-2 h-8 w-8 text-primary" />
            <CardTitle className="text-lg">Secure Login</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>
              Your credentials are safely stored and validated with proper security measures.
            </CardDescription>
          </CardContent>
        </Card>

        {/* Feature 2: Easy Registration */}
        <Card>
          <CardHeader>
            <User className="mb-2 h-8 w-8 text-primary" />
            <CardTitle className="text-lg">Easy Registration</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>
              Create your account in seconds with our simple registration process.
            </CardDescription>
          </CardContent>
        </Card>

        {/* Feature 3: Profile Management */}
        <Card>
          <CardHeader>
            <Settings className="mb-2 h-8 w-8 text-primary" />
            <CardTitle className="text-lg">Profile Management</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>
              View and update your account information anytime from your profile page.
            </CardDescription>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;
