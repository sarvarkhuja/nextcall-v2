"use client"

import { useEffect, useState } from "react"
import { Assistant } from "../types/assistant"
import { AssistantDetail } from "./assistant-detail"
import { AssistantSidebar } from "./assistant-sidebar"
import axiosInstance from "@/lib/axiosInstance"
import { AxiosResponse } from "axios"

export default function AssistantsPage() {
  const [selectedAssistant, setSelectedAssistant] = useState<Assistant>()
  const [assistants, setAssistants] = useState<Assistant[]>([])
 const fetchAssistants = async () => {
  const response: AxiosResponse<Assistant[]> = await axiosInstance.get(`/assistant`);
  setAssistants(response.data)
  setSelectedAssistant(response.data[0])
 }
 useEffect(() => {
  fetchAssistants();
 }, []);
  return (
    <div className="h-screen flex">
      <AssistantSidebar
        assistants={assistants}
        selectedId={selectedAssistant?.id}
        onSelect={setSelectedAssistant}
      />
      <AssistantDetail assistant={selectedAssistant} />
    </div>
  )
}

