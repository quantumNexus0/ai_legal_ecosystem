/* 
 * ============================================================================
 * OPENAI INTEGRATION - COMMENTED OUT FOR FUTURE REFERENCE
 * ============================================================================
 * This file contains the OpenAI integration code that has been replaced with
 * Gemini AI. The code is preserved here for potential future use or reference.
 * 
 * To re-enable OpenAI:
 * 1. Uncomment all the code below
 * 2. Uncomment the VITE_OPENAI_API_KEY in the .env file
 * 3. Update the import in AIChat.tsx from '../lib/gemini' to '../lib/openai'
 * 4. npm install openai (if not already installed)
 * ============================================================================
 */

// import OpenAI from 'openai';

// const VITE_OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;

// const openai = new OpenAI({
//     apiKey: VITE_OPENAI_API_KEY,
//     dangerouslyAllowBrowser: true // Note: In production, API calls should go through a backend
// });

// export async function chatWithAI(messages: Array<{ role: 'user' | 'assistant', content: string }>) {
//     try {
//         const completion = await openai.chat.completions.create({
//             model: "gpt-3.5-turbo",
//             messages: messages.map(msg => ({
//                 role: msg.role === 'assistant' ? 'assistant' : 'user',
//                 content: msg.content
//             })),
//             temperature: 0.7,
//             max_tokens: 2000,
//         });

//         return completion.choices[0]?.message?.content || 'No response generated.';
//     } catch (error: any) {
//         console.error('OpenAI API Error:', error);

//         if (error?.status === 401) {
//             throw new Error('Invalid API key. Please check your OpenAI API key configuration.');
//         } else if (error?.status === 429) {
//             throw new Error('Rate limit exceeded. Please try again in a few moments.');
//         } else if (error?.status === 400) {
//             throw new Error('Invalid request. Please try again.');
//         }

//         throw new Error('An error occurred while processing your request.');
//     }
// }

// export async function analyzeLegalDocument(content: string): Promise<string> {
//     try {
//         const prompt = `You are a legal AI assistant. Please analyze this legal document and provide a detailed summary. 
    
// Focus on:
// 1. Document type and purpose
// 2. Key legal points and implications  
// 3. Any potential issues or areas of concern
// 4. Recommendations for action

// Format your response with clear headings, bullet points, and proper structure.

// Document content: ${content.substring(0, 10000)}`;

//         const completion = await openai.chat.completions.create({
//             model: "gpt-3.5-turbo",
//             messages: [{ role: 'user', content: prompt }],
//             temperature: 0.5,
//             max_tokens: 2000,
//         });

//         return completion.choices[0]?.message?.content || 'Analysis failed. Please try again.';
//     } catch (error) {
//         console.error('Error analyzing document:', error);
//         return 'Failed to analyze document. Please try again.';
//     }
// }

// export { openai };

/* 
 * ============================================================================
 * END OF COMMENTED OPENAI CODE
 * ============================================================================
 */
