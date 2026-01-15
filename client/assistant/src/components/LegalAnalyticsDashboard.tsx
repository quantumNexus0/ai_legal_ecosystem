import { useMemo } from 'react';
import { TrendingUp, AlertTriangle, PieChart, Activity } from 'lucide-react';

interface AnalysisRecord {
    id: string;
    date: string;
    formData: any;
    result: {
        strength: number;
        weakPoints: string[];
        userCase: {
            stage: string;
        };
    };
}

interface LegalAnalyticsDashboardProps {
    analysisHistory: AnalysisRecord[];
}

export default function LegalAnalyticsDashboard({ analysisHistory }: LegalAnalyticsDashboardProps) {
    // --- Data Processing ---

    const stats = useMemo(() => {
        if (!analysisHistory || analysisHistory.length === 0) return null;

        const totalCases = analysisHistory.length;

        // Calculate Average Win Probability
        const totalStrength = analysisHistory.reduce((sum, record) => sum + (record.result.strength || 0), 0);
        const avgStrength = Math.round(totalStrength / totalCases);

        // Calculate Risk Factors Frequency
        const riskCounts: Record<string, number> = {};
        analysisHistory.forEach(record => {
            record.result.weakPoints?.forEach(point => {
                // Simple normalization to group similar risks
                const key = point.split(' ').slice(0, 3).join(' ') + '...';
                riskCounts[key] = (riskCounts[key] || 0) + 1;
            });
        });

        const topRisks = Object.entries(riskCounts)
            .sort(([, a], [, b]) => b - a)
            .slice(0, 4);

        // Calculate Case Type/Stage Distribution
        const stageCounts: Record<string, number> = {};
        analysisHistory.forEach(record => {
            const stage = record.result.userCase?.stage || 'Unknown';
            stageCounts[stage] = (stageCounts[stage] || 0) + 1;
        });

        // Prepare Trend Data (reverse to show oldest to newest)
        const trendData = [...analysisHistory].reverse().map(record => ({
            date: record.date,
            strength: record.result.strength || 0
        }));

        return { totalCases, avgStrength, topRisks, stageCounts, trendData };
    }, [analysisHistory]);

    if (!stats) {
        return (
            <div className="flex flex-col items-center justify-center h-96 bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
                <Activity className="w-16 h-16 text-gray-300 mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No Analysis Data Yet</h3>
                <p className="text-gray-500 max-w-md">
                    Start by running a new case analysis to populate your legal analytics dashboard.
                </p>
            </div>
        );
    }

    // --- Chart Helpers ---

    // Simple Line Chart for Trend
    const renderTrendChart = () => {
        const height = 150;
        const width = 500; // Viewport width
        const padding = 20;

        if (stats.trendData.length < 2) return <p className="text-gray-400 text-sm italic p-4">Need at least 2 analyses to show trend.</p>;

        const maxVal = 100;
        const minVal = 0;

        const points = stats.trendData.map((d, i) => {
            const x = padding + (i / (stats.trendData.length - 1)) * (width - 2 * padding);
            const y = height - padding - ((d.strength - minVal) / (maxVal - minVal)) * (height - 2 * padding);
            return `${x},${y}`;
        }).join(' ');

        return (
            <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full overflow-visible">
                {/* Grid lines */}
                <line x1={padding} y1={padding} x2={width - padding} y2={padding} stroke="#e5e7eb" strokeDasharray="4" />
                <line x1={padding} y1={height / 2} x2={width - padding} y2={height / 2} stroke="#e5e7eb" strokeDasharray="4" />
                <line x1={padding} y1={height - padding} x2={width - padding} y2={height - padding} stroke="#e5e7eb" strokeDasharray="4" />

                {/* The Line */}
                <polyline
                    fill="none"
                    stroke="#4f46e5"
                    strokeWidth="3"
                    points={points}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />

                {/* Data Points */}
                {stats.trendData.map((d, i) => {
                    const x = padding + (i / (stats.trendData.length - 1)) * (width - 2 * padding);
                    const y = height - padding - ((d.strength - minVal) / (maxVal - minVal)) * (height - 2 * padding);
                    return (
                        <circle key={i} cx={x} cy={y} r="4" fill="white" stroke="#4f46e5" strokeWidth="2" />
                    );
                })}
            </svg>
        );
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">Legal Analytics Dashboard</h2>
                <span className="text-sm text-gray-500">Based on {stats.totalCases} case analyses</span>
            </div>

            {/* Summary Stats Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-indigo-50 rounded-lg">
                            <TrendingUp className="w-6 h-6 text-indigo-600" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500 font-medium">Avg. Win Probability</p>
                            <h3 className="text-2xl font-bold text-gray-900">{stats.avgStrength}%</h3>
                        </div>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-amber-50 rounded-lg">
                            <AlertTriangle className="w-6 h-6 text-amber-600" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500 font-medium">Top Risk Factor</p>
                            <h3 className="text-lg font-bold text-gray-900 truncate max-w-[200px]" title={stats.topRisks[0]?.[0]}>
                                {stats.topRisks[0]?.[0] || 'None'}
                            </h3>
                        </div>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-emerald-50 rounded-lg">
                            <PieChart className="w-6 h-6 text-emerald-600" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500 font-medium">Most Common Stage</p>
                            <h3 className="text-lg font-bold text-gray-900">
                                {Object.entries(stats.stageCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || 'N/A'}
                            </h3>
                        </div>
                    </div>
                </div>
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                {/* Trend Chart */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900 mb-6">Win Probability Trend</h3>
                    <div className="h-48 w-full">
                        {renderTrendChart()}
                    </div>
                    <div className="flex justify-between text-xs text-gray-400 mt-2 px-2">
                        <span>Oldest</span>
                        <span>Newest</span>
                    </div>
                </div>

                {/* Risk Factors Bar Chart */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900 mb-6">Common Risk Factors</h3>
                    <div className="space-y-4">
                        {stats.topRisks.map(([risk, count], idx) => (
                            <div key={idx}>
                                <div className="flex justify-between text-sm mb-1">
                                    <span className="text-gray-700 font-medium truncate w-3/4">{risk}</span>
                                    <span className="text-gray-500">{count} cases</span>
                                </div>
                                <div className="w-full bg-gray-100 rounded-full h-2.5">
                                    <div
                                        className="bg-amber-500 h-2.5 rounded-full"
                                        style={{ width: `${(count / stats.totalCases) * 100}%` }}
                                    ></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
