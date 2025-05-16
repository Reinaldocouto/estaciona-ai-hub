
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import PropertyForm from './PropertyForm';

interface FormSectionProps {
  id: string;
  title: string;
}

const FormSection: React.FC<FormSectionProps> = ({ id, title }) => {
  return (
    <section id={id} className="py-12 scroll-mt-20">
      <h2 className="text-3xl font-bold mb-8 text-center">{title}</h2>
      <Card className="max-w-4xl mx-auto">
        <CardContent className="p-6 md:p-8">
          <PropertyForm />
        </CardContent>
      </Card>
    </section>
  );
};

export default FormSection;
