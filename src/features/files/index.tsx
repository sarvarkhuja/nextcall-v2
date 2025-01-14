"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { PlusIcon } from "@radix-ui/react-icons";

import UploadFile from "./components/upload-file";
import { FileSidebar } from "./components/sidebar";
import { FileDetails } from "./components/file-detail";

import { toast } from "@/hooks/use-toast";
import { FileItem } from "./types/file.type";
import axiosInstance from "@/lib/axiosInstance";

export default function FilesPage() {
    const [files, setFiles] = React.useState<FileItem[]>([]);
    const [selectedFileId, setSelectedFileId] = React.useState<string | undefined>();

    /**
     * Fetch files from API on mount
     */
    React.useEffect(() => {
        fetchFiles();
    }, []);

    async function fetchFiles() {
        try {
            console.log("fetchFiles called at:", new Date().toISOString());
            const { data } = await axiosInstance.get("/file");
            console.log("Response data:", data);
            setFiles(data);
        } catch (err) {
            console.error("Error fetching files:", err);
        }
    }

    /**
     * If we have files but no selected file yet,
     * automatically select the first file.
     */
    React.useEffect(() => {
        if (files.length > 0 && !selectedFileId) {
            setSelectedFileId(files[0].id);
        }
    }, [files, selectedFileId]);

    /**
     * Memoize the currently selected file.
     */
    const selectedFile = React.useMemo<FileItem | undefined>(() => {
        return files.find((file) => file.id === selectedFileId);
    }, [selectedFileId, files]);

    /**
     * Download handler
     */
    function handleDownload(url: string) {
        window.open(url, "_blank");
    }

    /**
     * Copy URL handler
     */
    function handleCopyUrl(url: string) {
        navigator.clipboard.writeText(url);
        toast({
            title: "URL copied to clipboard!",
            description: "You can now paste it anywhere.",
        });
    }

    /**
     * Delete handler (placeholder)
     */
    function handleDelete() {
        alert("Delete not implemented yet");
    }

    return (
        <div className="flex h-full w-full overflow-hidden border rounded">
            {/* Left sidebar */}
            <div className="w-64 border-r">
                <div className="p-2 w-full">
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button className="w-full">
                                <PlusIcon className="w-4 h-4 mr-2" />
                                Upload Files
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                                <DialogTitle>Upload Files</DialogTitle>
                            </DialogHeader>
                            <UploadFile />
                        </DialogContent>
                    </Dialog>
                </div>

                <FileSidebar
                    files={files}
                    selectedFileId={selectedFileId || ''}
                    onSelectFile={(id) => setSelectedFileId(id)}
                />
            </div>

            {/* Right details panel */}
            <div className="flex-1">
                {selectedFile ? (
                    <FileDetails
                        file={selectedFile}
                        onDownload={() => handleDownload(selectedFile.url)}
                        onCopyUrl={() => handleCopyUrl(selectedFile.url)}
                        onDelete={handleDelete}
                    />
                ) : (
                    <div className="p-4">No file selected</div>
                )}
            </div>
        </div>
    );
}
