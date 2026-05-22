import { GoogleGenAI } from "@google/genai";
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

    // Naya object function ke andar create karenge taaki koi token issue na ho
    // Aur Vercel par jo GEMINI_API_KEY daali hai, ye automatic use check karega
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

    const prompt = `You are an expert cold outreach specialist for agencies. Write a highly personalized, casual, and direct cold DM based on the following details. Do NOT use corporate jargon, fake enthusiasm, or robotic structures. Keep it under 3-4 sentences, completely conversational, making it look like a human typed it.

My Agency Offer/Service: ${offer}
Prospect (Client) Bio/Info: ${clientBio}

Output only the generated DM message, nothing else.`;

    // Gemini 2.5 Flash model call
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    const generatedText = response.text;

    return NextResponse.json({ text: generatedText });
  } catch (error) {
    console.error("Gemini Error:", error);
    return NextResponse.json(
      { error: "Gemini Error: " + error.message },
      { status: 500 }
    );
  }
}