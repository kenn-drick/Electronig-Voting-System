import { LayoutDashboard, Vote, Users, BarChart3 } from 'lucide-react';
import { cn } from './ui/utils';

interface NavigationProps {
  activeView: string;
  onNavigate: (view: string) => void;
}

const menuItems = [
  {
    id: 'dashboard',
    label: 'Dashboard Overview',
    icon: LayoutDashboard,
  },
  {
    id: 'elections',
    label: 'Manage Elections',
    icon: Vote,
  },
  {
    id: 'candidates',
    label: 'Manage Candidates',
    icon: Users,
  },
  {
    id: 'results',
    label: 'View Results',
    icon: BarChart3,
  },
];

export function Navigation({ activeView, onNavigate }: NavigationProps) {
  return (
    <nav className="w-64 border-r bg-gray-50 p-4">
      <div className="space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeView === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={cn(
                'flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left transition-colors',
                isActive
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              )}
            >
              <Icon className="size-5" />
              <span className="font-medium">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
