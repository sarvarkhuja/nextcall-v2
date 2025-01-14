"use client";

import * as React from "react";
import {
    Tabs,
    TabsList,
    TabsTrigger,
    TabsContent,
} from "@/components/ui/tabs"; // Adjust import path to your shadcn tabs
import { Button } from "@/components/ui/button";
import { Play, Pause, Phone, Mic2, FileText, Info, Activity } from "lucide-react";
import { Fragment, useEffect } from "react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { AxiosResponse } from "axios";
import axiosInstance from "@/lib/axiosInstance";
import { Call, Message2 } from "../types/call.type";



export default function PhoneHistoryDetailPage({
    phoneId,
}: {
    phoneId: string;
}) {
    // We’ll keep some local state for audio playback
    const audioRef = React.useRef<HTMLAudioElement | null>(null);
    const [isPlaying, setIsPlaying] = React.useState(false);
    const [callDetail, setCalls] = React.useState<Call | null>(null);
    const fetchCallDetail = async () => {
        const response: AxiosResponse<Call> = await axiosInstance.get(`/call/${phoneId}`);
        setCalls(response.data);
    }

    useEffect(() => {
        fetchCallDetail();
    }, []);

    // Toggle audio play/pause
    const handlePlayPause = () => {
        if (!audioRef.current) return;
        if (isPlaying) {
            audioRef.current.pause();
            setIsPlaying(false);
        } else {
            audioRef.current.play();
            setIsPlaying(true);
        }
    };

    // Whenever audio ends, reset
    const handleEnded = () => {
        setIsPlaying(false);
    };

    // Extract data from phoneHistoryData
    const {
        id,
        assistantId,
        phoneNumberId,
        type,
        startedAt,
        endedAt,
        recordingUrl,
        stereoRecordingUrl,
        summary,
        cost,
        costBreakdown,
        customer,
        status,
        endedReason,
        messages,
        analysis,
    } = callDetail || {};

    return (
        <div className="p-4 space-y-4">
            <h1 className="text-2xl font-bold flex items-center space-x-2">
                <Phone className="w-6 h-6" />
                <span>Phone History Detail</span>
            </h1>

            <Tabs defaultValue="overview" className="mt-4">
                <TabsList>
                    <TabsTrigger value="overview">
                        <Info className="mr-2 w-4 h-4" />
                        Overview
                    </TabsTrigger>
                    <TabsTrigger value="transcript">
                        <FileText className="mr-2 w-4 h-4" />
                        Transcript
                    </TabsTrigger>
                    <TabsTrigger value="recording">
                        <Mic2 className="mr-2 w-4 h-4" />
                        Recording
                    </TabsTrigger>
                    <TabsTrigger value="analysis">
                        <Activity className="mr-2 w-4 h-4" />
                        Analysis
                    </TabsTrigger>
                </TabsList>

                {/* ========== OVERVIEW TAB ========== */}
                <TabsContent value="overview" className="mt-4">
                    <div className="space-y-2">
                        <h2 className="text-lg font-semibold">General Info</h2>
                        <div className="text-sm">
                            <p>
                                <strong>ID:</strong> {id}
                            </p>
                            <p>
                                <strong>Assistant ID:</strong> {assistantId}
                            </p>
                            <p>
                                <strong>Phone Number ID:</strong> {phoneNumberId}
                            </p>
                            <p>
                                <strong>Customer Phone:</strong> {customer?.number}
                            </p>
                            <p>
                                <strong>Type:</strong> {type}
                            </p>
                            <p>
                                <strong>Started At:</strong>{" "}
                                {startedAt ? new Date(startedAt).toLocaleString() : '-'}
                            </p>
                            <p>
                                <strong>Ended At:</strong> {endedAt ? new Date(endedAt).toLocaleString() : '-'}
                            </p>
                            <p>
                                <strong>Status:</strong> {status}
                            </p>
                            <p>
                                <strong>Ended Reason:</strong> {endedReason}
                            </p>
                            <p>
                                <strong>Cost:</strong> {cost}
                            </p>
                        </div>
                    </div>
                </TabsContent>

                {/* ========== TRANSCRIPT TAB ========== */}
                <TabsContent value="transcript" className="mt-4">
                    <div className="flex gap-5">
                        <div className="w-1/2">
                            <h2 className="text-lg font-semibold">Transcript</h2>
                            <pre className="whitespace-pre-wrap text-sm p-2 rounded h-[80vh] overflow-y-scroll">
                                {messages && messages[0].message}
                            </pre>
                        </div>
                        <div className="w-1/2">
                            <h2 className="text-lg font-semibold mt-4">Messages Timeline</h2>
                            <div className="space-y-2 text-sm">
                                <div className='flex flex-1 flex-col h-[80vh] overflow-y-scroll gap-2 rounded-md px-4 pb-4 pt-0'>
                                    <div className='flex size-full flex-1 '>
                                        <div className='chat-text-container relative -mr-4 flex flex-1 flex-col overflow-y-hidden'>
                                            <div className='chat-flex flex h-40 w-full flex-grow flex-col-reverse justify-start gap-4 overflow-y-auto py-2 pb-4 pr-4'>
                                                {messages &&
                                                    messages.slice(1).sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime()).map((msg: Message2, index: number) => (
                                                        <Fragment key={`${msg.role}-${msg.time}-${index}`}>
                                                            <div
                                                                className={cn(
                                                                    'chat-box max-w-72 break-words px-3 py-2 shadow-lg',
                                                                    msg.role === 'user'
                                                                        ? 'self-end rounded-[16px_16px_0_16px] bg-primary/85 text-primary-foreground/75'
                                                                        : 'self-start rounded-[16px_16px_16px_0] bg-secondary'
                                                                )}
                                                            >
                                                                {msg.message}{' '}
                                                                <span
                                                                    className={cn(
                                                                        'mt-1 block text-xs font-light italic text-muted-foreground',
                                                                        msg.role === 'user' && 'text-right'
                                                                    )}
                                                                >
                                                                    {format(msg.time, 'h:mm a')}
                                                                </span>
                                                            </div>
                                                        </Fragment>
                                                    ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </TabsContent>

                {/* ========== RECORDING TAB ========== */}
                <TabsContent value="recording" className="mt-4">
                    <div className="space-y-2">
                        <h2 className="text-lg font-semibold">Call Recording</h2>
                        <p className="text-sm">
                            {recordingUrl ? (
                                <>
                                    <audio
                                        ref={audioRef}
                                        src={recordingUrl}
                                        onEnded={handleEnded}
                                    />
                                    <Button onClick={handlePlayPause} variant="default" size="sm">
                                        {isPlaying ? (
                                            <>
                                                <Pause className="mr-2 w-4 h-4" />
                                                Pause
                                            </>
                                        ) : (
                                            <>
                                                <Play className="mr-2 w-4 h-4" />
                                                Play
                                            </>
                                        )}
                                    </Button>
                                </>
                            ) : (
                                <span>No mono recording URL</span>
                            )}
                        </p>
                        <p className="text-sm">
                            {stereoRecordingUrl ? (
                                <span>Also available in stereo: {stereoRecordingUrl}</span>
                            ) : (
                                <span>No stereo recording URL</span>
                            )}
                        </p>
                    </div>
                </TabsContent>

                {/* ========== ANALYSIS TAB ========== */}
                <TabsContent value="analysis" className="mt-4 space-y-4">
                    <div>
                        <h2 className="text-lg font-semibold">Summary</h2>
                        <p className="text-sm  p-2 rounded">{summary}</p>
                    </div>

                    <div>
                        <h2 className="text-lg font-semibold">Success Evaluation</h2>
                        <p className="text-sm">
                            {analysis?.successEvaluation
                                ? analysis.successEvaluation
                                : "No success evaluation info"}
                        </p>
                        <h2 className="text-lg font-semibold">Output</h2>
                        <div className="text-sm">
                            {analysis?.structuredData ? (
                                <div className="space-y-6">
                                    {/* Program and University Section */}
                                    <div className="flex gap-4">
                                        <div className="flex-1 p-4 rounded-lg bg-secondary/50">
                                            <h3 className="font-semibold text-primary mb-1">Program</h3>
                                            <p>{analysis.structuredData.program}</p>
                                        </div>
                                        <div className="flex-1 p-4 rounded-lg bg-secondary/50">
                                            <h3 className="font-semibold text-primary mb-1">University</h3>
                                            <p>{analysis.structuredData.university}</p>
                                        </div>
                                    </div>

                                    {/* Student Details Section */}
                                    <div className="p-4 rounded-lg bg-secondary/50">
                                        <h3 className="font-semibold text-primary mb-3">Student Information</h3>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <p className="text-muted-foreground">Full Name</p>
                                                <p className="font-medium">
                                                    {analysis.structuredData.student.firstName} {analysis.structuredData.student.lastName}
                                                </p>
                                            </div>
                                            <div>
                                                <p className="text-muted-foreground">Date of Birth</p>
                                                <p className="font-medium">{analysis.structuredData.student.dateOfBirth}</p>
                                            </div>
                                            <div>
                                                <p className="text-muted-foreground">Email</p>
                                                <p className="font-medium">{analysis.structuredData.student.email}</p>
                                            </div>
                                            <div>
                                                <p className="text-muted-foreground">Phone</p>
                                                <p className="font-medium">{analysis.structuredData.student.phone}</p>
                                            </div>
                                            <div>
                                                <p className="text-muted-foreground">Nationality</p>
                                                <p className="font-medium">{analysis.structuredData.student.nationality}</p>
                                            </div>
                                            <div>
                                                <p className="text-muted-foreground">Gender</p>
                                                <p className="font-medium">{analysis.structuredData.student.gender}</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Address Section */}
                                    <div className="p-4 rounded-lg bg-secondary/50">
                                        <h3 className="font-semibold text-primary mb-3">Address</h3>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <p className="text-muted-foreground">Street</p>
                                                <p className="font-medium">{analysis.structuredData.student.address.street}</p>
                                            </div>
                                            <div>
                                                <p className="text-muted-foreground">City</p>
                                                <p className="font-medium">{analysis.structuredData.student.address.city}</p>
                                            </div>
                                            <div>
                                                <p className="text-muted-foreground">State</p>
                                                <p className="font-medium">{analysis.structuredData.student.address.state}</p>
                                            </div>
                                            <div>
                                                <p className="text-muted-foreground">Zip Code</p>
                                                <p className="font-medium">{analysis.structuredData.student.address.zipCode}</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Admission Details Section */}
                                    <div className="p-4 rounded-lg bg-secondary/50">
                                        <h3 className="font-semibold text-primary mb-3">Admission Details</h3>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <p className="text-muted-foreground">Status</p>
                                                <p className="font-medium capitalize">{analysis.structuredData.student.admissionDetails.status}</p>
                                            </div>
                                            <div>
                                                <p className="text-muted-foreground">Admission Date</p>
                                                <p className="font-medium">{analysis.structuredData.student.admissionDetails.admissionDate}</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Documents Section */}
                                    <div className="p-4 rounded-lg bg-secondary/50">
                                        <h3 className="font-semibold text-primary mb-3">Documents Submitted</h3>
                                        <div className="flex gap-2 flex-wrap">
                                            {analysis.structuredData.student.documentsSubmitted.map((doc: string) => (
                                                <span key={doc} className="px-3 py-1 rounded-full bg-primary/10 text-primary">
                                                    {doc}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Modified Date */}
                                    <div className="text-xs text-muted-foreground">
                                        Last modified: {new Date(analysis.structuredData.modifiedDate).toLocaleString()}
                                    </div>
                                </div>
                            ) : (
                                "No output info"
                            )}
                        </div>
                    </div>

                    <div>
                        <h2 className="text-lg font-semibold">Cost Breakdown</h2>
                        {costBreakdown ? (
                            <ul className="list-disc list-inside text-sm">
                                <li>STT: {costBreakdown.stt}</li>
                                <li>LLM: {costBreakdown.llm}</li>
                                <li>TTS: {costBreakdown.tts}</li>
                                <li>VAPI: {costBreakdown.vapi}</li>
                                <li>Total: {costBreakdown.total}</li>
                            </ul>
                        ) : (
                            <p className="text-sm">No cost breakdown available</p>
                        )}
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
}
