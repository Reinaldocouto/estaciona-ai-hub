
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Upload } from 'lucide-react';
import { UseFormReturn } from 'react-hook-form';
import { PropertyFormValues } from '../schema';
import TooltipInfo from '../TooltipInfo';

interface PhotoUploadSectionProps {
  form: UseFormReturn<PropertyFormValues>;
}

const PhotoUploadSection: React.FC<PhotoUploadSectionProps> = ({ form }) => {
  return (
    <FormField
      control={form.control}
      name="photos"
      render={({ field }) => (
        <FormItem>
          <FormLabel>
            Fotos da vaga
            <TooltipInfo text="Até 5 fotos .jpg" link="docs/fotos" />
          </FormLabel>
          <FormControl>
            <div 
              className="border-2 border-dashed border-input rounded-md px-6 py-10 text-center cursor-pointer hover:border-primary"
              onClick={() => document.getElementById('file-upload')?.click()}
            >
              <Input 
                id="file-upload"
                type="file" 
                accept=".jpg,.jpeg,.png" 
                multiple 
                className="hidden" 
                onChange={(e) => {
                  field.onChange(e.target.files);
                }}
                aria-label="Upload de fotos da vaga"
              />
              <Upload className="mx-auto h-12 w-12 text-muted-foreground" />
              <div className="mt-4 flex text-sm leading-6 text-muted-foreground">
                <p className="pl-1">Clique para fazer upload ou arraste até 5 fotos</p>
              </div>
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default PhotoUploadSection;
