
import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, Check, Crown, Zap, MapPin, Clock, RefreshCw, Sparkles, Trophy, Gift } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Container, Box } from '@/components/ui/container';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const Premium = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);
  const { user, isPremium, premiumUntil, checkSubscription } = useAuth();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Handle success/cancel from Stripe
    if (searchParams.get('success')) {
      setShowWelcome(true);
      // Force refresh subscription status
      setTimeout(() => {
        checkSubscription();
      }, 2000);
    } else if (searchParams.get('canceled')) {
      toast({
        title: "Assinatura cancelada",
        description: "Você pode tentar novamente a qualquer momento.",
        variant: "destructive",
      });
      navigate('/premium', { replace: true });
    }
  }, [searchParams, toast, checkSubscription, navigate]);

  const handleWelcomeContinue = () => {
    setShowWelcome(false);
    navigate('/premium', { replace: true });
  };

  const handleUpgrade = async () => {
    if (!user) {
      toast({
        title: "Login necessário",
        description: "Faça login para assinar o Premium",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      console.log('Creating checkout session for user:', user.id);

      // Ensure Authorization header is forwarded explicitly
      const { data: sessionData } = await supabase.auth.getSession();
      const accessToken = sessionData.session?.access_token;

      const { data, error } = await supabase.functions.invoke('create-checkout', {
        headers: accessToken ? { Authorization: `Bearer ${accessToken}` } : undefined,
      });

      if (error) {
        console.error('Checkout error:', error);
        throw new Error(error.message || 'Erro ao processar pagamento');
      }

      if (!data?.url) {
        throw new Error('URL de pagamento não recebida');
      }

      console.log('Redirecting to checkout:', data.url);
      // Open Stripe checkout in a new tab (more reliable across environments)
      window.open(data.url, '_blank');
    } catch (error: any) {
      console.error('Payment error:', error);
      toast({
        title: 'Erro ao processar pagamento',
        description: error.message || 'Tente novamente em alguns instantes.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRefreshStatus = async () => {
    setIsRefreshing(true);
    try {
      await checkSubscription();
      toast({
        title: "Status atualizado",
        description: "Status da assinatura verificado com sucesso.",
      });
    } catch (error) {
      console.error('Refresh error:', error);
      toast({
        title: "Erro ao verificar status",
        description: "Tente novamente em alguns instantes.",
        variant: "destructive",
      });
    } finally {
      setIsRefreshing(false);
    }
  };

  const benefits = [
    {
      icon: <Star className="h-6 w-6 text-yellow-400" />,
      title: "Descontos Exclusivos",
      description: "10% de desconto em vagas premium + 20% extra após 3 reservas no mês"
    },
    {
      icon: <Zap className="h-6 w-6 text-blue-400" />,
      title: "Prioridade na Busca",
      description: "Vagas premium aparecem primeiro nos resultados de busca"
    },
    {
      icon: <MapPin className="h-6 w-6 text-green-400" />,
      title: "Acesso a Vagas VIP",
      description: "Vagas exclusivas em localizações premium com serviços especiais"
    },
    {
      icon: <Clock className="h-6 w-6 text-purple-400" />,
      title: "Cancelamento Flexível",
      description: "Cancele reservas até 1 hora antes sem multa"
    }
  ];

  return (
    <>
      <Helmet>
        <title>Premium | Estaciona Aí</title>
        <meta name="description" content="Upgrade para Premium e tenha acesso a descontos exclusivos, prioridade na busca e muito mais!" />
      </Helmet>
      
      <Navbar />
      
      <Box 
        as="main"
        className="font-roboto min-h-screen"
      >
        <Container className="py-12 md:py-16">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-4">
              <Crown className="h-12 w-12 text-yellow-500 mr-3" />
              <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-yellow-600 bg-clip-text text-transparent">
                Estaciona Aí Premium
              </h1>
            </div>
            <p className="text-xl text-foreground max-w-2xl mx-auto">
              Upgrade para Premium e tenha acesso a descontos exclusivos, prioridade na busca e muito mais!
            </p>
          </div>

          {showWelcome ? (
            // Welcome Screen for New Premium Users
            <div className="max-w-4xl mx-auto">
              {/* Congratulations Header */}
              <div className="text-center mb-12">
                <div className="relative">
                  {/* Background Animation */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-32 h-32 bg-gradient-to-r from-yellow-400/20 to-primary/20 rounded-full animate-pulse"></div>
                  </div>
                  <div className="relative flex flex-col items-center">
                    <Trophy className="h-20 w-20 text-yellow-500 mb-4 animate-bounce" />
                    <div className="flex items-center mb-4">
                      <Sparkles className="h-6 w-6 text-yellow-400 mr-2" />
                      <h1 className="text-5xl font-bold bg-gradient-to-r from-yellow-500 via-primary to-yellow-600 bg-clip-text text-transparent">
                        Parabéns!
                      </h1>
                      <Sparkles className="h-6 w-6 text-yellow-400 ml-2" />
                    </div>
                    <Badge className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white px-6 py-2 text-lg mb-4">
                      <Crown className="h-5 w-5 mr-2" />
                      BEM-VINDO AO PREMIUM
                    </Badge>
                    <p className="text-2xl text-foreground font-medium max-w-2xl">
                      Você agora faz parte da área exclusiva do Estaciona Aí!
                    </p>
                    <p className="text-lg text-muted-foreground mt-2">
                      Aproveite todos os benefícios premium que separamos para você
                    </p>
                  </div>
                </div>
              </div>

              {/* Premium Benefits Showcase */}
              <div className="grid md:grid-cols-2 gap-8 mb-12">
                {/* Main Benefits */}
                <Card className="bg-gradient-to-br from-yellow-50 to-primary/5 border-yellow-200">
                  <CardHeader>
                    <CardTitle className="flex items-center text-xl">
                      <Gift className="h-6 w-6 text-yellow-500 mr-2" />
                      Seus Benefícios Exclusivos
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-start space-x-3 p-3 bg-white rounded-lg border border-yellow-100">
                      <Star className="h-6 w-6 text-yellow-500 flex-shrink-0 mt-1" />
                      <div>
                        <h4 className="font-semibold text-green-700">Descontos Exclusivos</h4>
                        <p className="text-sm text-muted-foreground">10% de desconto + 20% extra após 3 reservas no mês</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3 p-3 bg-white rounded-lg border border-blue-100">
                      <Zap className="h-6 w-6 text-blue-500 flex-shrink-0 mt-1" />
                      <div>
                        <h4 className="font-semibold text-green-700">Prioridade Absoluta</h4>
                        <p className="text-sm text-muted-foreground">Suas vagas aparecem primeiro nos resultados</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3 p-3 bg-white rounded-lg border border-green-100">
                      <MapPin className="h-6 w-6 text-green-500 flex-shrink-0 mt-1" />
                      <div>
                        <h4 className="font-semibold text-green-700">Vagas VIP Exclusivas</h4>
                        <p className="text-sm text-muted-foreground">Acesso a localizações premium especiais</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3 p-3 bg-white rounded-lg border border-purple-100">
                      <Clock className="h-6 w-6 text-purple-500 flex-shrink-0 mt-1" />
                      <div>
                        <h4 className="font-semibold text-green-700">Cancelamento Flexível</h4>
                        <p className="text-sm text-muted-foreground">Cancele até 1 hora antes sem multas</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Call to Action */}
                <Card className="bg-gradient-to-br from-primary/5 to-blue-50 border-primary/20">
                  <CardHeader>
                    <CardTitle className="flex items-center text-xl">
                      <Crown className="h-6 w-6 text-primary mr-2" />
                      Comece Agora Mesmo!
                    </CardTitle>
                    <CardDescription className="text-base">
                      Sua assinatura premium já está ativa e pronta para usar
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="bg-white p-4 rounded-lg border border-primary/10">
                      <h4 className="font-semibold text-primary mb-2">🎯 Próximos Passos:</h4>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-center">
                          <Check className="h-4 w-4 text-green-500 mr-2" />
                          Encontre vagas premium na sua região
                        </li>
                        <li className="flex items-center">
                          <Check className="h-4 w-4 text-green-500 mr-2" />
                          Aproveite os descontos exclusivos
                        </li>
                        <li className="flex items-center">
                          <Check className="h-4 w-4 text-green-500 mr-2" />
                          Experimente o ranking prioritário
                        </li>
                      </ul>
                    </div>
                    
                    <div className="space-y-3">
                      <Button 
                        className="w-full bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90 text-lg py-6" 
                        onClick={() => navigate('/spaces')}
                      >
                        <MapPin className="h-5 w-5 mr-2" />
                        Encontrar Vagas Premium
                      </Button>
                      
                      <Button 
                        variant="outline" 
                        className="w-full"
                        onClick={handleWelcomeContinue}
                      >
                        Continuar para Área Premium
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Welcome Footer */}
              <div className="text-center bg-gradient-to-r from-yellow-50 to-primary/5 p-8 rounded-xl border border-yellow-200">
                <h3 className="text-2xl font-bold text-primary mb-4">
                  Obrigado por escolher o Estaciona Aí Premium! 🚗✨
                </h3>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Você agora faz parte de um grupo seleto de usuários que aproveitam o melhor 
                  da nossa plataforma. Tenha uma experiência premium em cada estacionamento!
                </p>
              </div>
            </div>
          ) : isPremium ? (
            // Premium Active State
            <Card className="max-w-2xl mx-auto bg-gradient-to-r from-yellow-50 to-primary/10 border-yellow-200">
              <CardHeader className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <Crown className="h-8 w-8 text-yellow-500 mr-2" />
                  <Badge className="bg-yellow-500 text-white px-4 py-2">
                    PREMIUM ATIVO
                  </Badge>
                </div>
                <CardTitle className="text-2xl">Você é Premium!</CardTitle>
                <CardDescription>
                  {premiumUntil && `Válido até ${new Date(premiumUntil).toLocaleDateString('pt-BR')}`}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4 mb-6">
                  {benefits.map((benefit, index) => (
                    <div key={index} className="flex items-start space-x-3 p-3 bg-white rounded-lg">
                      {benefit.icon}
                      <div>
                        <h4 className="font-medium text-sm">{benefit.title}</h4>
                        <p className="text-xs text-gray-600">{benefit.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Button 
                    className="flex-1" 
                    onClick={() => navigate('/spaces')}
                  >
                    Encontrar Vagas Premium
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={handleRefreshStatus}
                    disabled={isRefreshing}
                  >
                    <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            // Upgrade to Premium
            <>
              {/* Benefits Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                {benefits.map((benefit, index) => (
                  <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex justify-center mb-4">
                        {benefit.icon}
                      </div>
                      <h3 className="font-semibold mb-2">{benefit.title}</h3>
                      <p className="text-sm text-muted-foreground">{benefit.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Pricing Card */}
              <Card className="max-w-md mx-auto">
                <CardHeader className="text-center">
                  <div className="flex items-center justify-center mb-2">
                    <Crown className="h-8 w-8 text-yellow-500 mr-2" />
                    <CardTitle className="text-2xl">Premium</CardTitle>
                  </div>
                  <div className="text-3xl font-bold text-primary mb-2">
                    R$ 29,90<span className="text-lg font-normal text-muted-foreground">/mês</span>
                  </div>
                  <CardDescription>
                    Cancele a qualquer momento
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-6">
                    {benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span className="text-sm">{benefit.title}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <div className="space-y-2">
                    <Button 
                      className="w-full bg-gradient-to-r from-primary to-yellow-600 hover:from-primary/90 hover:to-yellow-600/90" 
                      size="lg"
                      onClick={handleUpgrade}
                      disabled={isLoading || !user}
                    >
                      {isLoading ? 'Processando...' : 'Assinar Premium'}
                    </Button>
                    
                    {!user && (
                      <p className="text-xs text-center text-muted-foreground">
                        Faça login para assinar o Premium
                      </p>
                    )}
                    
                    {user && (
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="w-full"
                        onClick={handleRefreshStatus}
                        disabled={isRefreshing}
                      >
                        <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
                        Verificar Status da Assinatura
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            </>
          )}
        </Container>
      </Box>
      
      <Footer />
    </>
  );
};

export default Premium;
