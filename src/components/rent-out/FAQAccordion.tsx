
import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQAccordion = () => {
  const faqs = [
    {
      question: "Quanto recebo por minha vaga?",
      answer: "Você define o preço por hora da sua vaga. Em média, nossos locadores recebem entre R$ 400 e R$ 800 por mês, dependendo da localização e disponibilidade. A Estaciona Aí cobra apenas 15% de comissão sobre cada reserva concretizada.",
      link: "/docs/ganhos"
    },
    {
      question: "E se o motorista atrasar?",
      answer: "Se o motorista ultrapassar o tempo reservado, ele será cobrado automaticamente pela hora adicional com base na sua tarifa. Você não precisa se preocupar com cobranças ou discussões - nosso sistema gerencia isso automaticamente e você recebe por todo o tempo utilizado.",
      link: "/docs/atrasos"
    },
    {
      question: "Como funciona o seguro?",
      answer: "Todas as reservas incluem um seguro no valor de até R$ 50.000 que cobre danos ao seu espaço, portão, fachada ou qualquer parte da propriedade causados durante o uso da vaga. O seguro é ativado automaticamente com cada reserva.",
      link: "/docs/seguro"
    },
    {
      question: "Preciso estar presente para receber o motorista?",
      answer: "Não! O sistema é totalmente self-service. Você apenas cadastra as instruções de acesso uma vez, e os motoristas seguem essas instruções. Para vagas que exigem chaves ou controles, oferecemos soluções de acesso digital ou lockbox.",
      link: "/docs/acesso"
    },
    {
      question: "Como recebo meu dinheiro?",
      answer: "Os pagamentos são processados automaticamente após cada uso da vaga, com depósito via PIX no dia seguinte (D+1). Você pode acompanhar todos os ganhos e transferências pelo painel do proprietário.",
      link: "/docs/pagamentos"
    }
  ];

  return (
    <section className="py-12">
      <h2 className="text-3xl font-bold mb-8 text-center">Perguntas Frequentes</h2>
      <div className="max-w-4xl mx-auto">
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-lg font-medium text-left">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent>
                <p className="mb-4">{faq.answer}</p>
                <a 
                  href={faq.link} 
                  className="text-primary hover:underline flex items-center"
                >
                  Saiba mais
                </a>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQAccordion;
