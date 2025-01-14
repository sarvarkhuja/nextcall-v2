
export interface FormValues {
    summary: {
      prompt: string
      timeout: number
    }
    evaluation: {
      prompt: string
      rubric: string
      timeout: number
    }
    structuredData: {
      prompt: string
      timeout: number
      properties: {
        name: string
        type: string
        required: boolean
      }[]
    }
  }
  