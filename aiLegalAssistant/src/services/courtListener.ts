const BASE_URL = 'https://api.indiankanoon.org';
const API_TOKEN = import.meta.env.VITE_INDIAN_KANOON_TOKEN;

const headers = {
    'Authorization': `Token ${API_TOKEN}`,
};

export interface Docket {
    id: number;
    case_name: string;
    docket_number: string;
    court: string;
    date_filed: string;
    absolute_url: string;
    content?: string;
}

export interface SearchResult {
    count: number;
    next: string | null;
    previous: string | null;
    results: Docket[];
}

export const courtListener = {
    async searchDockets(query: string): Promise<SearchResult> {
        console.log('Searching Indian Kanoon (via adapter) with query:', query);

        try {
            const response = await fetch(`${BASE_URL}/search/?formInput=${encodeURIComponent(query)}&pagenum=0`, {
                headers
            });

            if (response.status === 403) {
                console.warn('Indian Kanoon API Token is invalid or expired.');
                throw new Error('Invalid API Token');
            }

            if (!response.ok) {
                console.warn(`Indian Kanoon API request failed with status: ${response.status}`);
                throw new Error('Failed to fetch cases');
            }

            const data = await response.json();

            // Map Indian Kanoon docs to Docket interface
            const results: Docket[] = (data.docs || []).map((doc: any) => ({
                id: doc.tid,
                case_name: doc.title,
                docket_number: doc.citation || 'N/A',
                court: doc.docsource || 'Indian Court',
                date_filed: doc.publishdate || 'Unknown',
                absolute_url: `https://indiankanoon.org/doc/${doc.tid}/`
            }));

            return {
                count: data.found || 0,
                next: null,
                previous: null,
                results: results
            };
        } catch (error) {
            console.error('API Error, falling back to demo data:', error);

            // Fallback Mock Data for demonstration
            const mockResults: Docket[] = [
                {
                    id: 12345,
                    case_name: 'Maneka Gandhi v. Union of India',
                    docket_number: '1978 AIR 597',
                    court: 'Supreme Court of India',
                    date_filed: '1978-01-25',
                    absolute_url: 'https://indiankanoon.org/doc/1766147/'
                },
                {
                    id: 67890,
                    case_name: 'K.S. Puttaswamy v. Union of India',
                    docket_number: 'WRIT PETITION (CIVIL) NO 494 OF 2012',
                    court: 'Supreme Court of India',
                    date_filed: '2017-08-24',
                    absolute_url: 'https://indiankanoon.org/doc/127517806/'
                }
            ];

            // Filter mock data based on query roughly
            const filtered = mockResults.filter(r =>
                r.case_name.toLowerCase().includes(query.toLowerCase()) ||
                r.court.toLowerCase().includes(query.toLowerCase())
            );

            return {
                count: filtered.length,
                next: null,
                previous: null,
                results: filtered.length > 0 ? filtered : mockResults // Return all if no match in mock
            };
        }
    },

    async getDocket(id: number | string): Promise<Docket> {
        try {
            const response = await fetch(`${BASE_URL}/doc/${id}/`, {
                headers
            });
            if (!response.ok) {
                throw new Error('Failed to fetch docket');
            }
            const doc = await response.json();
            return {
                id: doc.tid,
                case_name: doc.title,
                docket_number: doc.citation || 'N/A',
                court: doc.docsource || 'Indian Court',
                date_filed: doc.publishdate || 'Unknown',
                absolute_url: `https://indiankanoon.org/doc/${doc.tid}/`,
                content: doc.doc // The HTML content
            };
        } catch (error) {
            console.error('Get Doc Error', error);
            return {
                id: Number(id),
                case_name: 'Demo Case Details',
                docket_number: 'N/A',
                court: 'Demo Court',
                date_filed: '2023-01-01',
                absolute_url: `https://indiankanoon.org/doc/${id}/`,
                content: '<div class="doc_content"><h1>Demo Judgment Content</h1><p>This is a placeholder for the actual judgment text. In a real scenario, the Indian Kanoon API would return the full HTML content of the judgment here.</p><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p></div>'
            };
        }
    },

    async getCluster(id: number | string) {
        return {};
    },

    async getOpinion(id: number | string) {
        return {};
    }
};
