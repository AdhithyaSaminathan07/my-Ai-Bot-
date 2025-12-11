// import { createOpenAI } from '@ai-sdk/openai';
// import { streamText } from 'ai';

// // 1. Setup the Groq provider
// const groq = createOpenAI({
//   baseURL: 'https://api.groq.com/openai/v1',
//   apiKey: process.env.GROQ_API_KEY,
// });

// export const maxDuration = 30;

// export async function POST(req: Request) {
//   const { messages } = await req.json();

//   const result = await streamText({
//     // UPDATED MODEL NAME HERE:
//     model: groq('llama-3.3-70b-versatile'), 
//     messages,
//   });

//   return result.toAIStreamResponse();
// }


import { createOpenAI } from '@ai-sdk/openai';
import { google } from '@ai-sdk/google';
import { embed, streamText } from 'ai';
import { MongoClient } from 'mongodb';

// 1. Setup Groq
const groq = createOpenAI({
  baseURL: 'https://api.groq.com/openai/v1',
  apiKey: process.env.GROQ_API_KEY,
});

// 2. Setup MongoDB
const client = new MongoClient(process.env.MONGODB_URI!);

export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();
  const lastMessage = messages[messages.length - 1].content;

  // 3. Generate Vector
  const { embedding } = await embed({
    model: google.textEmbeddingModel('text-embedding-004') as any,
    value: lastMessage,
  });

  // 4. Search MongoDB (UPDATED to match your Free Tier Index)
  await client.connect();
  const collection = client.db('ai_portfolio').collection('skills');
  
  const docs = await collection.aggregate([
    {
      "$search": {
        "index": "default",
        "knnBeta": {
          "vector": embedding,
          "path": "embedding",
          "k": 3
        }
      }
    },
    {
      "$project": {
        "_id": 0,
        "content": 1
      }
    }
  ]).toArray();

  // 5. Create Context
  const context = docs.map((doc: any) => doc.content).join("\n");
  console.log("Found Context:", context); 

  const systemPrompt = `You are a helpful portfolio assistant for Adhithya.
  Use the following CONTEXT to answer the user's question.
  If the answer is not in the context, say "I don't have that information."
  
  CONTEXT:
  ${context}`;

  // 6. Answer
  const result = await streamText({
    model: groq('llama-3.3-70b-versatile'),
    messages,
    system: systemPrompt,
  });

  return result.toAIStreamResponse();
}