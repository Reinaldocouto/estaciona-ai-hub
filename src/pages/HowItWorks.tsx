
import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Container, 
  Paper, 
  Grid, 
  Button, 
  Tabs, 
  Tab,
  Stepper, 
  Step, 
  StepLabel, 
  StepContent 
} from '@mui/material';
import { Helmet } from 'react-helmet';
import { CarFront, Garage, CheckCircle, ExpandMore } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import Logo from '@/components/ui-custom/Logo';

const HowItWorks: React.FC = () => {
  const [perfilTab, setPerfilTab] = useState<number>(0);

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setPerfilTab(newValue);
  };

  // Stepper steps for Locatário (Tenant)
  const locatarioSteps = [
    {
      label: 'Busca & Filtros',
      description: 'Digite um endereço ou use seu GPS. Nosso algoritmo SmartMatch™ ordena as vagas por distância e preço, apresentando as melhores opções para você.',
    },
    {
      label: 'Reserva Instantânea',
      description: 'Selecione o horário desejado e confirme sua reserva. A vaga ficará bloqueada por 15 minutos aguardando sua chegada.',
    },
    {
      label: 'Check-in via QR',
      description: 'Ao chegar, escaneie o QR code do totem ou tire uma foto da placa para iniciar o período de estacionamento.',
    },
    {
      label: 'Pagamento PIX/cartão',
      description: 'Realize o pagamento via PIX ou cartão de crédito através do Pagar.me. Um recibo em PDF será enviado para seu e-mail.',
    },
  ];

  // Stepper steps for Locador (Owner)
  const locadorSteps = [
    {
      label: 'Cadastro de vaga',
      description: 'Adicione fotos, dimensões, preço por hora e disponibilidade da sua vaga. Quanto mais detalhes, mais atrativa será para os motoristas.',
    },
    {
      label: 'Aprovação rápida',
      description: 'Nosso sistema verifica seu CPF/CNPJ e a documentação do imóvel para garantir segurança a todos os usuários.',
    },
    {
      label: 'Gestão de reservas',
      description: 'Use nosso painel web ou aplicativo para gerenciar suas reservas. Cancele com até 2 horas de antecedência sem penalidades.',
    },
    {
      label: 'Receba pagamentos',
      description: 'Receba seus pagamentos via PIX em até um dia útil após o uso da vaga. A taxa do Estaciona Aí é de apenas 15%.',
    },
  ];

  return (
    <>
      <Helmet>
        <title>Como Funciona | Estaciona Aí</title>
        <meta name="description" content="Entenda como o Estaciona Aí funciona para motoristas e proprietários de vagas. Reserve ou alugue vagas de estacionamento em apenas 3 etapas simples." />
      </Helmet>

      <Container maxWidth="lg" className="py-8">
        {/* Hero Section */}
        <Box 
          className="py-16 px-4 rounded-xl mb-12"
          sx={{
            backgroundColor: 'rgba(255, 0, 87, 0.15)',
            backgroundImage: 'radial-gradient(at top right, rgba(255, 0, 87, 0.2), transparent)',
            backdropFilter: 'blur(20px)',
          }}
        >
          <Typography 
            variant="h2" 
            component="h1" 
            align="center" 
            gutterBottom
            className="text-4xl md:text-5xl font-bold"
          >
            Como o Estaciona Aí funciona?
          </Typography>
          <Typography 
            variant="h5" 
            align="center" 
            className="text-muted-foreground max-w-2xl mx-auto"
          >
            Reserve ou alugue vagas em 3 etapas simples.
          </Typography>
        </Box>

        {/* Quick Summary Grid */}
        <Grid container spacing={4} className="mb-12">
          <Grid item xs={12} md={6}>
            <Paper 
              elevation={2} 
              sx={{ 
                borderTop: '4px solid', 
                borderColor: 'primary.main',
                height: '100%',
                display: 'flex',
                flexDirection: 'column'
              }} 
              className="p-6 rounded-xl"
            >
              <Box className="flex items-center gap-3 mb-4">
                <CarFront size={32} className="text-primary" />
                <Typography variant="h5" component="h3" className="font-bold">
                  Locatário (Motorista)
                </Typography>
              </Box>
              <Box className="pl-4">
                <Typography variant="body1" className="flex items-center gap-2 mb-2">
                  <span className="w-2 h-2 rounded-full bg-primary inline-block"></span>
                  Encontre vaga
                </Typography>
                <Typography variant="body1" className="flex items-center gap-2 mb-2">
                  <span className="w-2 h-2 rounded-full bg-primary inline-block"></span>
                  Reserve
                </Typography>
                <Typography variant="body1" className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-primary inline-block"></span>
                  Estacione & pague
                </Typography>
              </Box>
            </Paper>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Paper 
              elevation={2} 
              sx={{ 
                borderTop: '4px solid', 
                borderColor: 'secondary.main',
                height: '100%',
                display: 'flex',
                flexDirection: 'column'
              }} 
              className="p-6 rounded-xl"
            >
              <Box className="flex items-center gap-3 mb-4">
                <Garage size={32} className="text-secondary" />
                <Typography variant="h5" component="h3" className="font-bold">
                  Locador (Proprietário)
                </Typography>
              </Box>
              <Box className="pl-4">
                <Typography variant="body1" className="flex items-center gap-2 mb-2">
                  <span className="w-2 h-2 rounded-full bg-secondary inline-block"></span>
                  Cadastre vaga
                </Typography>
                <Typography variant="body1" className="flex items-center gap-2 mb-2">
                  <span className="w-2 h-2 rounded-full bg-secondary inline-block"></span>
                  Aprove vendas
                </Typography>
                <Typography variant="body1" className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-secondary inline-block"></span>
                  Receba pagamento
                </Typography>
              </Box>
            </Paper>
          </Grid>
        </Grid>

        {/* Tabs Section */}
        <Box className="mb-10">
          <Tabs
            value={perfilTab}
            onChange={handleTabChange}
            aria-label="Tabs de perfil de usuário"
            variant="fullWidth"
            className="mb-6"
            sx={{
              '& .MuiTabs-indicator': {
                backgroundColor: 'primary.main',
              },
              '& .Mui-selected': {
                color: 'primary.main',
                fontWeight: 'bold',
              },
            }}
          >
            <Tab label="Sou Motorista (Locatário)" id="tab-0" aria-controls="tabpanel-0" />
            <Tab label="Sou Proprietário (Locador)" id="tab-1" aria-controls="tabpanel-1" />
          </Tabs>

          {/* Tab Panel for Locatário */}
          <div
            role="tabpanel"
            hidden={perfilTab !== 0}
            id="tabpanel-0"
            aria-labelledby="tab-0"
            className="bg-card rounded-xl p-6"
          >
            {perfilTab === 0 && (
              <>
                <Typography variant="h6" className="mb-6">Passo a passo para Motoristas</Typography>
                <Stepper orientation="vertical">
                  {locatarioSteps.map((step, index) => (
                    <Step key={step.label} active completed>
                      <StepLabel StepIconComponent={CheckCircle}>
                        <span className="font-bold">{step.label}</span>
                      </StepLabel>
                      <StepContent>
                        <Typography className="mb-4 text-muted-foreground">{step.description}</Typography>
                      </StepContent>
                    </Step>
                  ))}
                </Stepper>

                <Box className="mt-8 space-y-4">
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="taxas">
                      <AccordionTrigger className="text-lg font-medium">
                        Saiba mais sobre taxas
                        <ExpandMore className="h-5 w-5" />
                      </AccordionTrigger>
                      <AccordionContent>
                        <ul className="list-disc pl-5 space-y-2">
                          <li>O preço mostrado já inclui 15% de taxa do Estaciona Aí</li>
                          <li>Cancelamentos com menos de 1 hora de antecedência podem ter taxa de 30%</li>
                          <li>Atrasos são cobrados proporcionalmente ao tempo excedente</li>
                          <li>Pagamentos são processados automaticamente ao final do período</li>
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>

                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="direitos">
                      <AccordionTrigger className="text-lg font-medium">
                        Direitos e Responsabilidades
                        <ExpandMore className="h-5 w-5" />
                      </AccordionTrigger>
                      <AccordionContent>
                        <Typography variant="subtitle1" className="font-medium mb-2">Seus direitos:</Typography>
                        <ul className="list-disc pl-5 space-y-2 mb-4">
                          <li>Suporte disponível 24h por dia</li>
                          <li>Seguro contra danos ao veículo durante a estadia</li>
                          <li>Reembolso integral em caso de vaga indisponível</li>
                        </ul>

                        <Typography variant="subtitle1" className="font-medium mb-2">Suas responsabilidades:</Typography>
                        <ul className="list-disc pl-5 space-y-2">
                          <li>Respeitar os horários reservados</li>
                          <li>Seguir as regras do condomínio ou estabelecimento</li>
                          <li>Multas por ultrapassar o tempo são cobradas automaticamente</li>
                          <li>Danos ao espaço serão cobrados via caução pré-autorizado</li>
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </Box>
              </>
            )}
          </div>

          {/* Tab Panel for Locador */}
          <div
            role="tabpanel"
            hidden={perfilTab !== 1}
            id="tabpanel-1"
            aria-labelledby="tab-1"
            className="bg-card rounded-xl p-6"
          >
            {perfilTab === 1 && (
              <>
                <Typography variant="h6" className="mb-6">Passo a passo para Proprietários</Typography>
                <Stepper orientation="vertical">
                  {locadorSteps.map((step, index) => (
                    <Step key={step.label} active completed>
                      <StepLabel StepIconComponent={CheckCircle}>
                        <span className="font-bold">{step.label}</span>
                      </StepLabel>
                      <StepContent>
                        <Typography className="mb-4 text-muted-foreground">{step.description}</Typography>
                      </StepContent>
                    </Step>
                  ))}
                </Stepper>

                <Box className="mt-8 space-y-4">
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="pagamentos">
                      <AccordionTrigger className="text-lg font-medium">
                        Detalhes de pagamentos
                        <ExpandMore className="h-5 w-5" />
                      </AccordionTrigger>
                      <AccordionContent>
                        <ul className="list-disc pl-5 space-y-2">
                          <li>Repasse feito via PIX em D+1 (dia útil seguinte)</li>
                          <li>A taxa do Estaciona Aí é de 15% sobre o valor da reserva</li>
                          <li>Impostos são calculados automaticamente conforme seu regime tributário</li>
                          <li>Relatório fiscal mensal disponível para download</li>
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>

                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="responsabilidades">
                      <AccordionTrigger className="text-lg font-medium">
                        Direitos e Responsabilidades
                        <ExpandMore className="h-5 w-5" />
                      </AccordionTrigger>
                      <AccordionContent>
                        <Typography variant="subtitle1" className="font-medium mb-2">Seus direitos:</Typography>
                        <ul className="list-disc pl-5 space-y-2 mb-4">
                          <li>Chat de suporte 24h</li>
                          <li>Seguro opcional contra danos à propriedade</li>
                          <li>Direito a solicitar ID do motorista</li>
                        </ul>

                        <Typography variant="subtitle1" className="font-medium mb-2">Suas responsabilidades:</Typography>
                        <ul className="list-disc pl-5 space-y-2">
                          <li>A vaga deve estar livre e acessível no horário reservado</li>
                          <li>Manter fotos e descrição da vaga atualizadas</li>
                          <li>Preços sempre visíveis e corretos</li>
                          <li>Disponibilizar método de acesso (controle, chave, etc)</li>
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </Box>
              </>
            )}
          </div>
        </Box>

        {/* CTA Section */}
        <Grid container spacing={3} className="mt-10">
          <Grid item xs={12} sm={6} className="flex justify-center">
            <Button 
              variant="contained" 
              color="primary" 
              size="large"
              className="w-full sm:w-auto"
              sx={{ py: 1.5, px: 4 }}
            >
              Baixar o app
            </Button>
          </Grid>
          <Grid item xs={12} sm={6} className="flex justify-center">
            <Button 
              variant="outlined" 
              size="large"
              className="w-full sm:w-auto"
              sx={{ py: 1.5, px: 4 }}
            >
              Começar a anunciar vaga
            </Button>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default HowItWorks;
