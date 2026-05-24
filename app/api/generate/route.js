import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(req) {
  try {
    const body = await req.json().catch(() => null);
    
    if (!body || !body.offer || !body.clientBio) {
      return NextResponse.json(
        { error: "Missing required fields: offer or clientBio" },
        { status: 400 }
      );
    }

    const { offer, clientBio } = body;

    // 👇 Harsh bhai, maine double quotes strictly string format mein daal diye hain, isme koi error nahi aa sakti
    const apiKey = String("AIzaSyBZn210mwMbApLLOnG1Zmr32LKzbo3").trim();

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `Write a short conversational cold DM under 3-4 sentences.
    My Offer: ${offer}
    Client Bio: ${clientBio}
    Output only the message, nothing else.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const generatedText = response.text();

    return NextResponse.json({ text: generatedText }, { status: 200 });

  } catch (error) {
    return NextResponse.json(
      { text: `System Error: ${error.message || "Unknown Runtime Issue"}` },
      { status: 200 }
    );
  }
}