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
import { Shield, User, Settings, ArrowRight, Sparkles } from 'lucide-react';

const Index: React.FC = () => {
  const { isAuthenticated, user } = useAuth();

  return (
    <div className="min-h-[calc(100vh-4rem)] gradient-hero">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-20">
        <div className="mx-auto max-w-3xl text-center">
          {/* Badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border/50 bg-card/50 px-4 py-1.5 text-sm backdrop-blur-sm animate-fade-in">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-muted-foreground">Simple & Secure Account Management</span>
          </div>

          <h1 className="mb-6 font-display text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            Manage Your Account
            <span className="block bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">
              With Confidence
            </span>
          </h1>
          
          <p className="mb-10 text-lg text-muted-foreground opacity-0 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            A beautifully crafted platform to create, manage, and secure your account. 
            Experience seamless profile management all in one place.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row opacity-0 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            {isAuthenticated ? (
              <>
                <p className="text-muted-foreground">
                  Welcome back, <span className="font-semibold text-foreground">{user?.firstName}</span>!
                </p>
                <Link to="/profile">
                  <Button size="lg" className="gap-2 rounded-full gradient-primary border-0 shadow-lg hover:shadow-xl transition-all">
                    View Profile
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </>
            ) : (
              <>
                <Link to="/register">
                  <Button size="lg" className="gap-2 rounded-full gradient-primary border-0 shadow-lg hover:shadow-xl transition-all px-8">
                    Get Started Free
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link to="/login">
                  <Button variant="outline" size="lg" className="rounded-full border-border/50 bg-card/50 backdrop-blur-sm hover:bg-card px-8">
                    Sign In
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Features Section */}
        <div className="mx-auto mt-24 grid max-w-5xl gap-6 sm:grid-cols-3">
          {/* Feature 1: Secure Authentication */}
          <Card className="group border-border/40 bg-card/60 backdrop-blur-sm card-hover opacity-0 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <CardHeader>
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 transition-colors group-hover:bg-primary/20">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="font-display text-lg">Secure Authentication</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base">
                Your credentials are protected with industry-standard security measures and validation.
              </CardDescription>
            </CardContent>
          </Card>

          {/* Feature 2: Easy Registration */}
          <Card className="group border-border/40 bg-card/60 backdrop-blur-sm card-hover opacity-0 animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
            <CardHeader>
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 transition-colors group-hover:bg-primary/20">
                <User className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="font-display text-lg">Quick Registration</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base">
                Create your account in seconds with our streamlined and intuitive registration flow.
              </CardDescription>
            </CardContent>
          </Card>

          {/* Feature 3: Profile Management */}
          <Card className="group border-border/40 bg-card/60 backdrop-blur-sm card-hover opacity-0 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
            <CardHeader>
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 transition-colors group-hover:bg-primary/20">
                <Settings className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="font-display text-lg">Profile Management</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base">
                View and update your account information anytime from your personalized profile page.
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;
