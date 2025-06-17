
# Estaciona Aí - Plataforma de Compartilhamento de Vagas de Estacionamento

## 📋 Sobre o Projeto

O **Estaciona Aí** é uma plataforma web inovadora desenvolvida como projeto acadêmico do 4º ano do curso de Sistemas de Informação da FIAP. A aplicação conecta proprietários de vagas de estacionamento com motoristas que procuram locais para estacionar, criando um marketplace eficiente e sustentável para o compartilhamento de espaços urbanos.

### 🎯 Objetivos do Projeto

- **Otimização do espaço urbano**: Maximizar o uso de vagas ociosas
- **Mobilidade urbana inteligente**: Reduzir o tempo de busca por estacionamento
- **Sustentabilidade**: Diminuir emissões através da redução de circulação desnecessária
- **Economia colaborativa**: Gerar renda extra para proprietários de vagas

## 🏗️ Arquitetura do Sistema

### Arquitetura Geral
```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   Backend       │    │   Integrações   │
│   (React/Vite)  │◄──►│   (Supabase)    │◄──►│   Externas      │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         │                       │                       │
    ┌────▼────┐             ┌────▼────┐             ┌────▼────┐
    │ UI/UX   │             │Database │             │ Google  │
    │Components│             │PostgreSQL│            │ Maps    │
    └─────────┘             └─────────┘             └─────────┘
                                   │                       │
                              ┌────▼────┐             ┌────▼────┐
                              │Auth &   │             │ Stripe  │
                              │Security │             │Payments │
                              └─────────┘             └─────────┘
```

### Padrões Arquiteturais Implementados

1. **Single Page Application (SPA)**: Interface reativa e fluida
2. **Component-Based Architecture**: Reutilização e manutenibilidade
3. **REST API**: Comunicação padronizada com o backend
4. **Real-time Security (RLS)**: Segurança em nível de linha no banco
5. **Serverless Functions**: Edge Functions para lógica de negócio

## 🛠️ Stack Tecnológica

### Frontend
- **React 18.3.1**: Biblioteca principal para construção da interface
- **TypeScript**: Tipagem estática para maior robustez
- **Vite**: Build tool moderno e performático
- **Tailwind CSS**: Framework CSS utility-first
- **Shadcn/UI**: Biblioteca de componentes acessíveis
- **React Router DOM**: Roteamento client-side
- **React Hook Form**: Gerenciamento de formulários
- **Zod**: Validação de schemas TypeScript-first

### Backend e Infraestrutura
- **Supabase**: Backend-as-a-Service (BaaS)
  - PostgreSQL: Banco de dados relacional
  - Authentication: Sistema de autenticação completo
  - Real-time: Sincronização em tempo real
  - Edge Functions: Funções serverless
  - Row Level Security (RLS): Segurança granular

### Integração de APIs Externas

#### 🗺️ Geolocalização - Google Maps Platform
- **Maps JavaScript API**: Renderização de mapas interativos
- **Places API**: Busca e detalhes de localizações
- **Geocoding API**: Conversão entre endereços e coordenadas
- **Distance Matrix API**: Cálculo de distâncias e rotas

**Configuração da API:**
```typescript
// Configuração no ambiente
VITE_GMAPS_KEY=your_google_maps_api_key_here

// Implementação no código
import { useGoogleMaps } from '@/hooks/useGoogleMaps';
const { isLoaded, getGeocodeForAddress } = useGoogleMaps();
```

#### 💳 Pagamentos - Stripe
- **Checkout Sessions**: Fluxo de pagamento seguro
- **Subscriptions**: Gerenciamento de assinaturas Premium
- **Customer Portal**: Auto-atendimento para clientes
- **Webhooks**: Sincronização de eventos de pagamento

**Fluxo de Pagamento:**
```typescript
// Edge Function para criar sessão de checkout
const session = await stripe.checkout.sessions.create({
  mode: "subscription",
  line_items: [{ price_data: { ... } }],
  success_url: `${origin}/premium?success=true`,
  cancel_url: `${origin}/premium?canceled=true`,
});
```

### Ferramentas de Desenvolvimento
- **ESLint**: Linting e padronização de código
- **PostCSS**: Processamento de CSS
- **Lucide React**: Biblioteca de ícones
- **React Query (@tanstack/react-query)**: Gerenciamento de estado servidor
- **Date-fns**: Manipulação de datas

## 📊 Modelagem de Dados

### Principais Entidades

```sql
-- Tabela de Perfis de Usuário
CREATE TABLE profiles (
  id uuid PRIMARY KEY REFERENCES auth.users,
  email text,
  premium boolean DEFAULT false,
  premium_until timestamptz,
  created_at timestamptz DEFAULT now()
);

-- Tabela de Vagas de Estacionamento
CREATE TABLE vagas (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  titulo text NOT NULL,
  endereco text,
  price numeric NOT NULL,
  image_url text,
  features text[],
  available boolean DEFAULT true,
  discount_premium boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Tabela de Reservas
CREATE TABLE reservas (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid,
  vaga_id uuid,
  start_time timestamptz NOT NULL,
  end_time timestamptz NOT NULL,
  total_price numeric,
  status text DEFAULT 'active',
  created_at timestamptz DEFAULT now()
);
```

### Políticas de Segurança (RLS)
- **Isolamento por usuário**: Cada usuário acessa apenas seus dados
- **Validação de permissões**: Verificação em tempo de execução
- **Auditoria de acesso**: Log de todas as operações sensíveis

## 🚀 Funcionalidades Principais

