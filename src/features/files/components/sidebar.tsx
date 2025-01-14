import { ScrollArea } from "@/components/ui/scroll-area";
import { FileItem } from "../types/file.type";

interface FileSidebarProps {
  files: FileItem[];
  selectedFileId: string;
  onSelectFile: (id: string) => void;
}

export function FileSidebar({
  files,
  selectedFileId,
  onSelectFile,
}: FileSidebarProps) {
  return (
    <aside className="w-64 border-r">
      <ScrollArea className="h-full p-2">
        {files.map((file) => {
          const isActive = file.id === selectedFileId;
          return (
            <div
              key={file.id}
              onClick={() => onSelectFile(file.id)}
              className={`cursor-pointer rounded px-3 py-2 text-sm
                ${isActive ? "bg-muted" : "hover:bg-accent/30"}`}
            >
              {file.name}
            </div>
          );
        })}
      </ScrollArea>
    </aside>
  );
}
