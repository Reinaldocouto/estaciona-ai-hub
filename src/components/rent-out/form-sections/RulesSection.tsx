
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { UseFormReturn } from 'react-hook-form';
import { PropertyFormValues } from '../schema';
import TooltipInfo from '../TooltipInfo';

interface RulesSectionProps {
  form: UseFormReturn<PropertyFormValues>;
}

const RulesSection: React.FC<RulesSectionProps> = ({ form }) => {
  return (
    <FormField
      control={form.control}
      name="rules"
      render={({ field }) => (
        <FormItem>
          <FormLabel>
            Regras da vaga
            <TooltipInfo text="Ex.: portão automático" link="docs/regras" />
          </FormLabel>
          <FormControl>
            <Textarea 
              placeholder="Informe regras especiais ou instruções para uso da vaga..." 
              {...field} 
              className="min-h-32"
              aria-label="Regras da vaga"
            />
          </FormControl>
          <FormDescription>
            Instruções de acesso, regras especiais ou informações relevantes
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default RulesSection;
