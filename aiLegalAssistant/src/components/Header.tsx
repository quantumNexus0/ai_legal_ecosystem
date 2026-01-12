import { Scale, ExternalLink } from 'lucide-react';

interface HeaderProps {
  apiStatus?: string;
}

export default function Header({ apiStatus = 'checking' }: HeaderProps) {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <div className="bg-amber-600 p-2 rounded-lg">
              <Scale className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">LegalAI Analyzer</h1>
              <p className="text-xs text-gray-500">Indian Case-Law Intelligence</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1 bg-gray-50 rounded-full border border-gray-200">
              <div className={`w-2 h-2 rounded-full ${apiStatus === 'connected' ? 'bg-green-500' :
                apiStatus === 'disconnected' ? 'bg-red-500' : 'bg-yellow-500'
                }`} />
              <span className="text-xs font-medium text-gray-600">
                API: {apiStatus === 'connected' ? 'Online' : apiStatus === 'disconnected' ? 'Offline' : 'Checking...'}
              </span>
            </div>
            <a
              href="http://localhost:5173"
              className="flex items-center gap-2 text-sm font-bold text-amber-600 hover:text-amber-700 transition-colors bg-amber-50 px-4 py-2 rounded-xl border border-amber-200"
            >
              <ExternalLink className="w-4 h-4" />
              Main Platform
            </a>
            <button className="text-sm font-medium text-gray-700 hover:text-amber-600 transition-colors">
              Documentation
            </button>
            <button className="text-sm font-medium text-gray-700 hover:text-amber-600 transition-colors">
              About
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
