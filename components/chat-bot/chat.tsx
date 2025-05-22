"use client"
import { useChat } from "@ai-sdk/react"
import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Send } from "lucide-react"
import { cn } from "@/lib/utils"
import { ChatMessage } from "./chat-message"

export function Chat() {
  const { messages, input, handleInputChange, handleSubmit, isLoading, error } = useChat({
    api: "/api/chat",
    initialMessages: [
      {
        id: "welcome-message",
        role: "assistant",
        content: "Hello! How can I assist you today with our products and services?",
      },
    ],
  })

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // Handle errors
  useEffect(() => {
    if (error) {
      setErrorMessage("I'm sorry, I'm having trouble right now—please try again in a moment.")
      setTimeout(() => setErrorMessage(null), 5000)
    }
  }, [error])

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-4">
        {messages.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))}
        {errorMessage && <div className="p-3 my-2 bg-destructive/10 text-destructive rounded-lg">{errorMessage}</div>}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSubmit} className={cn("border-t p-4", isLoading && "opacity-50 pointer-events-none")}>
        <div className="flex gap-2">
          <Input
            value={input}
            onChange={handleInputChange}
            placeholder="Type your message..."
            className="flex-1"
            disabled={isLoading}
          />
          <Button type="submit" size="icon" disabled={isLoading}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
        {isLoading && <p className="text-xs text-muted-foreground mt-2">DeepSeek R1 is thinking...</p>}
      </form>
    </div>
  )
}
