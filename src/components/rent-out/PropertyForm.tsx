
import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Calendar } from '@/components/ui/calendar';
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage, 
  FormDescription 
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { HoverCard, HoverCardTrigger, HoverCardContent } from '@/components/ui/hover-card';
import { Info, Upload } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const formSchema = z.object({
  photos: z.any().optional(),
  address: z.string().min(10, { message: 'Endereço completo é obrigatório' }),
  size: z.string().min(1, { message: 'Selecione um tamanho' }),
  hourlyPrice: z.string().min(1, { message: 'Informe um valor por hora' }),
  availability: z.any().optional(),
  rules: z.string().optional(),
  pixAccount: z.string().min(11, { message: 'CPF/CNPJ inválido' }),
  acceptTerms: z.literal(true, {
    errorMap: () => ({ message: 'Você deve aceitar os termos' }),
  }),
});

type FormValues = z.infer<typeof formSchema>;

const PropertyForm = () => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      address: '',
      size: '',
      hourlyPrice: '',
      rules: '',
      pixAccount: '',
      acceptTerms: false,
    },
  });

  const onSubmit = (data: FormValues) => {
    console.log(data);
    toast({ 
      title: "Formulário enviado com sucesso!", 
      description: "Vamos analisar suas informações e entraremos em contato em breve.",
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} noValidate>
        {/* Fotos da vaga */}
        <FormField
          control={form.control}
          name="photos"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Fotos da vaga
                <TooltipInfo text="Até 5 fotos .jpg" link="docs/fotos" />
              </FormLabel>
              <FormControl>
                <div 
                  className="border-2 border-dashed border-input rounded-md px-6 py-10 text-center cursor-pointer hover:border-primary"
                  onClick={() => document.getElementById('file-upload')?.click()}
                >
                  <Input 
                    id="file-upload"
                    type="file" 
                    accept=".jpg,.jpeg,.png" 
                    multiple 
                    className="hidden" 
                    onChange={(e) => {
                      field.onChange(e.target.files);
                    }}
                    aria-label="Upload de fotos da vaga"
                  />
                  <Upload className="mx-auto h-12 w-12 text-muted-foreground" />
                  <div className="mt-4 flex text-sm leading-6 text-muted-foreground">
                    <p className="pl-1">Clique para fazer upload ou arraste até 5 fotos</p>
                  </div>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Endereço */}
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

        {/* Dimensões */}
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

        {/* Preço por hora */}
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

        {/* Disponibilidade */}
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

        {/* Regras da vaga */}
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

        {/* Conta PIX */}
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

        {/* Aceitar termos */}
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

        <Button type="submit" size="lg" className="w-full">
          Cadastrar minha vaga
        </Button>
      </form>
    </Form>
  );
};

const TooltipInfo: React.FC<{ text: string; link: string }> = ({ text, link }) => {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button variant="ghost" size="icon" className="h-6 w-6 ml-1 -mt-1 rounded-full">
          <Info className="h-4 w-4" />
          <span className="sr-only">Informações</span>
        </Button>
      </HoverCardTrigger>
      <HoverCardContent className="w-60">
        <div className="flex justify-between space-x-4">
          <div className="space-y-1">
            <p className="text-sm">{text}</p>
            <a href={`/${link}`} className="text-xs text-primary underline hover:text-primary/80">
              Saiba mais
            </a>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};

export default PropertyForm;
