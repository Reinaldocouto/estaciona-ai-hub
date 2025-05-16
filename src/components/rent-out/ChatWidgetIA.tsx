
import React, { useState } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';

interface ChatWidgetIAProps {
  botName: string;
  greeting: string;
  themeColor: string;
}

type Message = {
  sender: 'user' | 'bot';
  text: string;
  timestamp: Date;
};

const quickReplies = [
  "Como funciona o cadastro?",
  "Quanto posso ganhar?",
  "É seguro alugar minha vaga?"
];

const ChatWidgetIA: React.FC<ChatWidgetIAProps> = ({ botName, greeting, themeColor }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: 'bot',
      text: greeting,
      timestamp: new Date(),
    },
  ]);
  const [newMessage, setNewMessage] = useState('');
  
  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      sender: 'user',
      text: newMessage,
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setNewMessage('');
    
    // Simulate bot response after a short delay
    setTimeout(() => {
      let botResponse: string;
      
      if (newMessage.toLowerCase().includes('preço') || newMessage.toLowerCase().includes('ganhar')) {
        botResponse = "Você pode definir o preço da sua vaga e ganhar até R$ 800 por mês, dependendo da localização e disponibilidade. Todos os pagamentos são processados via PIX em D+1.";
      } else if (newMessage.toLowerCase().includes('seguro') || newMessage.toLowerCase().includes('segurança')) {
        botResponse = "Todas as reservas incluem seguro de até R$ 50.000 que cobre danos à sua propriedade. Também verificamos o CPF/CNPJ de todos os motoristas.";
      } else if (newMessage.toLowerCase().includes('cadastro') || newMessage.toLowerCase().includes('começar')) {
        botResponse = "O cadastro é simples e rápido! Basta preencher o formulário com os dados da sua vaga, definir a disponibilidade e o preço. Em poucos minutos sua vaga estará disponível para reservas.";
      } else {
        botResponse = "Obrigado pela sua mensagem! Como posso ajudar com sua vaga de estacionamento? Você pode perguntar sobre o processo de cadastro, segurança ou pagamentos.";
      }
      
      const botMessage: Message = {
        sender: 'bot',
        text: botResponse,
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, botMessage]);
    }, 1000);
  };
  
  const handleQuickReply = (reply: string) => {
    setNewMessage(reply);
    // Focus on input after selecting a quick reply
    document.getElementById('chat-input')?.focus();
  };

  return (
    <>
      {/* Chat widget button */}
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 rounded-full w-16 h-16 shadow-lg z-50"
        aria-label="Abrir chat de ajuda"
        style={{ backgroundColor: themeColor }}
      >
        <MessageCircle size={28} />
      </Button>
      
      {/* Chat panel */}
      {isOpen && (
        <Card className="fixed bottom-24 right-6 w-[350px] max-w-[calc(100vw-2rem)] h-[500px] max-h-[calc(100vh-10rem)] z-50 flex flex-col shadow-xl">
          {/* Header */}
          <div 
            className="flex justify-between items-center p-4 font-medium border-b"
            style={{ backgroundColor: themeColor, color: 'white' }}
          >
            <h3>{botName}</h3>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setIsOpen(false)}
              className="text-white hover:bg-white/20"
            >
              <X size={18} />
            </Button>
          </div>
          
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message, index) => (
              <div 
                key={index}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`max-w-[80%] p-3 rounded-lg ${
                    message.sender === 'user' 
                      ? 'bg-primary text-primary-foreground' 
                      : 'bg-muted'
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}
          </div>
          
          {/* Quick replies */}
          {messages.length < 3 && (
            <div className="p-3 border-t">
              <p className="text-xs text-muted-foreground mb-2">Perguntas frequentes:</p>
              <div className="flex flex-wrap gap-2">
                {quickReplies.map((reply, index) => (
                  <Button 
                    key={index}
                    variant="outline"
                    size="sm"
                    onClick={() => handleQuickReply(reply)}
                    className="text-xs"
                  >
                    {reply}
                  </Button>
                ))}
              </div>
            </div>
          )}
          
          {/* Input */}
          <div className="p-3 border-t">
            <form 
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex gap-2"
            >
              <Input
                id="chat-input"
                type="text"
                placeholder="Digite sua mensagem..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                className="flex-1"
              />
              <Button type="submit" size="icon" aria-label="Enviar mensagem">
                <Send size={18} />
              </Button>
            </form>
          </div>
        </Card>
      )}
    </>
  );
};

export default ChatWidgetIA;
