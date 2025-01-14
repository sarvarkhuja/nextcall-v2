"use client";

import * as React from "react";

import {
    Table,
    TableBody,
    TableCell,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { format } from "date-fns";
import { useRouter } from "@tanstack/react-router";
import { AxiosResponse } from "axios";
import { useEffect } from "react";
import axiosInstance from "@/lib/axiosInstance";

type Call = {
    id: string;
    customer: { number: string };
    status: string;
    cost: number;
    endedReason: string;
    createdAt: Date | string;
};



const CallTable = () => {
    const router = useRouter();
    const [calls, setCalls] = React.useState<Call[]>([]);
    const getCalls = async () => {
        const response: AxiosResponse<Call[]> = await axiosInstance.get('/call');
        setCalls(response.data);
    }

    useEffect(() => {
        getCalls();
    }, []);

    const handleRowClick = (callId: string) => {
        router.navigate({
            to: "/calls/$callId",
            params: {
                callId: callId,
            },
        })
    };

    return (
        <div className="p-4 space-y-4">

            <Table className="border">
                <TableHeader>
                    <TableRow>
                        <TableCell className="font-semibold">Date/Time</TableCell>
                        <TableCell className="font-semibold">Customer Number</TableCell>
                        <TableCell className="font-semibold">Status</TableCell>
                        <TableCell className="font-semibold">Cost (USD)</TableCell>
                        <TableCell className="font-semibold">Ended Reason</TableCell>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {calls.map((call) => (
                        <TableRow
                            key={call.id}
                            onClick={() => handleRowClick(call.id)}
                            className="cursor-pointer hover:bg-muted/50"
                        >
                            <TableCell>{format(new Date(call.createdAt), 'dd.MM.yyyy HH:mm')}</TableCell>
                            <TableCell>{call.customer?.number ?? 'Web Call'}</TableCell>
                            <TableCell>{call.status}</TableCell>
                            <TableCell>{call.cost.toFixed(2)}</TableCell>
                            <TableCell>{call.endedReason}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default CallTable;
