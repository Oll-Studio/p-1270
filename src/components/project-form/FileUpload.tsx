import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { ProjectBriefFormValues } from "./types";

interface FileUploadProps {
  form: UseFormReturn<ProjectBriefFormValues>;
}

export function FileUpload({ form }: FileUploadProps) {
  return (
    <FormField
      control={form.control}
      name="files"
      render={({ field: { onChange, ...field } }) => (
        <FormItem>
          <FormLabel>Project Files</FormLabel>
          <FormControl>
            <Input
              type="file"
              multiple
              onChange={(e) => {
                const files = Array.from(e.target.files || []);
                onChange(files);
              }}
              {...field}
              value={undefined}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}