import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface ImageData {
  id: string;
  url: string;
  name: string;
  category?: string;
}

export const useImageManager = (bucketName: string, folder?: string) => {
  const [images, setImages] = useState<ImageData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchImages = async () => {
    try {
      setLoading(true);
      setError(null);
      let allImages: ImageData[] = [];

      const fetchFromFolder = async (folderName: string) => {
        const { data: files, error: listError } = await supabase.storage
          .from(bucketName)
          .list(folderName, {
            limit: 100,
            offset: 0,
          });

        if (listError) throw listError;

        const imageFiles = files?.filter(file =>
          file.name.match(/\.(jpg|jpeg|png|gif|webp)$/i)
        ) || [];

        const imageData = await Promise.all(
          imageFiles.map(async (file) => {
            const { data } = supabase.storage
              .from(bucketName)
              .getPublicUrl(`${folderName}/${file.name}`);

            return {
              id: file.id || file.name,
              url: data.publicUrl,
              name: file.name,
              category: folderName,
            };
          })
        );

        allImages.push(...imageData);
      };

      if (folder) {
        await fetchFromFolder(folder);
      } else {
        // Fetch all top-level folders in the bucket
        const { data: folders, error: foldersError } = await supabase.storage
          .from(bucketName)
          .list('', { limit: 100, offset: 0 });

        if (foldersError) throw foldersError;

        const folderDirs = folders?.filter((item) => item.name && item.metadata?.['mimetype'] === undefined) || [];

        for (const dir of folderDirs) {
          await fetchFromFolder(dir.name);
        }
      }

      setImages(allImages);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch images');
      setImages([]);
    } finally {
      setLoading(false);
    }
  };

  const uploadImage = async (file: File, fileName?: string) => {
    try {
      const uploadName = fileName || file.name;
      const filePath = folder ? `${folder}/${uploadName}` : uploadName;

      const { error: uploadError } = await supabase.storage
        .from(bucketName)
        .upload(filePath, file, { upsert: true });

      if (uploadError) throw uploadError;

      await fetchImages();
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to upload image');
      return false;
    }
  };

  const deleteImage = async (imageName: string) => {
    try {
      const filePath = folder ? `${folder}/${imageName}` : imageName;

      const { error: deleteError } = await supabase.storage
        .from(bucketName)
        .remove([filePath]);

      if (deleteError) throw deleteError;

      await fetchImages();
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete image');
      return false;
    }
  };

  useEffect(() => {
    fetchImages();
  }, [bucketName, folder]);

  return {
    images,
    loading,
    error,
    refetch: fetchImages,
    uploadImage,
    deleteImage
  };
};

export const getImageUrl = (bucketName: string, imagePath: string) => {
  const { data } = supabase.storage.from(bucketName).getPublicUrl(imagePath);
  return data.publicUrl;
};