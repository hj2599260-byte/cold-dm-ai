import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { offer, clientBio } = await req.json();

    if (!offer || !clientBio) {
      return NextResponse.json(
        { error: "Offer and Client Bio are required" },
        { status: 400 }
      );
    }

    // 👇 HARSH BHAI IS NEECHE WAALI LINE MEIN APNI KEY PASTE KARO 👇
    const apiKey = process.env.GEMINI_API_KEY || AIzaSyBZn210mwMbApLLOnG1Zmr32LKzbo3-WEM

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `You are an expert cold outreach specialist for agencies. Write a highly personalized, casual, and direct cold DM based on the following details. Do NOT use corporate jargon, fake enthusiasm, or robotic structures. Keep it under 3-4 sentences, completely conversational, making it look like a human typed it.

My Agency Offer/Service: ${offer}
Prospect (Client) Bio/Info: ${clientBio}

Output only the generated DM message, nothing else.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const generatedText = response.text();

    return NextResponse.json({ text: generatedText });
  } catch (error) {
    console.error("Gemini Stable Error:", error);
    return NextResponse.json(
      { error: "Gemini Error: " + error.message },
      { status: 500 }
    );
  }
}