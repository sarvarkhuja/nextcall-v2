export interface Assistant {
    analysisPlan: AnalysisPlan
    latency: string
    cost: string
    id: string
    orgId: string
    name: string
    voice: Voice
    createdAt: string
    updatedAt: string
    model: Model
    recordingEnabled: boolean
    firstMessage: string
    voicemailMessage: string
    endCallMessage: string
    transcriber: Transcriber
    clientMessages: string[]
    serverMessages: string[]
    endCallPhrases: string[]
    backchannelingEnabled: boolean
    backgroundDenoisingEnabled: boolean
    isServerUrlSecretSet: boolean
  }
  export interface AnalysisPlan {
    summaryPrompt: string
    successEvaluationPrompt: string
    successEvaluationRubric: string
  }
  export interface Voice {
    speed: number
    voiceId: string
    provider: string
    fillerInjectionEnabled: boolean
  }
  
  export interface Model {
    model: string
    messages: Message[]
    provider: string
    temperature: number
    knowledgeBase?: KnowledgeBase
    maxTokens?: number
    emotionRecognitionEnabled?: boolean
  }
  
  export interface Message {
    role: string
    content: string
  }
  export interface Transcriber {
    model: string
    language: string
    provider: string
  }
  export interface KnowledgeBase {
    topK: number
    fileIds: string[]
    provider: string
  }