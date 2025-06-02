
import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, Check, Crown, Zap, MapPin, Clock, RefreshCw } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const Premium = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { user, isPremium, premiumUntil, checkSubscription } = useAuth();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Handle success/cancel from Stripe
    if (searchParams.get('success')) {
      toast({
        title: "Assinatura Premium ativada!",
        description: "Bem-vindo ao Estaciona Aí Premium! Aproveite todos os benefícios.",
      });
      // Force refresh subscription status
      setTimeout(() => {
        checkSubscription();
      }, 2000);
      navigate('/premium', { replace: true });
    } else if (searchParams.get('canceled')) {
      toast({
        title: "Assinatura cancelada",
        description: "Você pode tentar novamente a qualquer momento.",
        variant: "destructive",
      });
      navigate('/premium', { replace: true });
    }
  }, [searchParams, toast, checkSubscription, navigate]);

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
      
      const { data, error } = await supabase.functions.invoke('create-checkout');
      
      if (error) {
        console.error('Checkout error:', error);
        throw new Error(error.message || 'Erro ao processar pagamento');
      }
      
      if (!data?.url) {
        throw new Error('URL de pagamento não recebida');
      }
      
      console.log('Redirecting to checkout:', data.url);
      // Redirect to Stripe checkout
      window.location.href = data.url;
    } catch (error: any) {
      console.error('Payment error:', error);
      toast({
        title: "Erro ao processar pagamento",
        description: error.message || "Tente novamente em alguns instantes.",
        variant: "destructive",
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
      <Navbar />
      
      <main className="min-h-screen bg-gradient-to-br from-primary/5 via-white to-yellow-50">
        <div className="container mx-auto px-4 py-16">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-4">
              <Crown className="h-12 w-12 text-yellow-500 mr-3" />
              <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-yellow-600 bg-clip-text text-transparent">
                Estaciona Aí Premium
              </h1>
            </div>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Upgrade para Premium e tenha acesso a descontos exclusivos, prioridade na busca e muito mais!
            </p>
          </div>

          {isPremium ? (
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
                      <p className="text-sm text-gray-600">{benefit.description}</p>
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
                    R$ 29,90<span className="text-lg font-normal text-gray-600">/mês</span>
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
                      <p className="text-xs text-center text-gray-600">
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
        </div>
      </main>
      
      <Footer />
    </>
  );
};

export default Premium;
