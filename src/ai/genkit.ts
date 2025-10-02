import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/google-genai';

// This will be the default AI instance, potentially without a key.
// The key will be configured on-the-fly by the flow.
export const ai = genkit({
  plugins: [googleAI({apiKey: process.env.GEMINI_API_KEY})],
  model: 'googleai/gemini-2.5-flash',
});
