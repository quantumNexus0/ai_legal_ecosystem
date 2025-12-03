import { useEffect, useRef } from 'react';

interface WebSearchResultsProps {
    searchQuery: string;
}

declare global {
    interface Window {
        google: any;
    }
}

export default function WebSearchResults({ searchQuery }: WebSearchResultsProps) {
    const searchContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://cse.google.com/cse.js?cx=159169d430dca4a33';
        script.async = true;
        document.head.appendChild(script);

        script.onload = () => {
            if (window.google && searchQuery) {
                const searchElement = searchContainerRef.current?.querySelector('.gsc-search-box-tools input.gsc-input');
                if (searchElement) {
                    (searchElement as HTMLInputElement).value = searchQuery;
                    const searchButton = searchContainerRef.current?.querySelector('.gsc-search-button button');
                    if (searchButton) {
                        (searchButton as HTMLButtonElement).click();
                    }
                }
            }
        };

        return () => {
            const scripts = document.head.getElementsByTagName('script');
            for (let i = 0; i < scripts.length; i++) {
                if (scripts[i].src.includes('cse.google.com')) {
                    document.head.removeChild(scripts[i]);
                    break;
                }
            }
        };
    }, [searchQuery]);

    return (
        <div className="relative" ref={searchContainerRef}>
            <style>{`
        .gsc-results-wrapper-overlay {
          position: relative !important;
          height: auto !important;
          width: 100% !important;
          left: 0 !important;
          top: 0 !important;
          background: transparent !important;
          border: none !important;
          box-shadow: none !important;
          padding: 0 !important;
        }
        .gsc-modal-background-image {
          display: none !important;
        }
        .gsc-results .gsc-cursor-box {
          margin: 16px 0 !important;
        }
        .gcsc-find-more-on-google {
          display: none !important;
        }
        .gcsc-more-maybe-branding-root {
          display: none !important;
        }
      `}</style>
            <div className="gcse-search"></div>
        </div>
    );
}
