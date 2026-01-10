import api from './api';

const API_URL = 'http://localhost:8000';

export async function analyzeLegalDocument(content: string) {
    try {
        const response = await api.post('/search', {
            query: content.substring(0, 500),
            dataset: 'all',
            limit: 3
        });
        return response.data;
    } catch (error) {
        console.error('Error analyzing document:', error);
        return { results: [] };
    }
}

export async function draftDocument(templateName: string, userInput: string) {
    // In a real app, this would call an AI model
    // For now, we'll simulate it or use the backend if it has a drafting endpoint
    return `Drafted document for ${templateName} based on: ${userInput}`;
}
