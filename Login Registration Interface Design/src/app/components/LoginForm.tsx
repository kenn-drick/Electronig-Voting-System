import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { Button } from '@/app/components/ui/button';
import { Alert, AlertDescription } from '@/app/components/ui/alert';
import { CaptchaPlaceholder } from '@/app/components/CaptchaPlaceholder';
import { Lock, Mail, Eye, EyeOff, CheckCircle2, AlertCircle } from 'lucide-react';

interface LoginFormProps {
  onNavigateToRegister: () => void;
}

export function LoginForm({ onNavigateToRegister }: LoginFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showCaptcha, setShowCaptcha] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    // Basic validation
    if (!email || !password) {
      setError('Please enter both email and password');
      return;
    }

    if (!email.includes('@')) {
      setError('Please enter a valid email address');
      return;
    }

    // Simulate successful login
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
  };

  return (
    <Card className="w-full shadow-lg border-slate-200">
      <CardHeader className="space-y-1 pb-4">
        <div className="flex items-center gap-2 mb-2">
          <div className="size-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <Lock className="size-4 text-white" />
          </div>
          <CardTitle className="text-2xl">Login</CardTitle>
        </div>
        <CardDescription>
          Access your voting account securely
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleLogin} className="space-y-4">
          {/* Email/Username Field */}
          <div className="space-y-2">
            <Label htmlFor="login-email" className="text-sm font-medium">
              Email or Username
            </Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
              <Input
                id="login-email"
                type="text"
                placeholder="student@university.edu"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10 h-11"
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="space-y-2">
            <Label htmlFor="login-password" className="text-sm font-medium">
              Password
            </Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
              <Input
                id="login-password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10 pr-10 h-11"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                {showPassword ? (
                  <EyeOff className="size-4" />
                ) : (
                  <Eye className="size-4" />
                )}
              </button>
            </div>
          </div>

          {/* Error/Success Messages */}
          {error && (
            <Alert variant="destructive" className="py-2">
              <AlertCircle className="size-4" />
              <AlertDescription className="text-sm">{error}</AlertDescription>
            </Alert>
          )}

          {success && (
            <Alert className="py-2 bg-green-50 border-green-200 text-green-800">
              <CheckCircle2 className="size-4 text-green-600" />
              <AlertDescription className="text-sm">Login successful!</AlertDescription>
            </Alert>
          )}

          {/* CAPTCHA (shown after multiple attempts) */}
          {showCaptcha && (
            <div className="pt-2">
              <CaptchaPlaceholder />
            </div>
          )}

          {/* Login Button */}
          <Button type="submit" className="w-full h-11 bg-blue-600 hover:bg-blue-700">
            Login
          </Button>

          {/* Forgot Password Link */}
          <div className="text-center pt-2">
            <button
              type="button"
              onClick={() => alert('Password recovery functionality would be implemented here')}
              className="text-sm text-blue-600 hover:text-blue-800 hover:underline"
            >
              Forgot Password?
            </button>
          </div>
        </form>
      </CardContent>
      
      <CardFooter className="flex flex-col space-y-2 border-t pt-4">
        <div className="text-center text-sm text-slate-600">
          Don't have an account?
        </div>
        <Button 
          type="button" 
          variant="outline" 
          className="w-full h-11" 
          onClick={onNavigateToRegister}
        >
          Create Account
        </Button>
      </CardFooter>
    </Card>
  );
}