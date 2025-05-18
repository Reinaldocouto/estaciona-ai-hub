
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import { propertyFormSchema, PropertyFormValues } from './schema';

// Import form sections
import PhotoUploadSection from './form-sections/PhotoUploadSection';
import AddressSection from './form-sections/AddressSection';
import SizeSection from './form-sections/SizeSection';
import PriceSection from './form-sections/PriceSection';
import AvailabilitySection from './form-sections/AvailabilitySection';
import RulesSection from './form-sections/RulesSection';
import PixAccountSection from './form-sections/PixAccountSection';
import TermsSection from './form-sections/TermsSection';

const PropertyForm = () => {
  const form = useForm<PropertyFormValues>({
    resolver: zodResolver(propertyFormSchema),
    defaultValues: {
      address: '',
      size: '',
      hourlyPrice: '',
      rules: '',
      pixAccount: '',
      acceptTerms: false,
    },
  });

  const onSubmit = (data: PropertyFormValues) => {
    console.log(data);
    toast({ 
      title: "Formulário enviado com sucesso!", 
      description: "Vamos analisar suas informações e entraremos em contato em breve.",
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} noValidate className="space-y-6">
        <PhotoUploadSection form={form} />
        <AddressSection form={form} />
        <SizeSection form={form} />
        <PriceSection form={form} />
        <AvailabilitySection form={form} />
        <RulesSection form={form} />
        <PixAccountSection form={form} />
        <TermsSection form={form} />

        <Button type="submit" size="lg" className="w-full">
          Cadastrar minha vaga
        </Button>
      </form>
    </Form>
  );
};

export default PropertyForm;
