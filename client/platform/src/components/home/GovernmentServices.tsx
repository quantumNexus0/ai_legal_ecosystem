import React from 'react';
import { ExternalLink, Gavel, FileText, CreditCard, Monitor, Scale } from 'lucide-react';

const services = [
    {
        title: 'High Court Services',
        description: 'Access to Services of e-Courts: Cause lists, Case Status, Orders/Judgments of High Courts',
        icon: <Gavel className="w-8 h-8 text-indigo-600" />,
        link: 'https://SERVICES.ecourts.gov.in/highcourt'
    },
    {
        title: 'High Court NJDG',
        description: 'NJDG works as a monitoring tool to identify, manage and reduce pendency of cases.',
        icon: <Scale className="w-8 h-8 text-orange-600" />,
        link: 'https://njdg.ecourts.gov.in/hcnjdg_public/'
    },
    {
        title: 'District Court Services',
        description: 'Access to Services of e-Courts: Cause lists, Case Status, Orders/Judgments & NJDG',
        icon: <FileText className="w-8 h-8 text-green-600" />,
        link: 'https://SERVICES.ecourts.gov.in/'
    },
    {
        title: 'e-Filing',
        description: 'e-Filing application enables electronic filing of legal papers.',
        icon: <Monitor className="w-8 h-8 text-blue-600" />,
        link: 'https://efiling.ecourts.gov.in/'
    },
    {
        title: 'ePay',
        description: 'ePay is a way of paying for court through an electronic medium, without the use of cheque or cash.',
        icon: <CreditCard className="w-8 h-8 text-purple-600" />,
        link: 'https://pay.ecourts.gov.in/'
    },
    {
        title: 'Virtual Courts',
        description: 'Eliminating presence of litigant or lawyer in the court and adjudication of the case online',
        icon: <Monitor className="w-8 h-8 text-red-600" />,
        link: 'https://vcourts.gov.in/'
    }
];

const GovernmentServices = ({ compact = false }: { compact?: boolean }) => {
    const Content = () => (
        <div className={`grid gap-4 ${compact ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-12'}`}>
            {services.map((service, index) => (
                <div
                    key={index}
                    className={`relative group bg-white p-4 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all ${compact ? 'hover:bg-indigo-50/50' : ''}`}
                >
                    <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0">
                            <span className={`inline-flex items-center justify-center rounded-lg bg-gray-50 group-hover:bg-indigo-50 transition-colors ${compact ? 'h-10 w-10' : 'h-12 w-12'}`}>
                                {React.cloneElement(service.icon as React.ReactElement, { className: compact ? 'w-5 h-5' : 'w-6 h-6' })}
                            </span>
                        </div>
                        <div className="flex-1 min-w-0">
                            <a href={service.link} target="_blank" rel="noopener noreferrer" className="focus:outline-none">
                                <span className="absolute inset-0" aria-hidden="true" />
                                <p className={`font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors ${compact ? 'text-sm' : 'text-lg'}`}>
                                    {service.title}
                                </p>
                            </a>
                            {!compact && (
                                <p className="mt-1 text-sm text-gray-500 line-clamp-2">
                                    {service.description}
                                </p>
                            )}
                        </div>
                        {!compact && (
                            <div className="flex-shrink-0 self-center">
                                <ExternalLink className="h-5 w-5 text-gray-400 group-hover:text-indigo-500" />
                            </div>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );

    if (compact) {
        return <Content />;
    }

    return (
        <div className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                    <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                        e-Courts Services
                    </h2>
                    <p className="mt-4 text-xl text-gray-500">
                        Quick access to official Indian Judiciary services
                    </p>
                </div>
                <Content />
                <div className="mt-8 text-center">
                    <p className="text-xs text-gray-400">
                        Note: These links redirect to official government portals (ecourts.gov.in).
                    </p>
                </div>
            </div>
        </div>
    );
};

export default GovernmentServices;
