/**
 * Register.tsx
 * 
 * Registration page component with comprehensive form validation.
 * Creates a new user account and automatically logs them in.
 */

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle, Loader2, CheckCircle } from 'lucide-react';

const Register: React.FC = () => {
  const navigate = useNavigate();
  const { register } = useAuth();

  // Form state
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  /**
   * Handle input changes
   */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  /**
   * Validate form inputs before submission
   */
  const validateForm = (): boolean => {
    // Check required fields
    if (!formData.firstName.trim()) {
      setError('Please enter your first name.');
      return false;
    }

    if (!formData.lastName.trim()) {
      setError('Please enter your last name.');
      return false;
    }

    if (!formData.email.trim()) {
      setError('Please enter your email address.');
      return false;
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Please enter a valid email address.');
      return false;
    }

    // Password validation
    if (!formData.password) {
      setError('Please enter a password.');
      return false;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return false;
    }

    // Confirm password match
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
      return false;
    }

    return true;
  };

  /**
   * Handle form submission
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validate form before proceeding
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const result = await register({
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        email: formData.email.trim(),
        password: formData.password,
      });

      if (result.success) {
        // Redirect to profile page after successful registration
        navigate('/profile', { replace: true });
      } else {
        setError(result.error || 'Registration failed. Please try again.');
      }
    } catch (err) {
      // Handle unexpected errors
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Password strength indicator
  const getPasswordStrength = (): { strength: string; color: string } => {
    const password = formData.password;
    if (!password) return { strength: '', color: '' };
    if (password.length < 6) return { strength: 'Too short', color: 'text-destructive' };
    if (password.length < 8) return { strength: 'Weak', color: 'text-amber-500' };
    if (password.length >= 8 && /[A-Z]/.test(password) && /[0-9]/.test(password)) {
      return { strength: 'Strong', color: 'text-green-500' };
    }
    return { strength: 'Medium', color: 'text-amber-500' };
  };

  const passwordStrength = getPasswordStrength();

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-12">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Create an Account</CardTitle>
          <CardDescription>
            Enter your details to create your account
          </CardDescription>
        </CardHeader>

        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            {/* Error Alert */}
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {/* Name Fields - Side by side on larger screens */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  name="firstName"
                  placeholder="John"
                  value={formData.firstName}
                  onChange={handleChange}
                  disabled={isLoading}
                  autoComplete="given-name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  name="lastName"
                  placeholder="Doe"
                  value={formData.lastName}
                  onChange={handleChange}
                  disabled={isLoading}
                  autoComplete="family-name"
                />
              </div>
            </div>

            {/* Email Field */}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="john.doe@example.com"
                value={formData.email}
                onChange={handleChange}
                disabled={isLoading}
                autoComplete="email"
              />
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Create a password"
                value={formData.password}
                onChange={handleChange}
                disabled={isLoading}
                autoComplete="new-password"
              />
              {/* Password strength indicator */}
              {passwordStrength.strength && (
                <p className={`text-xs ${passwordStrength.color}`}>
                  Password strength: {passwordStrength.strength}
                </p>
              )}
            </div>

            {/* Confirm Password Field */}
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={handleChange}
                disabled={isLoading}
                autoComplete="new-password"
              />
              {/* Password match indicator */}
              {formData.confirmPassword && formData.password === formData.confirmPassword && (
                <p className="flex items-center gap-1 text-xs text-green-500">
                  <CheckCircle className="h-3 w-3" />
                  Passwords match
                </p>
              )}
            </div>
          </CardContent>

          <CardFooter className="flex flex-col space-y-4">
            {/* Submit Button */}
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating account...
                </>
              ) : (
                'Create Account'
              )}
            </Button>

            {/* Login Link */}
            <p className="text-center text-sm text-muted-foreground">
              Already have an account?{' '}
              <Link to="/login" className="text-primary hover:underline">
                Login here
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default Register;
