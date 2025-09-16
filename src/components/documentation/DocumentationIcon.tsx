import React, { useState } from 'react';
import { FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { useNavigate } from 'react-router-dom';

const DocumentationIcon: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleOpenDocumentation = () => {
    setIsOpen(false);
    navigate('/documentation');
  };

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 left-6 z-50 h-12 w-12 rounded-full bg-primary/90 text-primary-foreground shadow-lg hover:bg-primary hover:scale-105 transition-all duration-200"
        aria-label="Abrir documentação"
      >
        <FileText className="h-5 w-5" />
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              Documentação do Projeto
            </DialogTitle>
            <DialogDescription>
              Acesse a documentação técnica e acadêmica completa do Estaciona Aí, 
              incluindo arquitetura, funcionalidades e especificações do sistema.
            </DialogDescription>
          </DialogHeader>
          
          <div className="flex flex-col gap-4 pt-4">
            <div className="text-sm text-muted-foreground">
              <p>A documentação inclui:</p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>Arquitetura do sistema</li>
                <li>Stack tecnológica</li>
                <li>Funcionalidades implementadas</li>
                <li>Sistema de IA SmartMatch</li>
                <li>Medidas de segurança</li>
                <li>Infraestrutura e deploy</li>
              </ul>
            </div>
            
            <div className="flex gap-3">
              <Button onClick={handleOpenDocumentation} className="flex-1">
                Abrir Documentação
              </Button>
              <Button variant="outline" onClick={() => setIsOpen(false)} className="flex-1">
                Fechar
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DocumentationIcon;