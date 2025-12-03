import { CheckCircle, XCircle, AlertCircle } from 'lucide-react';

interface ComparisonRow {
  parameter: string;
  userCase: string;
  courtCase: string;
  similarity: number;
}

interface ComparisonTableProps {
  caseName: string;
  rows: ComparisonRow[];
}

export default function ComparisonTable({ caseName, rows }: ComparisonTableProps) {
  const getSimilarityIcon = (similarity: number) => {
    if (similarity >= 75) return <CheckCircle className="w-5 h-5 text-green-600" />;
    if (similarity >= 40) return <AlertCircle className="w-5 h-5 text-amber-600" />;
    return <XCircle className="w-5 h-5 text-red-600" />;
  };

  const getSimilarityColor = (similarity: number) => {
    if (similarity >= 75) return 'bg-green-50 text-green-800 border-green-200';
    if (similarity >= 40) return 'bg-amber-50 text-amber-800 border-amber-200';
    return 'bg-red-50 text-red-800 border-red-200';
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="mb-6">
        <h3 className="text-xl font-bold text-gray-900">Comparison Analysis</h3>
        <p className="text-sm text-gray-600 mt-1">Your case vs {caseName}</p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b-2 border-gray-200">
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Parameter</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Your Case</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Court Precedent</th>
              <th className="text-center py-3 px-4 font-semibold text-gray-700">Similarity</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr
                key={index}
                className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
              >
                <td className="py-4 px-4">
                  <span className="font-medium text-gray-900">{row.parameter}</span>
                </td>
                <td className="py-4 px-4">
                  <p className="text-sm text-gray-700">{row.userCase}</p>
                </td>
                <td className="py-4 px-4">
                  <p className="text-sm text-gray-700">{row.courtCase}</p>
                </td>
                <td className="py-4 px-4">
                  <div className="flex items-center justify-center gap-2">
                    {getSimilarityIcon(row.similarity)}
                    <span className={`px-3 py-1 rounded-full text-sm font-bold border ${getSimilarityColor(row.similarity)}`}>
                      {row.similarity}%
                    </span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 flex items-center gap-6 justify-end text-xs">
        <div className="flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-green-600" />
          <span className="text-gray-600">High Similarity (75%+)</span>
        </div>
        <div className="flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-amber-600" />
          <span className="text-gray-600">Moderate (40-74%)</span>
        </div>
        <div className="flex items-center gap-2">
          <XCircle className="w-4 h-4 text-red-600" />
          <span className="text-gray-600">Low (&lt;40%)</span>
        </div>
      </div>
    </div>
  );
}
