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
//   // --- PERSONAL INTRO & EDUCATION ---
//   "My name is Adhithya Saminatha. I am currently working as a MERN Stack Developer at Tech Vaseegrah.",
//   "I completed my Bachelor of Engineering in Computer Science (BE-CSE) at Arasu Engineering College, Kumbakonam (Anna University) from 2020 to 2024.",
  
//   // --- PROJECT 1: BILLZZY LITE (The Star Project) ---
//   "I developed 'Billzzy Lite', a Progressive Web App (PWA) billing software designed for mobile devices.",
//   "Billzzy Lite helps businesses manage inventory, generate bills, and share invoices instantly via WhatsApp.",
//   "Key features of Billzzy Lite include a camera-based QR Scanner for products, Dynamic UPI QR Code generation for payments, and Google OAuth for secure login.",
//   "The tech stack for Billzzy Lite includes Next.js (Frontend & API Routes), MongoDB (Database), and AWS EC2 Lightsail for cloud deployment.",
//   "This project taught me PWA development, real-time data handling, and scalable cloud deployment.",

//   // --- PROJECT 2: INTERNSHIP ADMIN PANEL ---
//   "I built the 'Admin Panel for Internship Registration' at Tech Vaseegrah.",
//   "This system manages student applications and features WhatsApp integration to send automated confirmation messages to interns.",

//   // --- PROJECT 3: LANDING PAGE ---
//   "I developed the official Landing Page for Tech Vaseegrah using modern web technologies to showcase company services.",

//   // --- SKILLS SUMMARY ---
//   "My technical skills include the MERN Stack (MongoDB, Express, React, Node.js), Next.js, PWA development, and Cloud Computing (AWS Lightsail).",
//   "I am experienced with tools like Git, GitHub, and Postman."
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
  
//   console.log("✅ Success! New portfolio data uploaded.");
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

// 2. YOUR UPDATED PORTFOLIO DATA
const myData = [
  // --- PROFESSIONAL SUMMARY ---
  "My name is Adhithya Saminatha. I am a MERN Stack Developer currently working at Tech Vaseegrah.",
  "I completed my Bachelor of Engineering in Computer Science (BE-CSE) at Arasu Engineering College (2020-2024).",

  // --- CURRENT EMPLOYMENT (Tech Vaseegrah) ---
  "I am currently employed at Tech Vaseegrah, where I am working on two major billing products: Billzzy Lite and Billzzy.",
  
  // Current Project 1: Billzzy Lite
  "I developed 'Billzzy Lite', a Progressive Web App (PWA) for mobile billing. It allows businesses to bill customers using smartphone cameras as scanners.",
  "Key features of Billzzy Lite include WhatsApp invoice sharing, Dynamic UPI QR codes for payments, and Google OAuth.",
  "Billzzy Lite uses Next.js, MongoDB, and AWS Lightsail.",

  // Current Project 2: Billzzy (The Big One)
  "I am also working on 'Billzzy', which is a complete, full-scale billing application for larger enterprises.",
  "While Billzzy Lite is for mobile/PWA, 'Billzzy' is a comprehensive solution designed for complete inventory and business management.",

  // --- INTERNSHIP EXPERIENCE ---
  "Before becoming a full-time developer, I completed an internship at Tech Vaseegrah where I delivered two key projects.",
  
  // Internship Project 1: Landing Page
  "During my internship, I developed the official 'Tech Vaseegrah Landing Page' to showcase the company's portfolio and services.",
  
  // Internship Project 2: Admin Panel
  "I also built the 'Admin Panel for Internship Registration' during my internship. This system automated student enrollments and sent WhatsApp confirmations.",

  // --- SKILLS ---
  "My technical stack includes MongoDB, Express.js, React, Node.js (MERN), Next.js 14+, and Cloud Deployment (AWS)."
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
  
  console.log("✅ Success! Portfolio updated with Internship vs Current roles.");
  await client.close();
}

main().catch(console.error);