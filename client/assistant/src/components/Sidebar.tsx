import { FileText, History, Search, BarChart3, MessageSquare, Home } from 'lucide-react';

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
    { id: 'templates', label: 'Legal Templates', icon: FileText, href: `${import.meta.env.VITE_API_URL || 'http://localhost:8000'}/template-portal/templates/index.html` },
    { id: 'stats', label: 'Statistics', icon: BarChart3 },
  ];

  return (
    <aside className="w-72 bg-white border-r border-gray-200 h-screen flex flex-col shadow-xl lg:shadow-none">
      <div className="p-6 border-b border-gray-100 lg:hidden flex items-center justify-between bg-amber-600">
        <span className="text-white font-bold text-lg">Menu</span>
      </div>

      <nav className="p-4 space-y-1.5 flex-1 overflow-y-auto">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isExternal = 'href' in item;

          const className = `w-full flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-200 ${activeView === item.id
            ? 'bg-amber-600 text-white shadow-lg shadow-amber-200 font-semibold'
            : 'text-gray-600 hover:bg-amber-50 hover:text-amber-700 font-medium'
            }`;

          if (isExternal) {
            return (
              <a
                key={item.id}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className={className}
              >
                <Icon className={`w-5 h-5 ${activeView === item.id ? 'text-white' : 'text-gray-400'}`} />
                <span>{item.label}</span>
              </a>
            );
          }

          return (
            <button
              key={item.id}
              onClick={() => onViewChange(item.id)}
              className={className}
            >
              <Icon className={`w-5 h-5 ${activeView === item.id ? 'text-white' : 'text-gray-400'}`} />
              <span>{item.label}</span>
            </button>
          );
        })}

        <div className="pt-6 my-6 border-t border-gray-100">
          <a
            href={import.meta.env.VITE_PLATFORM_URL || 'https://nyayaassist-platform.vercel.app/'}
            className="w-full flex items-center gap-3 px-4 py-4 rounded-xl text-gray-600 hover:bg-gray-50 transition-all font-bold border border-transparent hover:border-gray-200"
          >
            <div className="bg-amber-100 p-2 rounded-lg">
              <Home className="w-5 h-5 text-amber-600" />
            </div>
            <span>Back to Platform</span>
          </a>
        </div>
      </nav>


    </aside>
  );
}
