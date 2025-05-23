import { getProductInfo } from "@/constants/chat-bot/product-data";
import { google } from "@ai-sdk/google";
import { streamText } from "ai";
import { NextResponse } from "next/server";

// Maximum number of previous messages to include
const MAX_CONTEXT_TURNS = 4;

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    // console.log("user messages:", messages);

    // Get only the last MAX_CONTEXT_TURNS of conversation
    const recentMessages = messages.slice(-MAX_CONTEXT_TURNS * 2);

    // Check if we need to query our knowledge base
    const userQuestion = messages[messages.length - 1].content;
    const relevantInfo = getProductInfo(userQuestion);

    // Prepare system prompt with instructions
    let systemPrompt = `You are a helpful AI assistant for a personal portfolio website.
Your primary goal is to answer questions about the developer’s background, skills, projects, and services in a friendly and informative tone.
However, if the user asks a general question (like about sports, weather, etc.), still answer it accurately and politely.

After answering unrelated questions, add this note:
"💡 By the way, feel free to ask me about my projects, skills, or services too!"

If the question is unclear, politely ask for clarification.
Keep answers short and under 200 tokens.`;

    // Add relevant product info if available
    if (relevantInfo.length > 0) {
      systemPrompt += `\n\nReference information about our products:\n${relevantInfo.join(
        "\n"
      )}`;
    }

    // Generate streaming response using AI SDK with Google Gemini
    const result = streamText({
      model: google("gemini-2.0-flash"),
      system: systemPrompt,
      messages: recentMessages,
      temperature: 0.7,
      maxTokens: 200,
    });

    console.log('Streaming response initiated');
    
    // Return the streaming response
    return result.toDataStreamResponse();
    
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      {
        error:
          "I'm sorry, I'm having trouble right now—please try again in a moment.",
      },
      { status: 500 }
    );
  }
}