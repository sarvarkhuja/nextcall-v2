import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { FileItem } from "../types/file.type";
import pdfIcon from '@/assets/pdf.svg';

interface FileDetailsProps {
    file: FileItem;
    onDownload: () => void;
    onCopyUrl: () => void;
    onDelete: () => void;
}

export function FileDetails({ file, onDownload, onCopyUrl, onDelete }: FileDetailsProps) {
    return (
        <Card className="m-4">
            <CardHeader>
                <div className="flex items-center gap-2">
                    <img src={pdfIcon} alt="PDF Icon" className="w-16 h-16" />
                    <div className="flex flex-col">
                        <CardTitle>{file.name}</CardTitle>
                        <CardDescription>{file.purpose}</CardDescription>
                        <div className="text-sm text-muted-foreground">
                            {file.mimetype} — {(Number(file.bytes) / 1024).toFixed(2)} KB
                        </div>
                    </div>
                </div>

            </CardHeader>
            <Separator />
            <CardContent className="space-y-2">
                <p>
                    <strong>ID:</strong> {file.id}
                </p>
                <p>
                    <strong>Created At:</strong>{" "}
                    {new Date(file.createdAt).toLocaleString()}
                </p>
                <p>
                    <strong>Status:</strong> {file.status}
                </p>
            </CardContent>
            <CardFooter className="space-x-2">
                <Button onClick={onDownload}>Download</Button>
                <Button variant="outline" onClick={onCopyUrl}>
                    Copy URL
                </Button>
                <Button variant="destructive" onClick={onDelete}>
                    Delete
                </Button>
            </CardFooter>
        </Card>
    );
}
