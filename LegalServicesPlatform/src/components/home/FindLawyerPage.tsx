import React from 'react';
import Lawyers from './Lawyers';
import Navbar from '../layout/Navbar';
import Footer from './Footer';

interface FindLawyerPageProps {
    hideNav?: boolean;
}

const FindLawyerPage: React.FC<FindLawyerPageProps> = ({ hideNav = false }) => {
    return (
        <div className={`min-h-screen bg-gray-50 ${!hideNav ? 'pt-16' : ''}`}>
            {!hideNav && <Navbar />}
            <div className="py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-8">Find Your Legal Expert</h1>
                    <Lawyers />
                </div>
            </div>
            {!hideNav && <Footer />}
        </div>
    );
};

export default FindLawyerPage;
