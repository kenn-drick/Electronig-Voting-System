import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { Button } from '@/app/components/ui/button';
import { Alert, AlertDescription } from '@/app/components/ui/alert';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/app/components/ui/select';
import { UserPlus, User, Mail, Lock, IdCard, CheckCircle2, AlertCircle, Shield, ArrowLeft } from 'lucide-react';

interface RegistrationFormProps {
  onNavigateToLogin: () => void;
}

export function RegistrationForm({ onNavigateToLogin }: RegistrationFormProps) {
  const [formData, setFormData] = useState({
    fullName: '',
    studentId: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: ''
  });
  
  const [errors, setErrors] = useState<string[]>([]);
  const [success, setSuccess] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState('');

  const validatePassword = (password: string) => {
    if (password.length === 0) {
      setPasswordStrength('');
      return;
    }
    
    if (password.length < 8) {
      setPasswordStrength('weak');
    } else if (password.length < 12) {
      setPasswordStrength('medium');
    } else {
      setPasswordStrength('strong');
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
    
    if (field === 'password') {
      validatePassword(value);
    }
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: string[] = [];
    setErrors([]);
    setSuccess(false);

    // Validation
    if (!formData.fullName.trim()) {
      newErrors.push('Full name is required');
    }

    if (!formData.studentId.trim()) {
      newErrors.push('Student/Staff ID is required');
    }

    if (!formData.email.includes('@')) {
      newErrors.push('Valid email address is required');
    }

    if (formData.password.length < 8) {
      newErrors.push('Password must be at least 8 characters');
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.push('Passwords do not match');
    }

    if (!formData.role) {
      newErrors.push('Please select a role');
    }

    if (newErrors.length > 0) {
      setErrors(newErrors);
      return;
    }

    // Simulate successful registration
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
      // Reset form
      setFormData({
        fullName: '',
        studentId: '',
        email: '',
        password: '',
        confirmPassword: '',
        role: ''
      });
      setPasswordStrength('');
    }, 3000);
  };

  const getPasswordStrengthColor = () => {
    switch (passwordStrength) {
      case 'weak': return 'bg-red-500';
      case 'medium': return 'bg-yellow-500';
      case 'strong': return 'bg-green-500';
      default: return 'bg-slate-200';
    }
  };

  return (
    <Card className="w-full shadow-lg border-slate-200">
      <CardHeader className="space-y-1 pb-4">
        <div className="flex items-center gap-2 mb-2">
          <div className="size-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <UserPlus className="size-4 text-white" />
          </div>
          <CardTitle className="text-2xl">Register</CardTitle>
        </div>
        <CardDescription>
          Create a new voting account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleRegister} className="space-y-4">
          {/* Full Name Field */}
          <div className="space-y-2">
            <Label htmlFor="register-name" className="text-sm font-medium">
              Full Name
            </Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
              <Input
                id="register-name"
                type="text"
                placeholder="John Doe"
                value={formData.fullName}
                onChange={(e) => handleInputChange('fullName', e.target.value)}
                className="pl-10 h-11"
              />
            </div>
          </div>

          {/* Student/Staff ID Field */}
          <div className="space-y-2">
            <Label htmlFor="register-id" className="text-sm font-medium">
              Student/Staff ID
            </Label>
            <div className="relative">
              <IdCard className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
              <Input
                id="register-id"
                type="text"
                placeholder="STU123456 or STF789012"
                value={formData.studentId}
                onChange={(e) => handleInputChange('studentId', e.target.value)}
                className="pl-10 h-11"
              />
            </div>
          </div>

          {/* Email Field */}
          <div className="space-y-2">
            <Label htmlFor="register-email" className="text-sm font-medium">
              University Email
            </Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
              <Input
                id="register-email"
                type="email"
                placeholder="student@university.edu"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className="pl-10 h-11"
              />
            </div>
          </div>

          {/* Role Selection */}
          <div className="space-y-2">
            <Label htmlFor="register-role" className="text-sm font-medium">
              Role
            </Label>
            <Select value={formData.role} onValueChange={(value) => handleInputChange('role', value)}>
              <SelectTrigger id="register-role" className="h-11">
                <SelectValue placeholder="Select your role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="voter">Voter</SelectItem>
                <SelectItem value="administrator">Administrator</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Password Field */}
          <div className="space-y-2">
            <Label htmlFor="register-password" className="text-sm font-medium">
              Password
            </Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
              <Input
                id="register-password"
                type="password"
                placeholder="Minimum 8 characters"
                value={formData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                className="pl-10 h-11"
              />
            </div>
            {/* Password Strength Indicator */}
            {passwordStrength && (
              <div className="space-y-1">
                <div className="flex gap-1">
                  <div className={`h-1 flex-1 rounded ${passwordStrength === 'weak' || passwordStrength === 'medium' || passwordStrength === 'strong' ? getPasswordStrengthColor() : 'bg-slate-200'}`}></div>
                  <div className={`h-1 flex-1 rounded ${passwordStrength === 'medium' || passwordStrength === 'strong' ? getPasswordStrengthColor() : 'bg-slate-200'}`}></div>
                  <div className={`h-1 flex-1 rounded ${passwordStrength === 'strong' ? getPasswordStrengthColor() : 'bg-slate-200'}`}></div>
                </div>
                <p className="text-xs text-slate-600">
                  Password strength: <span className="font-medium capitalize">{passwordStrength}</span>
                </p>
              </div>
            )}
          </div>

          {/* Confirm Password Field */}
          <div className="space-y-2">
            <Label htmlFor="register-confirm-password" className="text-sm font-medium">
              Confirm Password
            </Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
              <Input
                id="register-confirm-password"
                type="password"
                placeholder="Re-enter password"
                value={formData.confirmPassword}
                onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                className="pl-10 h-11"
              />
            </div>
          </div>

          {/* Error Messages */}
          {errors.length > 0 && (
            <Alert variant="destructive" className="py-3">
              <AlertCircle className="size-4" />
              <AlertDescription className="text-sm">
                <ul className="list-disc list-inside space-y-1">
                  {errors.map((error, index) => (
                    <li key={index}>{error}</li>
                  ))}
                </ul>
              </AlertDescription>
            </Alert>
          )}

          {/* Success Message */}
          {success && (
            <Alert className="py-3 bg-green-50 border-green-200 text-green-800">
              <CheckCircle2 className="size-4 text-green-600" />
              <AlertDescription className="text-sm">Registration successful! You can now login.</AlertDescription>
            </Alert>
          )}

          {/* Register Button */}
          <Button type="submit" className="w-full h-11 bg-blue-600 hover:bg-blue-700">
            <Shield className="size-4 mr-2" />
            Register Account
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex justify-start border-t pt-4">
        <Button
          type="button"
          variant="ghost"
          className="text-sm text-slate-600 hover:text-slate-900"
          onClick={onNavigateToLogin}
        >
          <ArrowLeft className="size-4 mr-2" />
          Back to Login
        </Button>
      </CardFooter>
    </Card>
  );
}