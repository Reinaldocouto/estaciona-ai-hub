
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { UseFormReturn } from 'react-hook-form';
import { PropertyFormValues } from '../schema';
import TooltipInfo from '../TooltipInfo';

interface PixAccountSectionProps {
  form: UseFormReturn<PropertyFormValues>;
}

const PixAccountSection: React.FC<PixAccountSectionProps> = ({ form }) => {
  return (
    <FormField
      control={form.control}
      name="pixAccount"
      render={({ field }) => (
        <FormItem>
          <FormLabel>
            Conta PIX (CPF/CNPJ)
            <TooltipInfo text="Para repasse D+1" link="docs/pagamento" />
          </FormLabel>
          <FormControl>
            <Input 
              placeholder="Digite seu CPF ou CNPJ" 
              {...field} 
              aria-label="CPF ou CNPJ para pagamento PIX"
              onChange={(e) => {
                // Format CPF/CNPJ
                let value = e.target.value.replace(/\D/g, '');
                if (value.length > 11) {
                  // CNPJ format
                  value = value.slice(0, 14);
                } else {
                  // CPF format
                  value = value.slice(0, 11);
                }
                field.onChange(value);
              }}
            />
          </FormControl>
          <FormDescription>
            Seus pagamentos serão depositados automaticamente via PIX
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default PixAccountSection;
