import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    // 1. Frontend se data pakadna
    const { mySkill, clientBio } = await req.json();

    // 2. Check API Key
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "API Key is missing from .env.local!" }, { status: 500 });
    }

    // 3. Gemini AI ko initialize karna
    const genAI = new GoogleGenerativeAI(apiKey);
    
    // 4. Naya stable model use karna
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    // 5. Prompt taiyar karna
    const cleanPrompt = "Write a short, highly personalized cold DM from a freelancer. Freelancer skill: " + mySkill + ". Client bio/info: " + clientBio + ". Keep it under 3 short paragraphs, professional yet friendly, start with a hook based on their bio, explain how the skill helps them, and end with a soft call to action like asking if they are open to a quick chat next week.";

    // 6. Gemini ko request bhejna
    const result = await model.generateContent(cleanPrompt);
    const responseText = result.response.text();

    // 7. Data wapas bhejna
    return NextResponse.json({ text: responseText });

  } catch (error) {
    console.error("Gemini Error:", error);
    return NextResponse.json({ error: "AI Error: " + error.message }, { status: 500 });
  }
}