import { useState } from 'react';
import { Upload, X, Image as ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { useImageManager } from '@/hooks/useImageManager';
import ImageWithFallback from '@/components/ImageWithFallback';

interface ImageUploadManagerProps {
  bucketName: string;
  folder?: string;
  maxFiles?: number;
  onImagesChange?: (images: any[]) => void;
}

const ImageUploadManager = ({ 
  bucketName, 
  folder, 
  maxFiles = 10,
  onImagesChange 
}: ImageUploadManagerProps) => {
  const { toast } = useToast();
  const { images, loading, uploadImage, deleteImage, refetch } = useImageManager(bucketName, folder);
  const [uploading, setUploading] = useState(false);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    setUploading(true);
    let successCount = 0;

    for (const file of Array.from(files)) {
      if (images.length + successCount >= maxFiles) {
        toast({
          title: "Upload Limit Reached",
          description: `Maximum ${maxFiles} images allowed.`,
          variant: "destructive"
        });
        break;
      }

      const success = await uploadImage(file);
      if (success) {
        successCount++;
      }
    }

    if (successCount > 0) {
      toast({
        title: "Images Uploaded",
        description: `${successCount} image(s) uploaded successfully.`,
      });
      onImagesChange?.(images);
    }

    setUploading(false);
    event.target.value = '';
  };

  const handleDelete = async (imageName: string) => {
    const success = await deleteImage(imageName);
    if (success) {
      toast({
        title: "Image Deleted",
        description: "Image has been removed successfully.",
      });
      onImagesChange?.(images);
    }
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-gray-300 rounded w-1/4"></div>
            <div className="grid grid-cols-3 gap-4">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-24 bg-gray-300 rounded"></div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent className="p-6">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Image Manager</h3>
            <span className="text-sm text-muted-foreground">
              {images.length}/{maxFiles} images
            </span>
          </div>

          {/* Upload Area */}
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleFileUpload}
              className="hidden"
              id="image-upload"
              disabled={uploading || images.length >= maxFiles}
            />
            <label 
              htmlFor="image-upload" 
              className="cursor-pointer flex flex-col items-center space-y-2"
            >
              <Upload className="w-8 h-8 text-gray-400" />
              <span className="text-sm text-gray-600">
                {uploading ? 'Uploading...' : 'Click to upload images'}
              </span>
            </label>
          </div>

          {/* Image Grid */}
          {images.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {images.map((image) => (
                <div key={image.id} className="relative group">
                  <ImageWithFallback
                    src={image.url}
                    alt={image.name}
                    className="w-full h-24 object-cover rounded-lg"
                  />
                  <Button
                    size="icon"
                    variant="destructive"
                    className="absolute top-1 right-1 w-6 h-6 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => handleDelete(image.name)}
                  >
                    <X className="w-3 h-3" />
                  </Button>
                  <div className="absolute bottom-1 left-1 bg-black/70 text-white text-xs px-1 rounded">
                    {image.name.length > 10 ? `${image.name.substring(0, 10)}...` : image.name}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <ImageIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">No images uploaded yet</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ImageUploadManager;