### Para Motoristas
- 🔍 **Busca Inteligente**: Encontre vagas por localização, preço e disponibilidade
- 📍 **Mapa Interativo**: Visualização em tempo real das vagas disponíveis
- 💰 **Comparação de Preços**: Filtros avançados para melhor custo-benefício
- 📱 **Reserva Instantânea**: Sistema de reserva em tempo real
- ⭐ **Sistema de Avaliações**: Feedback da comunidade

### Para Proprietários
- 📝 **Cadastro Simplificado**: Interface intuitiva para adicionar vagas
- 💵 **Gestão de Preços**: Controle total sobre precificação
- 📊 **Dashboard Analítico**: Relatórios de uso e rentabilidade
- 🔔 **Notificações**: Alertas de reservas e pagamentos

### Sistema Premium
- 🎯 **Descontos Exclusivos**: 10% em vagas participantes + bônus progressivo
- ⚡ **Prioridade na Busca**: Vagas premium em destaque
- 🅿️ **Acesso VIP**: Vagas exclusivas em localizações premium
- 🕐 **Cancelamento Flexível**: Até 1 hora antes sem penalidade

## 🔧 Configuração e Instalação

### Pré-requisitos
- Node.js 18+ e npm
- Conta no Google Cloud Platform (Maps API)
- Conta no Stripe (Pagamentos)
- Projeto no Supabase

### Instalação Local

1. **Clone o repositório:**
```bash
git clone <repository-url>
cd estaciona-ai
```

2. **Instale as dependências:**
```bash
npm install
```

3. **Configure as variáveis de ambiente:**
```bash
# .env.local
VITE_GMAPS_KEY=your_google_maps_api_key_here
```

4. **Configure o Supabase:**
- URL: `https://axtopbwmwmajrrujqoza.supabase.co`
- Anon Key: Configurada no projeto
- Execute as migrações SQL fornecidas

5. **Configure o Stripe:**
- Adicione sua SECRET_KEY nas Edge Function Secrets do Supabase
- Configure os webhooks se necessário

6. **Execute o projeto:**
```bash
npm run dev
```

## 🧪 Testes e Qualidade

### Estratégia de Testes
- **Testes Unitários**: Componentes e funções utilitárias
- **Testes de Integração**: Fluxos completos de usuário
- **Testes de API**: Validação das Edge Functions
- **Testes de Responsividade**: Compatibilidade mobile

### Métricas de Qualidade
- TypeScript strict mode habilitado
- ESLint configurado com regras rigorosas
- Componentes acessíveis (WCAG 2.1)
- Performance otimizada (Lighthouse Score 90+)

## 📈 Escalabilidade e Performance

### Otimizações Implementadas
- **Lazy Loading**: Carregamento sob demanda de componentes
- **Image Optimization**: Compressão e formatos modernos
- **Caching**: Estratégias de cache para APIs
- **Code Splitting**: Divisão inteligente do bundle
- **CDN**: Entrega de assets otimizada

### Monitoramento
- Logs estruturados das Edge Functions
- Métricas de performance do frontend
- Alertas de erro em tempo real
- Analytics de uso da aplicação

## 🔒 Segurança

### Medidas Implementadas
- **Autenticação JWT**: Tokens seguros e expiráveis
- **HTTPS Obrigatório**: Comunicação criptografada
- **RLS Policies**: Isolamento de dados por usuário
- **Input Validation**: Sanitização de todas as entradas
- **Rate Limiting**: Proteção contra ataques DDoS

### Compliance
- LGPD: Proteção de dados pessoais
- PCI DSS: Segurança em pagamentos (via Stripe)
- OWASP Top 10: Mitigação das principais vulnerabilidades

## 📱 Responsividade e UX

### Design System
- **Mobile First**: Desenvolvido prioritariamente para dispositivos móveis
- **Consistent UI**: Componentes padronizados com Shadcn/UI
- **Accessibility**: Suporte completo a leitores de tela
- **Dark/Light Mode**: Temas adaptativos
- **PWA Ready**: Preparado para Progressive Web App

## 🌐 Deploy e Infraestrutura

### Ambientes
- **Desenvolvimento**: Local com hot-reload
- **Staging**: Ambiente de homologação automático
- **Produção**: Deploy automatizado via Lovable Platform

### CI/CD Pipeline
```yaml
Build → Test → Security Scan → Deploy → Health Check
```

## 👥 Equipe de Desenvolvimento

**Curso**: Sistemas de Informação - FIAP  
**Período**: 4º Ano  
**Disciplina**: Projeto Integrador

### Tecnologias por Categoria
- **Frontend Framework**: React com TypeScript
- **Styling**: Tailwind CSS + Shadcn/UI
- **State Management**: React Query + Context API
- **Backend**: Supabase (PostgreSQL + Edge Functions)
- **Authentication**: Supabase Auth
- **Maps**: Google Maps Platform
- **Payments**: Stripe
- **Hosting**: Lovable Platform

## 📚 Documentação Adicional

### APIs e Integrações
- [Google Maps Platform Documentation](https://developers.google.com/maps/documentation)
- [Stripe API Reference](https://stripe.com/docs/api)
- [Supabase Documentation](https://supabase.com/docs)

### Padrões de Código
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [React Best Practices](https://react.dev/learn)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

## 🤝 Contribuição

Este é um projeto acadêmico desenvolvido para fins educacionais. Para contribuições ou sugestões, entre em contato com a equipe de desenvolvimento.

## 📄 Licença

Este projeto foi desenvolvido como trabalho acadêmico para a FIAP e está sujeito às políticas de propriedade intelectual da instituição.

---

**Estaciona Aí** - Transformando a mobilidade urbana através da tecnologia  
*FIAP - Faculdade de Informática e Administração Paulista*  
*Sistemas de Informação - 4º Ano*
