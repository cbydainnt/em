import { Card, CardContent } from "@mui/material";

interface DocumentViewerProps {
  fileUrl: string | null;
  fileName?: string;
}

export const DocumentViewer = ({ fileUrl, fileName }: DocumentViewerProps) => {
  if (!fileUrl) return null;

  const isPDF = fileUrl.toLowerCase().endsWith(".pdf");
  const isImage =
    fileUrl.match(/\.(jpg|jpeg|png|gif|webp)$/i) !== null;

  return (
    <Card className="mt-4 shadow-sm rounded-xl">
      <CardContent className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">
          Đang xem: {fileName}
        </h3>

        <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden h-[70vh] bg-gray-100 dark:bg-gray-900">
          {isPDF ? (
            <iframe
              src={fileUrl}
              className="w-full h-full"
              title={fileName}
            />
          ) : isImage ? (
            <img
              src={fileUrl}
              alt={fileName}
              className="w-full h-full object-contain"
            />
          ) : (
            <p className="text-gray-600 dark:text-gray-400 p-4">
              Không hỗ trợ định dạng này. Hãy tải về để xem.
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};