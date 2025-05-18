
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { UseFormReturn } from 'react-hook-form';
import { PropertyFormValues } from '../schema';
import TooltipInfo from '../TooltipInfo';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface SizeSectionProps {
  form: UseFormReturn<PropertyFormValues>;
}

const SizeSection: React.FC<SizeSectionProps> = ({ form }) => {
  return (
    <FormField
      control={form.control}
      name="size"
      render={({ field }) => (
        <FormItem>
          <FormLabel>
            Dimensões
            <TooltipInfo text="Para carros de até 5 m" link="docs/dimensoes" />
          </FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Selecione o tamanho da vaga" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <SelectItem value="small">Pequeno (até 4m)</SelectItem>
              <SelectItem value="medium">Médio (até 4.5m)</SelectItem>
              <SelectItem value="suv">SUV (até 5m)</SelectItem>
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default SizeSection;
