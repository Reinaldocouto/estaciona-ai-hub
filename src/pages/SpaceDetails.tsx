
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { AlertCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { fetchSpace } from '@/api/spaces';
import { 
  SpaceGallery,
  SpaceHeader,
  SpaceInfoTabs,
  SpaceBookingCard
} from '@/components/ui-custom/space-details';

const SpaceDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<string>('details');

  const { data: space, isLoading, error } = useQuery({
    queryKey: ['space', id],
    queryFn: () => fetchSpace(id as string),
    enabled: !!id,
    retry: 1,
  });

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

  return (
    <>
      <Navbar />
      
      <main className="min-h-screen bg-gray-50 pb-12">
        <SpaceGallery space={space} />

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
