
import React from 'react';
import { FormField, FormItem, FormLabel, FormDescription, FormMessage } from '@/components/ui/form';
import { Calendar } from '@/components/ui/calendar';
import { UseFormReturn } from 'react-hook-form';
import { PropertyFormValues } from '../schema';
import TooltipInfo from '../TooltipInfo';

interface AvailabilitySectionProps {
  form: UseFormReturn<PropertyFormValues>;
}

const AvailabilitySection: React.FC<AvailabilitySectionProps> = ({ form }) => {
  return (
    <FormField
      control={form.control}
      name="availability"
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <FormLabel>
            Disponibilidade
            <TooltipInfo text="Ex.: seg-sex 08-18h" link="docs/disponibilidade" />
          </FormLabel>
          <div className="p-4 border rounded-md">
            <Calendar
              mode="multiple"
              selected={field.value}
              onSelect={field.onChange}
              className="mx-auto"
              aria-label="Selecione os dias disponíveis"
            />
          </div>
          <FormDescription>
            Selecione os dias em que sua vaga estará disponível
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default AvailabilitySection;
