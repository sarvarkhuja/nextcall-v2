export interface Call {
	id: string;
	assistantId: string;
	phoneNumberId: string;
	type: string;
	startedAt: string;
	endedAt: string;
	transcript: string;
	recordingUrl: string;
	summary: string;
	createdAt: string;
	updatedAt: string;
	orgId: string;
	cost: number;
	customer: Customer;
	status: string;
	endedReason: string;
	messages: Message[];
	stereoRecordingUrl: string;
	costBreakdown: CostBreakdown;
	phoneCallProvider: string;
	phoneCallProviderId: string;
	phoneCallTransport: string;
	analysis: Analysis;
	artifact: Artifact;
	costs: Cost[];
	monitor: Monitor;
	transport: Transport;
}

export interface Customer {
	number: string;
}

export interface Message {
	role: string;
	time: number;
	message: string;
	secondsFromStart: number;
	source?: string;
	endTime?: number;
	duration?: number;
}

export interface CostBreakdown {
	stt: number;
	llm: number;
	tts: number;
	vapi: number;
	total: number;
	llmPromptTokens: number;
	llmCompletionTokens: number;
	ttsCharacters: number;
	analysisCostBreakdown: AnalysisCostBreakdown;
}

export interface AnalysisCostBreakdown {
	summary: number;
	structuredData: number;
	successEvaluation: number;
	summaryPromptTokens: number;
	summaryCompletionTokens: number;
	structuredDataPromptTokens: number;
	successEvaluationPromptTokens: number;
	structuredDataCompletionTokens: number;
	successEvaluationCompletionTokens: number;
}

export interface Analysis {
	structuredData: StructuredData;
	summary: string;
	successEvaluation: string;
}
export interface Student {
	id: string;
	email: string;
	phone: string;
	gender: string;
	address: Address;
	lastName: string;
	firstName: string;
	dateOfBirth: string;
	nationality: string;
	admissionDetails: AdmissionDetails;
	documentsSubmitted: string[];
}
export interface Address {
	city: string;
	state: string;
	street: string;
	zipCode: string;
}

export interface AdmissionDetails {
	status: string;
	program: string;
	admissionDate: string;
}

export interface StructuredData {
	program: string;
	student: Student;
	university: string;
	modifiedDate: string;
}

export interface Artifact {
	recordingUrl: string;
	stereoRecordingUrl: string;
	messages: Message2[];
	messagesOpenAIFormatted: MessagesOpenAiformatted[];
	transcript: string;
}

export interface Message2 {
	role: string;
	time: number;
	message: string;
	secondsFromStart: number;
	source?: string;
	endTime?: number;
	duration?: number;
}

export interface MessagesOpenAiformatted {
	content: string;
	role: string;
}

export interface Cost {
	cost: number;
	type: string;
	minutes?: number;
	transcriber?: Transcriber;
	model?: Model;
	promptTokens?: number;
	completionTokens?: number;
	voice?: Voice;
	characters?: number;
	subType?: string;
	analysisType?: string;
}

export interface Transcriber {
	model: string;
	provider: string;
}

export interface Model {
	model: string;
	provider: string;
}

export interface Voice {
	voiceId: string;
	provider: string;
}

export interface Monitor {
	listenUrl: string;
	controlUrl: string;
}

export interface Transport {}
