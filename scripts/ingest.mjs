// import { MongoClient } from 'mongodb';
// import { google } from '@ai-sdk/google';
// import { embedMany } from 'ai';
// import dotenv from 'dotenv';

// // 1. Load environment variables
// dotenv.config({ path: '.env.local' });

// const MONGODB_URI = process.env.MONGODB_URI;
// const GOOGLE_API_KEY = process.env.GOOGLE_GENERATIVE_AI_API_KEY;

// // 2. YOUR UPDATED PORTFOLIO DATA
// const myData = [
//   // --- PROFESSIONAL SUMMARY ---
//   "My name is Adhithya Saminatha. I am a MERN Stack Developer currently working at Tech Vaseegrah.",
//   "I completed my Bachelor of Engineering in Computer Science (BE-CSE) at Arasu Engineering College (2020-2024).",

//   // --- CURRENT EMPLOYMENT (Tech Vaseegrah) ---
//   "I am currently employed at Tech Vaseegrah, where I am working on two major billing products: Billzzy Lite and Billzzy.",
  
//   // Current Project 1: Billzzy Lite
//   "I developed 'Billzzy Lite', a Progressive Web App (PWA) for mobile billing. It allows businesses to bill customers using smartphone cameras as scanners.",
//   "Key features of Billzzy Lite include WhatsApp invoice sharing, Dynamic UPI QR codes for payments, and Google OAuth.",
//   "Billzzy Lite uses Next.js, MongoDB, and AWS Lightsail.",

//   // Current Project 2: Billzzy (The Big One)
//   "I am also working on 'Billzzy', which is a complete, full-scale billing application for larger enterprises.",
//   "While Billzzy Lite is for mobile/PWA, 'Billzzy' is a comprehensive solution designed for complete inventory and business management.",

//   // --- INTERNSHIP EXPERIENCE ---
//   "Before becoming a full-time developer, I completed an internship at Tech Vaseegrah where I delivered two key projects.",
  
//   // Internship Project 1: Landing Page
//   "During my internship, I developed the official 'Tech Vaseegrah Landing Page' to showcase the company's portfolio and services.",
  
//   // Internship Project 2: Admin Panel
//   "I also built the 'Admin Panel for Internship Registration' during my internship. This system automated student enrollments and sent WhatsApp confirmations.",

//   // --- SKILLS ---
//   "My technical stack includes MongoDB, Express.js, React, Node.js (MERN), Next.js 14+, and Cloud Deployment (AWS)."
// ];

// async function main() {
//   console.log("🤖 Robot starting...");

//   if (!MONGODB_URI || !GOOGLE_API_KEY) {
//     throw new Error("❌ Missing API Keys in .env.local");
//   }

//   // 3. Connect to Database
//   const client = new MongoClient(MONGODB_URI);
//   await client.connect();
  
//   const collection = client.db('ai_portfolio').collection('skills');

//   // 4. Delete old data (so we don't duplicate)
//   await collection.deleteMany({});
//   console.log("🧹 Cleared old data");

//   // 5. Generate new embeddings
//   const { embeddings } = await embedMany({
//     model: google.textEmbeddingModel('text-embedding-004'),
//     values: myData,
//   });

//   // 6. Save to MongoDB
//   const dataToSave = myData.map((text, i) => ({
//     content: text,
//     embedding: embeddings[i],
//   }));

//   await collection.insertMany(dataToSave);
  
//   console.log("✅ Success! Portfolio updated with Internship vs Current roles.");
//   await client.close();
// }

// main().catch(console.error);

import { MongoClient } from 'mongodb';
import { google } from '@ai-sdk/google';
import { embedMany } from 'ai';
import dotenv from 'dotenv';

// 1. Load environment variables
dotenv.config({ path: '.env.local' });

const MONGODB_URI = process.env.MONGODB_URI;
const GOOGLE_API_KEY = process.env.GOOGLE_GENERATIVE_AI_API_KEY;

