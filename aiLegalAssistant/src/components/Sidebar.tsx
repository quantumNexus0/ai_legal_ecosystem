import { FileText, History, Search, BarChart3, MessageSquare } from 'lucide-react';

interface SidebarProps {
  activeView: string;
  onViewChange: (view: string) => void;
}

export default function Sidebar({ activeView, onViewChange }: SidebarProps) {
  const menuItems = [
    { id: 'analyze', label: 'New Analysis', icon: Search },
    { id: 'history', label: 'History', icon: History },
    { id: 'cases', label: 'Case Library', icon: FileText },
    { id: 'ai', label: 'AI Assistant', icon: MessageSquare },
    { id: 'drafting', label: 'Drafting', icon: FileText },
    { id: 'stats', label: 'Statistics', icon: BarChart3 },
  ];

  return (
    <aside className="w-64 bg-white border-r border-gray-200 min-h-screen">
      <nav className="p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => onViewChange(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${activeView === item.id
                ? 'bg-amber-50 text-amber-700 font-medium'
                : 'text-gray-700 hover:bg-gray-50'
                }`}
            >
              <Icon className="w-5 h-5" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
}
