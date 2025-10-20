import { useState, useEffect, useRef } from "react";
import { Upload, Sparkles, Download, Share2, Video, X, Facebook } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface UploadedImage {
  id: string;
  file: File;
  preview: string;
  processed?: string;
}

const AIStyleTransfer = () => {
  const [language, setLanguage] = useState<"EN" | "VI">("EN");
  const [images, setImages] = useState<UploadedImage[]>([]);
  const [prompt, setPrompt] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") as "EN" | "VI" | null;
    if (savedLanguage) setLanguage(savedLanguage);

    const savedImages = localStorage.getItem("uploadedImages");
    if (savedImages) {
      // Note: We can't restore File objects from localStorage, only metadata
      console.log("Restored image metadata from localStorage");
    }

    const handleStorageChange = () => {
      const newLanguage = localStorage.getItem("language") as "EN" | "VI" | null;
      if (newLanguage) setLanguage(newLanguage);
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const translations = {
    EN: {
      title: "AI Style Transfer",
      subtitle: "Transform your images with AI-powered artistic styles",
      uploadArea: "Drag and drop images here, or click to browse",
      promptPlaceholder: "Describe the style — e.g., Van Gogh, cyberpunk, watercolor...",
      applyStyle: "Apply Style",
      createVideo: "Create Short Video",
      share: "Share",
      download: "Download",
      processing: "Processing...",
      noImages: "Upload images to get started",
      shareVia: "Share via",
      copied: "Link copied to clipboard!",
    },
    VI: {
      title: "Chuyển đổi phong cách AI",
      subtitle: "Biến đổi hình ảnh của bạn với các phong cách nghệ thuật AI",
      uploadArea: "Kéo và thả hình ảnh vào đây, hoặc nhấp để chọn",
      promptPlaceholder: "Mô tả phong cách — ví dụ: Van Gogh, cyberpunk, màu nước...",
      applyStyle: "Áp dụng phong cách",
      createVideo: "Tạo video ngắn",
      share: "Chia sẻ",
      download: "Tải xuống",
      processing: "Đang xử lý...",
      noImages: "Tải lên hình ảnh để bắt đầu",
      shareVia: "Chia sẻ qua",
      copied: "Đã sao chép liên kết!",
    },
  };

  const t = translations[language];

  const handleFileSelect = (files: FileList | null) => {
    if (!files) return;

    const newImages: UploadedImage[] = Array.from(files)
      .filter((file) => file.type.startsWith("image/"))
      .map((file) => ({
        id: Math.random().toString(36).substr(2, 9),
        file,
        preview: URL.createObjectURL(file),
      }));

    setImages((prev) => [...prev, ...newImages]);
    toast.success(`${newImages.length} image(s) uploaded`);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    handleFileSelect(e.dataTransfer.files);
  };

  const handleRemoveImage = (id: string) => {
    setImages((prev) => {
      const updated = prev.filter((img) => img.id !== id);
      const removed = prev.find((img) => img.id === id);
      if (removed) URL.revokeObjectURL(removed.preview);
      return updated;
    });
  };

  const handleApplyStyle = async () => {
    if (!prompt.trim()) {
      toast.error("Please enter a style prompt");
      return;
    }

    if (images.length === 0) {
      toast.error("Please upload at least one image");
      return;
    }

    setIsProcessing(true);
    setProgress(0);

    // Simulate processing with progress
    // TODO: Replace with actual AI style transfer API call
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsProcessing(false);
          toast.success("Style applied successfully!");
          // Simulate processed images (in reality, these would come from the API)
          setImages((prev) =>
            prev.map((img) => ({
              ...img,
              processed: img.preview, // Replace with actual processed image URL
            }))
          );
          return 100;
        }
        return prev + 10;
      });
    }, 300);
  };

  const handleCreateVideo = async () => {
    if (images.length === 0) {
      toast.error("Please upload images first");
      return;
    }

    setIsProcessing(true);
    setProgress(0);

    // TODO: Replace with actual video generation API call
    // This would create a slideshow/video from the uploaded images
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsProcessing(false);
          toast.success("Video created successfully!");
          // Trigger download of the generated video
          return 100;
        }
        return prev + 8;
      });
    }, 400);
  };

  const handleShare = (platform: "facebook" | "zalo" | "tiktok") => {
    const shareUrl = window.location.href;
    const shareText = "Check out my AI-styled images!";

    const shareUrls = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
      zalo: `https://zalo.me/share?url=${encodeURIComponent(shareUrl)}`,
      tiktok: `https://www.tiktok.com/share?url=${encodeURIComponent(shareUrl)}`,
    };

    // Open share dialog in new window
    const newWindow = window.open(shareUrls[platform], "_blank", "width=600,height=400");
    
    if (!newWindow) {
      // Fallback: copy link to clipboard
      navigator.clipboard.writeText(shareUrl);
      toast.success(t.copied);
    }
  };

  const handleDownload = (image: UploadedImage) => {
    const link = document.createElement("a");
    link.href = image.processed || image.preview;
    link.download = `styled-${image.file.name}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="container mx-auto max-w-6xl space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold text-gradient flex items-center justify-center gap-2">
            <Sparkles className="h-8 w-8 text-primary" />
            {t.title}
          </h1>
          <p className="text-muted-foreground">{t.subtitle}</p>
        </div>

        {/* Upload Area */}
        <Card
          className={cn(
            "border-2 border-dashed border-border hover:border-primary/50 transition-colors cursor-pointer",
            "p-12 text-center bg-card"
          )}
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          onClick={() => fileInputRef.current?.click()}
        >
          <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
          <p className="text-lg font-medium mb-2">{t.uploadArea}</p>
          <p className="text-sm text-muted-foreground">
            Supports: JPG, PNG, WEBP (max 10 images)
          </p>
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*"
            onChange={(e) => handleFileSelect(e.target.files)}
            className="hidden"
            aria-label="Upload images"
          />
        </Card>

        {/* Image Previews */}
        {images.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {images.map((image) => (
              <Card key={image.id} className="relative group overflow-hidden shadow-card">
                <img
                  src={image.processed || image.preview}
                  alt={image.file.name}
                  className="w-full aspect-square object-cover"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <Button
                    size="icon"
                    variant="secondary"
                    onClick={() => handleDownload(image)}
                    aria-label="Download image"
                  >
                    <Download className="h-4 w-4" />
                  </Button>
                  <Button
                    size="icon"
                    variant="destructive"
                    onClick={() => handleRemoveImage(image.id)}
                    aria-label="Remove image"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                {image.processed && (
                  <div className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded">
                    ✓ Styled
                  </div>
                )}
              </Card>
            ))}
          </div>
        )}

        {/* Prompt Input - Sticky */}
        <div className="sticky bottom-4 z-20 bg-card p-4 rounded-lg shadow-elevated border border-border">
          <Input
            type="text"
            placeholder={t.promptPlaceholder}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="mb-4"
            disabled={isProcessing}
          />

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3 justify-center">
            <Button
              onClick={handleApplyStyle}
              disabled={isProcessing || images.length === 0}
              className="gradient-primary gap-2"
            >
              <Sparkles className="h-4 w-4" />
              {t.applyStyle}
            </Button>

            <Button
              onClick={handleCreateVideo}
              disabled={isProcessing || images.length === 0}
              variant="secondary"
              className="gap-2"
            >
              <Video className="h-4 w-4" />
              {t.createVideo}
            </Button>

            <div className="flex gap-2">
              <Button
                onClick={() => handleShare("facebook")}
                variant="outline"
                size="icon"
                aria-label="Share on Facebook"
              >
                <Facebook className="h-4 w-4" />
              </Button>
              <Button
                onClick={() => handleShare("zalo")}
                variant="outline"
                size="icon"
                aria-label="Share on Zalo"
              >
                <Share2 className="h-4 w-4" />
              </Button>
              <Button
                onClick={() => handleShare("tiktok")}
                variant="outline"
                size="icon"
                aria-label="Share on TikTok"
              >
                <Share2 className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Progress Bar */}
          {isProcessing && (
            <div className="mt-4 space-y-2" role="status" aria-live="polite">
              <Progress value={progress} className="h-2" />
              <p className="text-sm text-center text-muted-foreground">
                {t.processing} {progress}%
              </p>
            </div>
          )}
        </div>

        {/* Empty State */}
        {images.length === 0 && !isProcessing && (
          <div className="text-center py-12 text-muted-foreground">
            <Sparkles className="h-16 w-16 mx-auto mb-4 opacity-50" />
            <p className="text-lg">{t.noImages}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AIStyleTransfer;
