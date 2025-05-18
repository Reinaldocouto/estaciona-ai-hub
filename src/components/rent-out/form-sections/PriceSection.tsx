
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { UseFormReturn } from 'react-hook-form';
import { PropertyFormValues } from '../schema';
import TooltipInfo from '../TooltipInfo';

interface PriceSectionProps {
  form: UseFormReturn<PropertyFormValues>;
}

const PriceSection: React.FC<PriceSectionProps> = ({ form }) => {
  return (
    <FormField
      control={form.control}
      name="hourlyPrice"
      render={({ field }) => (
        <FormItem>
          <FormLabel>
            Preço por hora
            <TooltipInfo text="Você recebe 85% líquido" link="docs/precos" />
          </FormLabel>
          <FormControl>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <span className="text-muted-foreground">R$</span>
              </div>
              <Input 
                type="text" 
                placeholder="0,00" 
                className="pl-12" 
                {...field} 
                aria-label="Preço por hora"
                onChange={(e) => {
                  // Format as currency
                  const value = e.target.value.replace(/\D/g, '');
                  const formattedValue = (parseInt(value) / 100).toFixed(2).replace('.', ',');
                  field.onChange(formattedValue !== '0,00' ? formattedValue : '');
                }}
              />
            </div>
          </FormControl>
          <FormDescription>
            Ganhos estimados: até R$ 800/mês (baseado na média de uso)
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default PriceSection;
