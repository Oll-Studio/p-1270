import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { ProjectBriefFormValues } from "./types";
import { supabase } from "@/integrations/supabase/client";
import { useState } from "react";
import { Loader2 } from "lucide-react";

interface FileUploadProps {
  form: UseFormReturn<ProjectBriefFormValues>;
}

export function FileUpload({ form }: FileUploadProps) {
  const [uploading, setUploading] = useState(false);

  const handleFileUpload = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    
    setUploading(true);
    const uploadedFiles = [];

    try {
      for (const file of Array.from(files)) {
        const fileExt = file.name.split('.').pop();
        const filePath = `${crypto.randomUUID()}.${fileExt}`;
        
        const { error: uploadError } = await supabase.storage
          .from('project-files')
          .upload(filePath, file);

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
          .from('project-files')
          .getPublicUrl(filePath);

        uploadedFiles.push({
          name: file.name,
          path: filePath,
          url: publicUrl
        });
      }

      form.setValue('files', uploadedFiles);
    } catch (error) {
      console.error('Error uploading file:', error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <FormField
      control={form.control}
      name="files"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Project Files</FormLabel>
          <FormControl>
            <div className="relative">
              <Input
                type="file"
                multiple
                onChange={(e) => handleFileUpload(e.target.files)}
                disabled={uploading}
                accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png"
              />
              {uploading && (
                <div className="absolute inset-0 bg-background/80 flex items-center justify-center">
                  <Loader2 className="h-6 w-6 animate-spin" />
                </div>
              )}
            </div>
          </FormControl>
          {field.value?.length > 0 && (
            <ul className="text-sm space-y-1">
              {field.value.map((file: any, index: number) => (
                <li key={index} className="text-muted-foreground">
                  {file.name}
                </li>
              ))}
            </ul>
          )}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}