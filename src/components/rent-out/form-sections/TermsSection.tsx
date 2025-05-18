
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Checkbox } from '@/components/ui/checkbox';
import { UseFormReturn } from 'react-hook-form';
import { PropertyFormValues } from '../schema';
import TooltipInfo from '../TooltipInfo';

interface TermsSectionProps {
  form: UseFormReturn<PropertyFormValues>;
}

const TermsSection: React.FC<TermsSectionProps> = ({ form }) => {
  return (
    <FormField
      control={form.control}
      name="acceptTerms"
      render={({ field }) => (
        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
          <FormControl>
            <Checkbox 
              checked={field.value} 
              onCheckedChange={field.onChange}
              aria-label="Aceito os termos e condições"
            />
          </FormControl>
          <div className="space-y-1 leading-none">
            <FormLabel>
              Li e concordo com os <a href="/terms" className="text-primary underline">termos de uso</a> e <a href="/privacy" className="text-primary underline">política de privacidade</a>
              <TooltipInfo text="Termos essenciais" link="docs/termos" />
            </FormLabel>
            <FormMessage />
          </div>
        </FormItem>
      )}
    />
  );
};

export default TermsSection;
