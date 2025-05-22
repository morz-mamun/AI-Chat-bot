import type { Message } from "ai"
import { cn } from "@/lib/utils"
import { Bot, User } from "lucide-react"

interface ChatMessageProps {
  message: Message
}

export function ChatMessage({ message }: ChatMessageProps) {
  return (
    <div
      className={cn(
        "flex gap-3 mb-4 p-3 rounded-lg max-w-[85%]",
        message.role === "user" ? "bg-primary text-primary-foreground ml-auto" : "bg-muted mr-auto",
      )}
    >
      {message.role === "assistant" && (
        <div className="flex-shrink-0 mt-1">
          <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
            <Bot className="h-3 w-3" />
          </div>
        </div>
      )}
      <div className="flex-1">
        <div className="text-sm whitespace-pre-wrap">{message.content}</div>
      </div>
      {message.role === "user" && (
        <div className="flex-shrink-0 mt-1">
          <div className="w-6 h-6 rounded-full bg-primary-foreground/20 flex items-center justify-center">
            <User className="h-3 w-3" />
          </div>
        </div>
      )}
    </div>
  )
}
