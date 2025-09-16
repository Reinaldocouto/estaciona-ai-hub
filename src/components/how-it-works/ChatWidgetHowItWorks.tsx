import React, { useState } from 'react';
import { MessageCircle, X, Send, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';

type Message = {
  sender: 'user' | 'bot';
  text: string;
  timestamp: Date;
};

const quickRepliesHowItWorks = [
  "Como faço uma reserva?",
  "Como funciona o SmartMatch?",
  "Como alugo minha vaga?",
  "Quais são as taxas?",
  "Como funciona o pagamento?",
  "É seguro usar a plataforma?"
];

const ChatWidgetHowItWorks: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: 'bot',
      text: "Olá! 👋 Sou o Gepeto-IA e estou aqui para esclarecer suas dúvidas sobre como funciona o Estaciona Aí. Como posso ajudar?",
      timestamp: new Date(),
    },
  ]);
  const [newMessage, setNewMessage] = useState('');
  
  const getBotResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();
    
    if (message.includes('reserva') || message.includes('reservar') || message.includes('como faço')) {
      return "Para fazer uma reserva: 1️⃣ Digite o endereço ou use o GPS, 2️⃣ Escolha a vaga pelo SmartMatch, 3️⃣ Confirme horário e forma de pagamento, 4️⃣ Chegue no local e faça check-in pelo QR code. Simples assim! 🚗";
    }
    
    if (message.includes('smartmatch') || message.includes('smart match') || message.includes('ia') || message.includes('inteligente')) {
      return "O SmartMatch é nossa IA que ranqueia vagas por custo × proximidade! 🤖 Ele analisa preços da região, distância da sua localização e seus filtros para mostrar as melhores opções primeiro. Badges especiais indicam: 🏆 melhor preço na área, 📍 perto de você, ✅ recursos completos.";
    }
    
    if (message.includes('alugo') || message.includes('alugar') || message.includes('proprietário') || message.includes('vaga')) {
      return "Para alugar sua vaga: 1️⃣ Cadastre com fotos e detalhes, 2️⃣ Defina preço e disponibilidade, 3️⃣ Aguarde aprovação (verificamos CPF/CNPJ), 4️⃣ Receba reservas automaticamente! 💰 Ganhe até R$ 800/mês com pagamento D+1 via PIX.";
    }
    
    if (message.includes('taxa') || message.includes('taxas') || message.includes('comissão') || message.includes('custo')) {
      return "Nossas taxas são transparentes: 📊 Motoristas: taxa de conveniência de 5-8% sobre a reserva. 🏠 Proprietários: 15% sobre o valor recebido (já descontado). Pagamentos via PIX são gratuitos, cartão tem taxa do operador.";
    }
    
    if (message.includes('pagamento') || message.includes('pagar') || message.includes('pix') || message.includes('cartão')) {
      return "Pagamentos são seguros e flexíveis: 💳 Motoristas pagam por PIX (instantâneo) ou cartão. 💰 Proprietários recebem em D+1 via PIX automaticamente. Usamos criptografia bancária e compliance PCI DSS para máxima segurança.";
    }
    
    if (message.includes('segur') || message.includes('confiável') || message.includes('protegido')) {
      return "Segurança é nossa prioridade! 🛡️ Verificamos CPF/CNPJ de todos os usuários, oferecemos seguro de até R$ 50.000 por reserva, usamos autenticação JWT e todos os pagamentos são criptografados. Seus dados estão protegidos!";
    }
    
    if (message.includes('premium') || message.includes('plano')) {
      return "O Premium oferece vantagens exclusivas: ⭐ 10% desconto + bônus em todas as reservas, 🔝 Prioridade na busca, 🚗 Acesso a vagas VIP, 🔄 Cancelamento flexível, 🎧 Suporte diferenciado. Assine e economize mais!";
    }
    
    if (message.includes('cancelar') || message.includes('cancelamento')) {
      return "Cancelamentos são flexíveis: ⏰ Até 2h antes: cancelamento gratuito para ambos. ⏱️ Menos de 2h: motorista paga 30% da reserva, proprietário pode recusar com multa de 20%. Check-in feito: cobrança integral.";
    }
    
    if (message.includes('app') || message.includes('mobile') || message.includes('celular')) {
      return "Nossa plataforma funciona perfeitamente no navegador do seu celular! 📱 É responsiva e otimizada para mobile. Em breve teremos apps nativos iOS e Android. Por enquanto, adicione o site à tela inicial para acesso rápido!";
    }
    
    if (message.includes('suporte') || message.includes('ajuda') || message.includes('contato')) {
      return "Suporte disponível 24/7: 💬 Chat aqui mesmo, 📧 Email: contato@estacionaai.com.br, 📞 WhatsApp: (11) 9999-9999. Usuários Premium têm linha direta e atendimento prioritário!";
    }
    
    // Resposta padrão
    return "Interessante! 🤔 Posso explicar melhor sobre: reservas, SmartMatch (IA), aluguel de vagas, taxas, pagamentos, segurança, Premium ou cancelamentos. Sobre qual desses você gostaria de saber mais?";
  };
  
  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      sender: 'user',
      text: newMessage,
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, userMessage]);
    const messageToProcess = newMessage;
    setNewMessage('');
    
    // Simulate bot response after a short delay
    setTimeout(() => {
      const botResponse = getBotResponse(messageToProcess);
      
      const botMessage: Message = {
        sender: 'bot',
        text: botResponse,
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, botMessage]);
    }, 800);
  };
  
  const handleQuickReply = (reply: string) => {
    setNewMessage(reply);
    // Focus on input after selecting a quick reply
    setTimeout(() => {
      document.getElementById('chat-input-how-it-works')?.focus();
    }, 100);
  };

  return (
    <>
      {/* Chat widget button */}
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-20 right-6 rounded-full w-16 h-16 shadow-lg z-40 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
        aria-label="Abrir chat de dúvidas"
      >
        <HelpCircle size={28} />
      </Button>
      
      {/* Chat panel */}
      {isOpen && (
        <Card className="fixed bottom-36 right-6 w-[380px] max-w-[calc(100vw-2rem)] h-[520px] max-h-[calc(100vh-10rem)] z-50 flex flex-col shadow-2xl border-2 border-primary/20">
          {/* Header */}
          <div className="flex justify-between items-center p-4 font-medium border-b bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-lg">
            <div className="flex items-center gap-2">
              <HelpCircle size={20} />
              <h3>Gepeto-IA | Como Funciona</h3>
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setIsOpen(false)}
              className="text-white hover:bg-white/20 h-8 w-8 p-0"
            >
              <X size={18} />
            </Button>
          </div>
          
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {messages.map((message, index) => (
              <div 
                key={index}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`max-w-[85%] p-3 rounded-lg text-sm ${
                    message.sender === 'user' 
                      ? 'bg-blue-600 text-white rounded-br-sm' 
                      : 'bg-white border border-gray-200 text-gray-800 rounded-bl-sm'
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}
          </div>
          
          {/* Quick replies */}
          {messages.length <= 2 && (
            <div className="p-3 border-t bg-white">
              <p className="text-xs text-muted-foreground mb-3 font-medium">💡 Perguntas frequentes:</p>
              <div className="grid grid-cols-2 gap-2">
                {quickRepliesHowItWorks.map((reply, index) => (
                  <Button 
                    key={index}
                    variant="outline"
                    size="sm"
                    onClick={() => handleQuickReply(reply)}
                    className="text-xs h-8 justify-start border-blue-200 hover:border-blue-400 hover:bg-blue-50"
                  >
                    {reply}
                  </Button>
                ))}
              </div>
            </div>
          )}
          
          {/* Input */}
          <div className="p-3 border-t bg-white">
            <form 
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex gap-2"
            >
              <Input
                id="chat-input-how-it-works"
                type="text"
                placeholder="Digite sua dúvida..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                className="flex-1 text-sm"
              />
              <Button 
                type="submit" 
                size="icon" 
                className="bg-blue-600 hover:bg-blue-700"
                aria-label="Enviar mensagem"
              >
                <Send size={18} />
              </Button>
            </form>
          </div>
        </Card>
      )}
    </>
  );
};

export default ChatWidgetHowItWorks;