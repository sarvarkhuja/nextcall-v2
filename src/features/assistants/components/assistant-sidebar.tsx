"use client"

import { Info } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { CreateAssistantDialog } from "./create-assistant-dialog"
import type { Assistant } from "../types/assistant"

interface AssistantSidebarProps {
  assistants: Assistant[]
  selectedId: string | undefined
  onSelect: (assistant: Assistant) => void
}

export function AssistantSidebar({ assistants, selectedId, onSelect }: AssistantSidebarProps) {
  return (
    <div className="w-64 border-r bg-muted/10">
      <div className="p-4 flex gap-2">
        <CreateAssistantDialog />
        <Button variant="outline" size="icon">
          <Info className="h-4 w-4" />
        </Button>
      </div>
      <div className="space-y-1 p-2">
        {assistants.map((assistant) => (
          <div
            key={assistant.id}
            className={`flex items-center gap-2 p-2 rounded-md cursor-pointer hover:bg-accent/50 ${
              assistant.id === selectedId ? 'bg-accent' : ''
            }`}
            onClick={() => onSelect(assistant)}
          >
            <div className="flex-1 min-w-0">
              <div className="font-medium truncate">{assistant.name}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

