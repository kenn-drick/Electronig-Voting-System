import { LogOut, User } from 'lucide-react';
import { Button } from './ui/button';

interface HeaderProps {
  adminName: string;
  onLogout: () => void;
}

export function Header({ adminName, onLogout }: HeaderProps) {
  return (
    <header className="border-b bg-white">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-lg bg-blue-600">
            <svg
              className="size-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h1 className="text-xl font-semibold text-gray-900">
            Secure Electronic Voting System
          </h1>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 rounded-lg bg-gray-100 px-4 py-2">
            <User className="size-4 text-gray-600" />
            <span className="text-sm font-medium text-gray-700">
              Administrator: {adminName}
            </span>
          </div>
          <Button
            variant="outline"
            onClick={onLogout}
            className="flex items-center gap-2"
          >
            <LogOut className="size-4" />
            Logout
          </Button>
        </div>
      </div>
    </header>
  );
}
