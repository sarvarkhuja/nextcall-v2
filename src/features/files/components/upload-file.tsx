import React, { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { ToastProvider } from '@/components/ui/toast';
import pdfIcon from '@/assets/pdf.svg';
interface FileWithPreview extends File {
    preview: string;
}

export default function UploadFile() {
    const [files, setFiles] = useState<FileWithPreview[]>([]);
    const [isUploading, setIsUploading] = useState(false); // State to handle upload status
    const { toast } = useToast(); // ShadCN Toast hook

    const { getRootProps, getInputProps } = useDropzone({
        accept: {
            'image/*': [],
            'application/pdf': [] // Accept PDFs
        },
        onDrop: (acceptedFiles: File[]) => {
            setFiles(acceptedFiles.map(file => Object.assign(file, {
                preview: file.type === 'application/pdf'
                    ? '/pdf-icon.png' // Placeholder for PDF preview (use a real PDF icon path)
                    : URL.createObjectURL(file)
            })));
        }
    });

    const uploadFile = async (file: File) => {
        const formData = new FormData();
        formData.append('file', file);

        try {
            setIsUploading(true);
            const response = await fetch("https://api.vapi.ai/file", {
                method: "POST",
                headers: {
                    "Authorization": "Bearer 021a13d6-f9ea-496a-8841-03263d341575"
                },
                body: formData
            });

            const body = await response.json();
            console.log(body);

            // Show success toast
            toast({
                title: "Upload Successful",
                description: "Your file has been uploaded successfully!",
                variant: "default", // Adjust variant based on your theme
            });
        } catch (error) {
            console.error("Error uploading file:", error);

            // Show error toast
            toast({
                title: "Upload Failed",
                description: "There was an error uploading your file. Please try again.",
                variant: "destructive", // Using correct variant from theme
            });
        } finally {
            setIsUploading(false);
        }
    };

    const handleUpload = () => {
        if (files.length === 0) {
            alert("Please select a file to upload.");
            return;
        }

        uploadFile(files[0]); // Upload the first file in the array
    };

    const thumbs = files.map((file: { name: string, preview: string, type: string }) => (
        <div className="inline-flex rounded border border-border mb-2 mr-2 w-full p-1 box-border" key={file.name}>
            <div className="flex min-w-0 overflow-hidden">
                {file.type === 'application/pdf' ? (
                    <div className="flex gap-3">
                        <img
                            src={pdfIcon}
                            className="block w-auto h-full"
                            alt="PDF Preview"
                        />
                        <p className="text-sm text-muted-foreground">
                            {file.name}
                        </p></div>


                ) : (
                    <img
                        src={file.preview}
                        className="block w-auto h-full"
                        onLoad={() => { URL.revokeObjectURL(file.preview) }}
                        alt={file.name}
                    />
                )}
            </div>
        </div>
    ));

    useEffect(() => {
        return () => files.forEach(file => URL.revokeObjectURL(file.preview));
    }, [files]);

    return (
        <>
            <ToastProvider> {/* Wrap your component in the ToastProvider */}
                <section>
                    <div {...getRootProps({ className: cn('dropzone', 'border-2 border-dashed border-border rounded-lg p-4 text-center cursor-pointer') })}>
                        <input {...getInputProps()} />
                        <p>Drag and drop files here (images or PDFs)</p>
                    </div>

                    <aside className="flex flex-row flex-wrap mt-4">
                        {thumbs}
                    </aside>

                    <div className="mt-4">
                        <Button type="button" className="text-center w-full" onClick={handleUpload} disabled={isUploading}>
                            {isUploading ? "Uploading..." : "Upload"}
                        </Button>
                    </div>
                </section>
            </ToastProvider>
        </>
    );
}