// 🧠 "INTERVIEW-READY" DATA (Based on your detailed answers)
const myData = [
  // --- 1. INTRODUCTION ---
  "I am Adhithya Saminatha, a Junior MERN Stack Developer. I hold a Bachelor of Engineering in Computer Science and Engineering (BE-CSE) from Arasu Engineering College.",
  "I specialize in building scalable web applications using the MERN Stack (MongoDB, Express.js, React, Node.js) and Next.js.",

  // --- 2. MOST COMPLEX PROJECT (The NFC Challenge) ---
  "My most complex technical challenge was implementing NFC bill sharing in 'Billzzy Lite'. Standard Web NFC has limitations for phone-to-phone transfer.",
  "To solve the NFC limitation, I used Host Card Emulation (HCE) technology and built a native Android bridge app called 'BillzzyliteNFC Bridge'.",
  "My PWA sends the bill link to this bridge app, which acts as a virtual NFC tag. This allows seamless phone-to-phone bill transfer, effectively connecting the web to native hardware.",

  // --- 3. WHY MERN & MONGODB? ---
  "I use the MERN stack because it provides a complete, scalable full-stack solution using JavaScript on both frontend and backend, which simplifies development.",
  "I prefer MongoDB over SQL for billing applications because of its flexible JSON-like data model. Invoice data often changes (taxes, discounts), and MongoDB allows these changes without complex schema migrations.",

  // --- 4. AUTHENTICATION & SECURITY ---
  "For user authentication in Billzzy Lite, I use Google OAuth (Sign-In). This provides a seamless user experience and reduces security risks since users don't manage passwords.",
  "For the Admin Panel, I use credential-based authentication where passwords are stored securely in environment variables. After validation, I issue a JWT (JSON Web Token) to securely authorize API requests.",
  "I protect sensitive routes using backend middleware that verifies the JWT, ensuring only authorized admins can access critical data.",

  // --- 5. DEPLOYMENT EXPERIENCE (AWS & Vercel) ---
  "I have deployed multiple applications to production. For my AI Portfolio and In-House Forms, I used Vercel to leverage its automatic CI/CD and Next.js optimization.",
  "For the main commercial product 'Billzzy Lite', I deployed it on AWS Lightsail. I set up the server environment, managed it using PM2 for stability, and handled the full cloud configuration for cost and control.",

  // --- 6. INTERNSHIP VS CURRENT ROLE ---
  "During my internship at Tech Vaseegrah, I focused on learning fundamentals. I built the company Landing Page (UI/UX) and an Internship Admin Panel (Backend API & Routing).",
  "In my current full-time role, I work on product-level applications. For 'Billzzy Lite', I built the entire app from scratch using Next.js, TypeScript, and Tailwind CSS.",
  "I am also working on 'Billzzy', a larger enterprise application, where I focus on warehouse management features and real-world inventory flow.",

  // --- 7. PWA & OFFLINE CAPABILITIES ---
  "Billzzy Lite is a Progressive Web App (PWA), so it works seamlessly on both mobile and desktop like a native app.",
  "I implemented Service Workers to cache essential assets. This allows the app to work offline, ensuring users can continue basic operations even when the internet connection is unstable.",
  "Once the device comes back online, the app automatically syncs the data, ensuring no business data is lost.",

  // --- 8. STATE MANAGEMENT (Inferred standard practice for MERN) ---
  "In my React and Next.js applications, I manage state effectively to ensure data consistency across the UI.",
  "For simple component state, I use React Hooks. For complex global state like user sessions or cart data in Billzzy, I use Context API or efficient state management libraries.",

  // --- 9. WHY HIRE ME? (Production Experience) ---
  "You should hire me because I have real production experience, not just academic projects. My code runs in shops with paying clients.",
  "I understand the full lifecycle of an application—from development to AWS deployment. I can take ownership of features and understand business requirements like inventory flow and correctness.",

  // --- 10. FUTURE GOALS ---
  "My future goal is to master AI Engineering, specifically integrating Large Language Models (LLMs) into real-world applications to create smarter user experiences.",
  "I also plan to deepen my backend skills in System Design and Cloud Infrastructure so I can architect solutions that handle growth efficiently."
];

async function main() {
  console.log("🤖 Robot starting...");

  if (!MONGODB_URI || !GOOGLE_API_KEY) {
    throw new Error("❌ Missing API Keys in .env.local");
  }

  // 3. Connect to Database
  const client = new MongoClient(MONGODB_URI);
  await client.connect();
  
  const collection = client.db('ai_portfolio').collection('skills');

  // 4. Delete old data (so we don't duplicate)
  await collection.deleteMany({});
  console.log("🧹 Cleared old data");

  // 5. Generate new embeddings
  const { embeddings } = await embedMany({
    model: google.textEmbeddingModel('text-embedding-004'),
    values: myData,
  });

  // 6. Save to MongoDB
  const dataToSave = myData.map((text, i) => ({
    content: text,
    embedding: embeddings[i],
  }));

  await collection.insertMany(dataToSave);
  
  console.log("✅ Success! Your bot is now fully Interview Ready with all detailed answers.");
  await client.close();
}

main().catch(console.error);