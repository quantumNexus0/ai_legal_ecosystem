import { Scale, ExternalLink, Menu, X } from 'lucide-react';

interface HeaderProps {
  apiStatus?: string;
  onMenuClick?: () => void;
  isSidebarOpen?: boolean;
}

export default function Header({ apiStatus = 'checking', onMenuClick, isSidebarOpen }: HeaderProps) {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <button
              onClick={onMenuClick}
              className="lg:hidden p-2 -ml-2 text-gray-600 hover:text-amber-600 transition-colors"
            >
              {isSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
            <div className="bg-amber-600 p-2 rounded-lg hidden sm:block">
              <Scale className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg md:text-xl font-bold text-gray-900 leading-tight">LegalAI Analyzer</h1>
              <p className="text-[10px] md:text-xs text-gray-500">Indian Case-Law Intelligence</p>
            </div>
          </div>
          <div className="flex items-center gap-2 md:gap-4">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1 bg-gray-50 rounded-full border border-gray-200">
              <div className={`w-2 h-2 rounded-full ${apiStatus === 'connected' ? 'bg-green-500' :
                apiStatus === 'disconnected' ? 'bg-red-500' : 'bg-yellow-500'
                }`} />
              <span className="text-[10px] font-medium text-gray-600 uppercase tracking-wider">
                {apiStatus === 'connected' ? 'Online' : apiStatus === 'disconnected' ? 'Offline' : 'Checking...'}
              </span>
            </div>
            <a
              href={import.meta.env.VITE_PLATFORM_URL || 'http://localhost:5173'}
              className="flex items-center gap-2 text-xs md:text-sm font-bold text-amber-600 hover:text-amber-700 transition-colors bg-amber-50 px-3 md:px-4 py-2 rounded-xl border border-amber-200 shadow-sm"
            >
              <ExternalLink className="w-3 md:w-4 h-3 md:h-4" />
              <span className="hidden xs:inline">Main Platform</span>
              <span className="xs:hidden">Exit</span>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
