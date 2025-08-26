import React from 'react';
import { Button } from '@/components/ui/button';
import { Sparkles, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useGeolocation } from '@/hooks/useGeolocation';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

const SmartMatchButton: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { getCurrentLocation, loading } = useGeolocation();
  const { toast } = useToast();

  const handleSmartMatch = async () => {
    if (!user) {
      toast({
        title: "Login necessário",
        description: "Faça login para usar o SmartMatch",
        variant: "destructive",
      });
      return;
    }

    const location = await getCurrentLocation();
    
    if (location) {
      toast({
        title: "🤖 SmartMatch ativado",
        description: "Buscando as melhores vagas para você...",
      });
      
      // Navigate to spaces with AI enabled and user location
      navigate(`/spaces?lat=${location.lat}&lng=${location.lng}&smartmatch=true&q=SmartMatch`);
    }
  };

  return (
    <Button
      onClick={handleSmartMatch}
      disabled={loading || !user}
      className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold px-6 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
      title={!user ? "Faça login para usar o SmartMatch" : ""}
    >
      {loading ? (
        <>
          <MapPin className="mr-2 h-5 w-5 animate-spin" />
          Localizando...
        </>
      ) : (
        <>
          <Sparkles className="mr-2 h-5 w-5" />
          SmartMatch
        </>
      )}
    </Button>
  );
};

export default SmartMatchButton;