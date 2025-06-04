import { Star, Download, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

export const ExtensionCard = ({ extension }) => {
  const handleDownload = () => {
    window.location.href = `https://chromewebstore.google.com/detail/${extension.crx_id}`;
  };

  return (
    <div className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
      <div className="p-4">
        <div className="flex items-start gap-4">
          <img 
            src={`https://nocode.meituan.com/photo/search?keyword=${encodeURIComponent(extension.crx_name)}&width=400&height=300`}
            alt={extension.crx_name}
            className="w-16 h-16 rounded-md object-cover"
          />
          <div className="flex-1">
            <div className="flex justify-between items-start">
              <h3 className="font-semibold text-lg">{extension.crx_name}</h3>
            </div>
            <p 
              className="text-sm text-gray-600 mt-1 line-clamp-2" 
              title={extension.crx_description} // 添加 title 属性
            >
              {extension.crx_description}
            </p>
            <div className="flex justify-between items-center mt-3">
              <span className="text-xs text-gray-500">ID: {extension.crx_id}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-gray-50 px-4 py-3 border-t">
        <Button size="sm" className="w-full" onClick={handleDownload}>
          <Download className="mr-2 h-4 w-4" />
          添加到Chrome
        </Button>
      </div>
    </div>
  );
};
