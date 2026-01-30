import { useState } from 'react';
import { LoginForm } from '@/app/components/LoginForm';
import { RegistrationForm } from '@/app/components/RegistrationForm';
import { Shield, Lock } from 'lucide-react';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<'login' | 'register'>('login');

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 shadow-sm">
        <div className="container mx-auto px-4 py-4 md:py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="size-10 md:size-12 bg-blue-600 rounded-lg flex items-center justify-center">
                <Shield className="size-6 md:size-7 text-white" />
              </div>
              <div>
                <h1 className="text-lg md:text-xl font-semibold text-slate-900">
                  University E-Voting System
                </h1>
                <p className="text-xs md:text-sm text-slate-600">
                  Secure Authentication Portal
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-md mx-auto">
          {currentScreen === 'login' ? (
            <LoginForm onNavigateToRegister={() => setCurrentScreen('register')} />
          ) : (
            <RegistrationForm onNavigateToLogin={() => setCurrentScreen('login')} />
          )}
        </div>

        {/* Security Notice */}
        <div className="max-w-md mx-auto mt-8">
          <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 md:p-6">
            <div className="flex items-start gap-3">
              <Shield className="size-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-slate-900 mb-1">Security & Privacy</h3>
                <p className="text-sm text-slate-700">
                  Your credentials are securely stored and verified using industry-standard encryption. 
                   This system complies with university data protection policies.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-12 py-6 border-t border-slate-200 bg-white">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-slate-600">
            © 2026 University E-Voting System
          </p>
          <p className="text-xs text-slate-500 mt-1">
            Secure, Transparent, and Accessible Electronic Voting
          </p>
        </div>
      </footer>
    </div>
  );
}