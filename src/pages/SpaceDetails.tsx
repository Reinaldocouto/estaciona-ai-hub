
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { AlertCircle, Loader2, CheckCircle, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { fetchSpace } from '@/api/spaces';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { 
  SpaceGallery,
  SpaceHeader,
  SpaceInfoTabs,
  SpaceBookingCard
} from '@/components/ui-custom/space-details';

const SpaceDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  console.log('🔍 SpaceDetails - ID from params:', id);
  console.log('🔍 SpaceDetails - ID type:', typeof id);
  
  const [activeTab, setActiveTab] = useState<string>('details');
  const [paymentStatus, setPaymentStatus] = useState<'success' | 'cancelled' | null>(null);
  const [processingPayment, setProcessingPayment] = useState(false);

  const { data: space, isLoading, error } = useQuery({
    queryKey: ['space', id],
    queryFn: () => {
      console.log('🔍 useQuery - Calling fetchSpace with ID:', id);
      return fetchSpace(id as string);
    },
    enabled: !!id,
    retry: 1,
  });

  // Log error if exists
  useEffect(() => {
    if (error) {
      console.error('🔍 useQuery - Error fetching space:', error);
    }
  }, [error]);

  // Handle payment return
  useEffect(() => {
    const payment = searchParams.get('payment');
    const sessionId = searchParams.get('session_id');

    if (payment === 'success' && sessionId) {
      setPaymentStatus('success');
      setProcessingPayment(true);
      
      // Process the payment success directly
      const processPayment = async () => {
        try {
          const { data, error } = await supabase.functions.invoke('process-payment-success', {
            body: { sessionId }
          });
          
          setProcessingPayment(false);
          if (data?.success) {
            toast({
              title: "🎉 Reserva Confirmada!",
              description: data.message || "Sua reserva foi confirmada com sucesso!",
              variant: "default",
            });
            // Clear URL parameters after processing
            navigate(`/spaces/${id}`, { replace: true });
          } else if (error || data?.success === false) {
            console.error('Error processing payment:', error || data);
            toast({
              title: "Erro no processamento",
              description: "Houve um erro ao processar seu pagamento. Entre em contato conosco.",
              variant: "destructive",
            });
          }
        } catch (err) {
          setProcessingPayment(false);
          console.error('Error:', err);
          toast({
            title: "Erro no processamento",
            description: "Houve um erro ao processar seu pagamento. Entre em contato conosco.",
            variant: "destructive",
          });
        }
      };
      
      processPayment();
    } else if (payment === 'cancelled') {
      setPaymentStatus('cancelled');
      toast({
        title: "Pagamento cancelado",
        description: "O pagamento foi cancelado. Você pode tentar novamente quando quiser.",
        variant: "destructive",
      });
      // Clear URL parameters after showing message
      setTimeout(() => {
        navigate(`/spaces/${id}`, { replace: true });
      }, 3000);
    }
  }, [searchParams, id, navigate]);

  // Loading state
  if (isLoading) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-gray-50 pb-12 pt-8">
          <div className="container mx-auto px-4">
            <div className="flex flex-col items-center justify-center py-12">
              <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
              <h2 className="text-xl font-medium text-gray-900">Carregando informações da vaga...</h2>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  // Error state
  if (error || !space) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-gray-50 pb-12 pt-8">
          <div className="container mx-auto px-4">
            <div className="flex flex-col items-center justify-center py-12">
              <AlertCircle className="h-12 w-12 text-red-500 mb-4" />
              <h2 className="text-xl font-bold mb-4 text-gray-900">Vaga não encontrada</h2>
              <p className="text-gray-600 mb-6">
                Não foi possível encontrar os detalhes desta vaga. Por favor, tente novamente mais tarde.
              </p>
              <Button onClick={() => navigate('/spaces')}>
                Voltar para pesquisa
              </Button>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  // Payment status notification
  const renderPaymentNotification = () => {
    if (!paymentStatus) return null;

    return (
      <div className="container mx-auto px-4 py-4">
        <Card className={`border ${paymentStatus === 'success' ? 'border-green-500 bg-green-50' : 'border-red-500 bg-red-50'}`}>
          <CardContent className="p-4 flex items-center gap-3">
            {paymentStatus === 'success' ? (
              <>
                <CheckCircle className="h-6 w-6 text-green-600" />
                {processingPayment ? (
                  <div className="flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin text-green-600" />
                    <p className="text-green-800 font-medium">Processando sua reserva...</p>
                  </div>
                ) : (
                  <div>
                    <p className="text-green-800 font-medium">Pagamento confirmado!</p>
                    <p className="text-green-600 text-sm">Sua reserva está sendo processada e você receberá uma confirmação em breve.</p>
                  </div>
                )}
              </>
            ) : (
              <>
                <XCircle className="h-6 w-6 text-red-600" />
                <div>
                  <p className="text-red-800 font-medium">Pagamento cancelado</p>
                  <p className="text-red-600 text-sm">O pagamento foi cancelado. Você pode tentar reservar novamente.</p>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    );
  };

  return (
    <>
      <Navbar />
      
      <main className="min-h-screen bg-gray-50 pb-12">
        <SpaceGallery space={space} />
        
        {renderPaymentNotification()}

        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <SpaceHeader space={space} />
              <SpaceInfoTabs 
                space={space}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
              />
            </div>

            {/* Booking Card */}
            <div>
              <SpaceBookingCard space={space} />
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </>
  );
};

export default SpaceDetails;
