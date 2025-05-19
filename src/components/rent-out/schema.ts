
import * as z from 'zod';

export const propertyFormSchema = z.object({
  photos: z.any().optional(),
  address: z.string().min(10, { message: 'Endereço completo é obrigatório' }),
  size: z.string().min(1, { message: 'Selecione um tamanho' }),
  hourlyPrice: z.string().min(1, { message: 'Informe um valor por hora' }),
  availability: z.any().optional(),
  rules: z.string().optional(),
  pixAccount: z.string().min(11, { message: 'CPF/CNPJ inválido' }),
  acceptTerms: z.boolean().refine(val => val === true, {
    message: 'Você deve aceitar os termos',
  }),
});

export type PropertyFormValues = z.infer<typeof propertyFormSchema>;
