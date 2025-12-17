/**
 * Profile.tsx
 * 
 * Profile page where users can view and edit their account information.
 * Includes form validation and success/error feedback.
 */

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle, CheckCircle, Loader2, Pencil, X, User, Mail, Phone, Calendar } from 'lucide-react';

const Profile: React.FC = () => {
  const { user, updateProfile } = useAuth();

  // Edit mode state
  const [isEditing, setIsEditing] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
  });

  // Feedback state
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Initialize form data when user loads or changes
  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName,
        lastName: user.lastName,
        phone: user.phone || '',
      });
    }
  }, [user]);

  /**
   * Handle input changes
   */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  /**
   * Cancel editing and reset form
   */
  const handleCancel = () => {
    setIsEditing(false);
    setError('');
    setSuccess('');
    // Reset form to original values
    if (user) {
      setFormData({
        firstName: user.firstName,
        lastName: user.lastName,
        phone: user.phone || '',
      });
    }
  };

  /**
   * Validate form inputs before submission
   */
  const validateForm = (): boolean => {
    if (!formData.firstName.trim()) {
      setError('First name is required.');
      return false;
    }

    if (!formData.lastName.trim()) {
      setError('Last name is required.');
      return false;
    }

    // Optional phone validation (if provided)
    if (formData.phone) {
      const phoneRegex = /^[\d\s\-+()]+$/;
      if (!phoneRegex.test(formData.phone)) {
        setError('Please enter a valid phone number.');
        return false;
      }
    }

    return true;
  };

  /**
   * Handle form submission
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Validate form before proceeding
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const result = await updateProfile({
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        phone: formData.phone.trim() || undefined,
      });

      if (result.success) {
        setSuccess('Profile updated successfully!');
        setIsEditing(false);
        // Clear success message after 3 seconds
        setTimeout(() => setSuccess(''), 3000);
      } else {
        setError(result.error || 'Failed to update profile. Please try again.');
      }
    } catch (err) {
      // Handle unexpected errors
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Format date for display
  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] gradient-hero py-12">
      <div className="container mx-auto max-w-2xl px-4">
        {/* Header */}
        <div className="mb-8 text-center opacity-0 animate-fade-in">
          <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 ring-4 ring-primary/20">
            <span className="font-display text-3xl font-bold text-primary">
              {user.firstName[0]}{user.lastName[0]}
            </span>
          </div>
          <h1 className="font-display text-2xl font-bold text-foreground">
            {user.firstName} {user.lastName}
          </h1>
          <p className="text-muted-foreground">{user.email}</p>
        </div>

        <Card className="border-border/40 bg-card/80 backdrop-blur-xl shadow-xl opacity-0 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-6">
            <div>
              <CardTitle className="font-display text-xl font-bold">Account Information</CardTitle>
              <CardDescription>View and manage your profile details</CardDescription>
            </div>
            {/* Edit/Cancel Button */}
            {!isEditing ? (
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setIsEditing(true)} 
                className="gap-2 rounded-full"
              >
                <Pencil className="h-4 w-4" />
                Edit
              </Button>
            ) : (
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={handleCancel} 
                className="gap-2 rounded-full text-muted-foreground hover:text-foreground"
              >
                <X className="h-4 w-4" />
                Cancel
              </Button>
            )}
          </CardHeader>

          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-6">
              {/* Success Alert */}
              {success && (
                <Alert className="border-success/30 bg-success/10 text-success animate-fade-in">
                  <CheckCircle className="h-4 w-4" />
                  <AlertDescription>{success}</AlertDescription>
                </Alert>
              )}

              {/* Error Alert */}
              {error && (
                <Alert variant="destructive" className="animate-fade-in">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {/* Name Fields */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="flex items-center gap-2">
                    <User className="h-4 w-4 text-muted-foreground" />
                    First Name
                  </Label>
                  {isEditing ? (
                    <Input
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      disabled={isLoading}
                      className="h-11 bg-background/50"
                    />
                  ) : (
                    <p className="rounded-lg border border-border/50 bg-muted/30 px-4 py-2.5 text-sm">
                      {user.firstName}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName" className="flex items-center gap-2">
                    <User className="h-4 w-4 text-muted-foreground" />
                    Last Name
                  </Label>
                  {isEditing ? (
                    <Input
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      disabled={isLoading}
                      className="h-11 bg-background/50"
                    />
                  ) : (
                    <p className="rounded-lg border border-border/50 bg-muted/30 px-4 py-2.5 text-sm">
                      {user.lastName}
                    </p>
                  )}
                </div>
              </div>

              {/* Email Field (Read-only) */}
              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  Email
                </Label>
                <p className="rounded-lg border border-border/50 bg-muted/30 px-4 py-2.5 text-sm">
                  {user.email}
                </p>
                {isEditing && (
                  <p className="text-xs text-muted-foreground">
                    Email cannot be changed
                  </p>
                )}
              </div>

              {/* Phone Field */}
              <div className="space-y-2">
                <Label htmlFor="phone" className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  Phone Number
                  <span className="text-xs text-muted-foreground">(Optional)</span>
                </Label>
                {isEditing ? (
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="Enter your phone number"
                    value={formData.phone}
                    onChange={handleChange}
                    disabled={isLoading}
                    className="h-11 bg-background/50"
                  />
                ) : (
                  <p className="rounded-lg border border-border/50 bg-muted/30 px-4 py-2.5 text-sm">
                    {user.phone || <span className="text-muted-foreground">Not provided</span>}
                  </p>
                )}
              </div>

              {/* Account Created Date */}
              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  Member Since
                </Label>
                <p className="rounded-lg border border-border/50 bg-muted/30 px-4 py-2.5 text-sm">
                  {formatDate(user.createdAt)}
                </p>
              </div>

              {/* Save Button (only shown when editing) */}
              {isEditing && (
                <div className="flex justify-end pt-4">
                  <Button 
                    type="submit" 
                    disabled={isLoading}
                    className="rounded-lg gradient-primary border-0 font-medium shadow-md hover:shadow-lg transition-shadow px-8"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      'Save Changes'
                    )}
                  </Button>
                </div>
              )}
            </CardContent>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default Profile;
