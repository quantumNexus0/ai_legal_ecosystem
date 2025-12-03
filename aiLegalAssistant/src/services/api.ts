const API_BASE_URL = 'http://localhost:8000';

export const api = {
    async checkHealth() {
        try {
            const response = await fetch(`${API_BASE_URL}/health`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return await response.json();
        } catch (error) {
            console.error('API Health Check Failed:', error);
            throw error;
        }
    },

    async getRoot() {
        try {
            const response = await fetch(`${API_BASE_URL}/`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return await response.json();
        } catch (error) {
            console.error('API Root Check Failed:', error);
            throw error;
        }
    },

    async searchDatasets(query: string, dataset: string = 'all') {
        try {
            const response = await fetch(`${API_BASE_URL}/search`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ query, dataset }),
            });

            if (!response.ok) {
                throw new Error('Search request failed');
            }

            return await response.json();
        } catch (error) {
            console.error('Search Failed:', error);
            throw error;
        }
    },

    async listDatasets() {
        try {
            const response = await fetch(`${API_BASE_URL}/datasets`);
            if (!response.ok) {
                throw new Error('Failed to fetch datasets');
            }
            return await response.json();
        } catch (error) {
            console.error('List Datasets Failed:', error);
            throw error;
        }
    }
};
