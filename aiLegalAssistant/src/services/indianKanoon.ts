const BASE_URL = 'https://api.indiankanoon.org';
const API_TOKEN = import.meta.env.VITE_INDIAN_KANOON_TOKEN;

export interface IKDocument {
    tid: number;
    title: string;
    headline: string;
    docsource: string;
    publishdate: string;
    citation: string;
}

export interface IKSearchResponse {
    found: number;
    docs: IKDocument[];
    categories: any[];
}

export const indianKanoon = {
    async search(query: string, pagenum: number = 0): Promise<IKSearchResponse> {
        // The API expects formInput as the query parameter
        console.log('Searching Indian Kanoon with query:', query);
        const response = await fetch(`${BASE_URL}/search/?formInput=${encodeURIComponent(query)}&pagenum=${pagenum}`, {
            headers: {
                'Authorization': `Token ${API_TOKEN}`
            }
        });

        console.log('Indian Kanoon Response Status:', response.status);

        if (!response.ok) {
            // Fallback for demo if API fails (likely due to CORS or invalid token)
            console.warn('Indian Kanoon API request failed, using mock data for demonstration if needed.');
            throw new Error(`API request failed with status ${response.status}`);
        }

        return response.json();
    },

    async getDoc(tid: number) {
        const response = await fetch(`${BASE_URL}/doc/${tid}/`, {
            headers: {
                'Authorization': `Token ${API_TOKEN}`
            }
        });
        if (!response.ok) {
            throw new Error('Failed to fetch document');
        }
        return response.json();
    }
};
