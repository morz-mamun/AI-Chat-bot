"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet"
import { MessageCircle } from "lucide-react"

import { cn } from "@/lib/utils"
import { Chat } from "./chat"

export function ChatButton() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        size="lg"
        className={cn(
          "fixed bottom-4 right-4 rounded-full shadow-lg z-50 p-4 h-14 w-14",
          "flex items-center justify-center",
          "transition-all duration-300 hover:scale-105",
          isOpen ? "opacity-0 pointer-events-none" : "opacity-100",
        )}
      >
        <MessageCircle className="h-6 w-6" />
      </Button>

      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetContent className="p-0 sm:max-w-[400px] w-full">
            <SheetTitle />
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between p-4 border-b">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                  <MessageCircle className="h-5 w-5" />
                </div>
                <h3 className="font-semibold">Customer Support</h3>
              </div>
              {/* <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                <X className="h-4 w-4" />
              </Button> */}
            </div>
            <div className="flex-1 overflow-hidden">
              <Chat />
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  )
}
