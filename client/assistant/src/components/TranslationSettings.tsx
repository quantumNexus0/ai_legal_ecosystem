import { Settings } from 'lucide-react';
import { useState } from 'react';

export interface TranslationSettingsData {
  language: string;
  formality: string;
  extractSections: boolean;
  extractEvidence: boolean;
  extractEntities: boolean;
  generateGlossary: boolean;
}

interface TranslationSettingsProps {
  onSettingsChange: (settings: Partial<TranslationSettingsData>) => void;
}

export default function TranslationSettings({ onSettingsChange }: TranslationSettingsProps) {
  const [settings, setSettings] = useState<TranslationSettingsData>({
    language: 'en',
    formality: 'formal',
    extractSections: true,
    extractEvidence: true,
    extractEntities: true,
    generateGlossary: true,
  });

  const handleChange = (key: keyof TranslationSettingsData, value: any) => {
    const newSettings = { ...settings, [key]: value };
    setSettings(newSettings);
    onSettingsChange({ [key]: value });
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sticky top-8">
      <div className="flex items-center gap-2 mb-6">
        <Settings className="w-5 h-5 text-gray-600" />
        <h2 className="text-lg font-bold text-gray-900">Settings</h2>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-2">
            Target Language
          </label>
          <select
            value={settings.language}
            onChange={(e) => handleChange('language', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent text-sm"
          >
            <option value="en">English</option>
            <option value="hi">Hindi</option>
            <option value="mr">Marathi</option>
            <option value="gu">Gujarati</option>
            <option value="kn">Kannada</option>
            <option value="ta">Tamil</option>
            <option value="te">Telugu</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-2">
            Formality Level
          </label>
          <select
            value={settings.formality}
            onChange={(e) => handleChange('formality', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent text-sm"
          >
            <option value="formal">Formal (Court)</option>
            <option value="semi-formal">Semi-Formal</option>
            <option value="simplified">Simplified</option>
          </select>
        </div>

        <div className="border-t border-gray-200 pt-4">
          <p className="text-xs font-semibold text-gray-500 uppercase mb-3">Extract & Analyze</p>
          <div className="space-y-3">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={settings.extractSections}
                onChange={(e) => handleChange('extractSections', e.target.checked)}
                className="w-4 h-4 text-amber-600 rounded"
              />
              <span className="text-sm text-gray-700">Extract Sections</span>
            </label>

            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={settings.extractEvidence}
                onChange={(e) => handleChange('extractEvidence', e.target.checked)}
                className="w-4 h-4 text-amber-600 rounded"
              />
              <span className="text-sm text-gray-700">Extract Evidence</span>
            </label>

            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={settings.extractEntities}
                onChange={(e) => handleChange('extractEntities', e.target.checked)}
                className="w-4 h-4 text-amber-600 rounded"
              />
              <span className="text-sm text-gray-700">Extract Entities</span>
            </label>

            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={settings.generateGlossary}
                onChange={(e) => handleChange('generateGlossary', e.target.checked)}
                className="w-4 h-4 text-amber-600 rounded"
              />
              <span className="text-sm text-gray-700">Generate Glossary</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
