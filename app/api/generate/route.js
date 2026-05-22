import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { skills, clientBio } = await req.json();

    if (!skills || !clientBio) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    // 1. Gemini Initialize karna (Make sure your API key env is correct)
    const genAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

    // 2. Naya Stable Model Use Karna
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    // 3. Ekdum Khatarnak Human Prompt (No AI Traces)
    const prompt = `
You are a world-class, 6-figure sales hacker and copywriting expert for modern agencies. 
Your task is to write a highly personalized, natural, and human-like cold DM based on the user's service and the prospect's info.

STRICT RULES TO MAKE IT SOUND 100% HUMAN (NO AI TRACES):
1. NO formal corporate greetings like "Dear Sir/Madam", "I hope this message finds you well", or "Greetings". Start directly or with a chill "Hey [Name]," or "Yo [Name],".
2. NO bullet points, NO hashtags, and NO emojis inside the message unless it's very casual.
3. Keep it ultra-short (3 to 4 sentences maximum). People delete long paragraphs.
4. Use casual, conversational English. Speak like a real 22-year-old agency owner chatting on Instagram or LinkedIn, not a textbook.
5. Avoid cliché AI words like: "Crucial", "Revolutionize", "Delve", "Tap into", "Synergy", "Supercharge", "Look no further".
6. STRUCTURE: 
   - Line 1: A genuine, hyper-specific compliment or observation about their business/content (No generic praise).
   - Line 2: State the specific gap or problem they have in a friendly way.
   - Line 3: Offer your solution casually as a free value/quick question.
   - Line 4: A low-friction Call to Action (CTA) like "Worth a quick chat?" or "Mind if I send over a quick sample video?".

User Agency Offer: ${skills}
Prospect Info: ${clientBio}
    `;

    // 4. Gemini Ko Request Bhejna
    const result = await model.generateContent({ prompt: prompt });
    const responseText = result.response.text();

    // 5. Data Wapas Bhejna
    return NextResponse.json({ text: responseText });

  } catch (error) {
    console.error("Gemini Error:", error);
    return NextResponse.json({ error: "Gemini failed to think" }, { status: 500 });
  }
}