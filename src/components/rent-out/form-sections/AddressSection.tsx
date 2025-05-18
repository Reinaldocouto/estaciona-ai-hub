
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { UseFormReturn } from 'react-hook-form';
import { PropertyFormValues } from '../schema';
import TooltipInfo from '../TooltipInfo';

interface AddressSectionProps {
  form: UseFormReturn<PropertyFormValues>;
}

const AddressSection: React.FC<AddressSectionProps> = ({ form }) => {
  return (
    <FormField
      control={form.control}
      name="address"
      render={({ field }) => (
        <FormItem>
          <FormLabel>
            Endereço
            <TooltipInfo text="Insira rua e número" link="docs/endereco" />
          </FormLabel>
          <FormControl>
            <Input 
              placeholder="Av. Paulista, 1000, São Paulo, SP" 
              {...field} 
              aria-label="Endereço da vaga"
            />
          </FormControl>
          <FormDescription>
            O endereço aparecerá no mapa para os motoristas
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default AddressSection;
