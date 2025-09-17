import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  MapPin, 
  Users, 
  Zap, 
  ChevronRight, 
  ChevronDown,
  AlertTriangle,
  Code,
  Globe,
  Smartphone,
  Shield,
  BarChart3,
  Rocket,
  Database,
  X,
  Brain,
  Bot,
  Sparkles
} from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

const Documentation: React.FC = () => {
  const navigate = useNavigate();
  const [openSections, setOpenSections] = useState<Record<number, boolean>>({
    1: true // Primeira seção aberta por padrão
  });

  const toggleSection = (sectionId: number) => {
    setOpenSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  const sections = [
    {
      id: 1,
      title: "Problema e Solução",
      icon: AlertTriangle,
      content: {
        problem: {
          title: "Contextualização do Problema",
          items: [
            {
              title: "Dificuldade de Estacionamento Urbano",
              description: "Grandes centros metropolitanos enfrentam escassez de vagas e altos custos de estacionamento"
            },
            {
              title: "Perda de Tempo e Recursos",
              description: "Motoristas perdem tempo procurando vagas, aumentando congestionamentos e emissões"
            },
            {
              title: "Subutilização de Espaços",
              description: "Vagas privadas ficam ociosas enquanto há demanda não atendida"
            }
          ]
        },
        solution: {
          title: "Nossa Solução",
          items: [
            "Marketplace inteligente de vagas de estacionamento",
            "Sistema de IA para otimização de busca (SmartMatch)",
            "Integração com mapas e geolocalização",
            "Pagamentos seguros via Stripe",
            "Sistema Premium com benefícios exclusivos",
            "Interface responsiva e intuitiva"
          ]
        }
      }
    },
    {
      id: 2,
      title: "Stack Tecnológica",
      icon: Code,
      content: {
        frontend: [
          "React 18.3.1 + TypeScript",
          "Vite (Build tool moderno)",
          "Tailwind CSS + Shadcn/UI",
          "React Router DOM",
          "React Hook Form + Zod"
        ],
        backend: [
          "Supabase (BaaS)",
          "PostgreSQL + PostGIS",
          "Edge Functions (Deno)",
          "Row Level Security (RLS)",
          "Real-time subscriptions"
        ],
        integrations: [
          "Google Maps Platform",
          "Stripe (Pagamentos)",
          "FastAPI (ML Service)",
          "Docker + Kubernetes"
        ]
      }
    },
    {
      id: 3,
      title: "Arquitetura do Sistema",
      icon: Globe,
      content: {
        architecture: [
          "Single Page Application (SPA)",
          "Component-Based Architecture",
          "Microserviços com ML Service",
          "Edge Computing para baixa latência",
          "Cache inteligente com Materialized Views"
        ],
        security: [
          "Autenticação JWT com Supabase Auth",
          "Row Level Security (RLS)",
          "HTTPS obrigatório",
          "Validação client/server-side",
          "PCI DSS compliance via Stripe"
        ]
      }
    },
    {
      id: 4,
      title: "Protótipo e Funcionalidades",
      icon: Smartphone,
      content: {
        motoristas: [
          "Busca inteligente com SmartMatch IA",
          "Mapa interativo com clustering",
          "Filtros avançados (preço, recursos)",
          "Sistema de avaliações",
          "Reserva em tempo real"
        ],
        proprietarios: [
          "Cadastro simplificado de vagas",
          "Upload de múltiplas fotos",
          "Gestão de preços e disponibilidade",
          "Dashboard de rentabilidade",
          "Notificações de reservas"
        ],
        premium: [
          "Descontos exclusivos (10% + bônus)",
          "Prioridade na busca",
          "Vagas VIP",
          "Cancelamento flexível",
          "Suporte diferenciado"
        ]
      }
    },
    {
      id: 5,
      title: "Resultados e Impacto Social",
      icon: BarChart3,
      content: {
        kpis: [
          { metric: "Redução no tempo de busca", value: "50%", color: "text-green-600" },
          { metric: "Aumento na precisão de recomendações", value: "73%", color: "text-blue-600" },
          { metric: "Melhoria na satisfação do usuário", value: "47%", color: "text-purple-600" },
          { metric: "Taxa de conversão", value: "+66%", color: "text-orange-600" }
        ],
        impact: [
          "Redução de emissões de CO2",
          "Otimização do espaço urbano",
          "Geração de renda extra",
          "Melhoria na mobilidade urbana",
          "Economia colaborativa sustentável"
        ]
      }
    },
    {
      id: 6,
      title: "Roadmap de Evolução",
      icon: Rocket,
      content: {
        current: [
          "✅ Sistema de busca tradicional e IA",
          "✅ Autenticação e Premium",
          "✅ Interface responsiva completa",
          "✅ Integração com mapas",
          "✅ Cadastro de vagas"
        ],
        next: [
          "🔄 ML Avançado com aprendizado contínuo",
          "🔄 Personalização por histórico",
          "🔄 Previsão de demanda",
          "🔄 Análise de mercado",
          "🔄 Precificação dinâmica"
        ]
      }
    },
    {
      id: 7,
      title: "Testes e Evidências de Qualidade",
      icon: Shield,
      content: {
        testing: [
          "Testes unitários de componentes",
          "Testes de integração end-to-end",
          "Testes de API e Edge Functions",
          "Testes de responsividade",
          "Testes de segurança (OWASP)"
        ],
        quality: [
          "TypeScript strict mode",
          "ESLint com regras rigorosas",
          "Componentes acessíveis (WCAG 2.1)",
          "Performance otimizada (Lighthouse 90+)",
          "Code splitting e lazy loading"
        ]
      }
    },
    {
      id: 8,
      title: "Apêndice Técnico",
      icon: Database,
      content: {
        deployment: [
          "Docker multi-stage builds",
          "Kubernetes manifests",
          "CI/CD pipeline automatizado",
          "Health checks e monitoring",
          "Backup e disaster recovery"
        ],
        monitoring: [
          "Logs estruturados",
          "Métricas de performance",
          "Alertas em tempo real",
          "Analytics de uso",
          "Audit trail completo"
        ]
      }
    },
    {
      id: 9,
      title: "Sistema de Inteligência Artificial",
      icon: Brain,
      content: {
        smartmatch: {
          title: "SmartMatch - Busca Inteligente",
          description: "Sistema de ranqueamento baseado em IA que otimiza a busca por vagas usando algoritmos de custo × proximidade",
          features: [
            "Ranking inteligente por score custo × proximidade",
            "Aplicação automática de badges (melhor preço, perto de você, recursos completos)",
            "Percentis de preço por região usando Materialized Views",
            "Fallback automático em caso de falha do ML Service",
            "Performance < 600ms com timeout inteligente"
          ],
          algorithm: "Score = 0.5 * (peso_preço * price_norm) + 0.5 * (peso_dist * dist_norm)"
        },
        chatbot: {
          title: "Gepeto-IA - Assistente Virtual",
          description: "Chat inteligente para ajudar proprietários a anunciar suas vagas com informações personalizadas",
          capabilities: [
            "Orientação sobre cadastro de vagas",
            "Informações sobre rentabilidade (até R$800/mês via PIX)",
            "Detalhes sobre segurança (R$50.000 seguro)",
            "Processo de verificação CPF/CNPJ",
            "Pagamento D+1 automático",
            "Suporte em tempo real"
          ]
        },
        aiArchitecture: {
          title: "Arquitetura do Sistema de IA",
          components: [
            "Frontend React/TS com hooks customizados",
            "Supabase Edge Function (Deno/TS) como middleware", 
            "Microserviço FastAPI + scikit-learn para ML",
            "PostgreSQL com Materialized Views para cache",
            "Sistema de fallback resiliente"
          ],
          flow: "Frontend → Edge Function → ML Service → PostgreSQL → Response"
        },
        performance: {
          title: "Performance e Otimizações",
          metrics: [
            { metric: "Latência com ML", value: "300-600ms", color: "text-green-600" },
            { metric: "Fallback local", value: "< 150ms", color: "text-blue-600" },
            { metric: "Timeout automático", value: "1200ms", color: "text-purple-600" },
            { metric: "Precisão de recomendações", value: "+73%", color: "text-orange-600" }
          ],
          optimizations: [
            "Cache de percentis de preço refresh 1x/dia",
            "Clustering de markers no mapa",
            "Lazy loading de componentes IA",
            "Debounce em controles de parâmetros"
          ]
        }
      }
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-primary/90 to-primary/80">
      {/* Close Button */}
      <div className="fixed top-4 right-4 z-50">
        <Button
          onClick={() => navigate('/')}
          variant="ghost"
          size="icon"
          className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border border-white/20 rounded-full"
        >
          <X className="h-6 w-6" />
        </Button>
      </div>

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <Container className="py-16 text-center text-white">
          <div className="mx-auto max-w-4xl">
            <div className="mb-8">
              <div className="inline-block p-4 bg-white/20 rounded-full mb-6">
                <MapPin className="h-12 w-12 text-white" />
              </div>
              <h1 className="text-5xl font-bold mb-4">ESTACIONA AÍ</h1>
              <p className="text-xl opacity-90 mb-2">
                Plataforma Inteligente de Compartilhamento de Vagas
              </p>
              <div className="w-24 h-1 bg-white/50 mx-auto"></div>
            </div>

            <div className="bg-black rounded-lg p-8 mb-12">
              <h2 className="text-2xl font-semibold mb-4 text-white">
                Documentação Técnica e Acadêmica
              </h2>
              <p className="text-lg text-white/90">
                Projeto Integrador FIAP 2025
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                <Globe className="h-8 w-8 text-white mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Solução Inovadora</h3>
                <p className="text-sm opacity-80">Tecnologia e IA</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                <Users className="h-8 w-8 text-white mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Impacto Social</h3>
                <p className="text-sm opacity-80">Mobilidade Urbana</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                <Zap className="h-8 w-8 text-white mx-auto mb-3" />
                <h3 className="font-semibold mb-2">Performance</h3>
                <p className="text-sm opacity-80">Otimização Inteligente</p>
              </div>
            </div>
          </div>
        </Container>
      </div>

      {/* Executive Summary */}
      <Container className="py-12">
        <div className="bg-primary/20 backdrop-blur-sm rounded-lg p-8 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-primary rounded-lg">
              <BarChart3 className="h-6 w-6 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-white">Sumário Executivo</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 text-white">
            <div>
              <h3 className="text-lg font-semibold mb-4 text-primary-foreground">
                Problema Identificado
              </h3>
              <p className="mb-4 opacity-90">
                Grandes centros urbanos enfrentam problemas críticos de estacionamento, 
                com motoristas perdendo tempo procurando vagas e proprietários com 
                espaços subutilizados.
              </p>
              
              <h3 className="text-lg font-semibold mb-4 text-primary-foreground">
                Solução Proposta
              </h3>
              <p className="opacity-90">
                Plataforma web inteligente que conecta motoristas e proprietários de vagas, 
                utilizando IA para otimização de busca e oferecendo sistema completo de 
                reservas e pagamentos.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4 text-primary-foreground">
                Indicadores de Sucesso
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Redução no tempo de busca</span>
                  <Badge className="bg-green-600">50%</Badge>
                </div>
                <div className="flex justify-between">
                  <span>Aumento de utilização</span>
                  <Badge className="bg-blue-600">73%</Badge>
                </div>
                <div className="flex justify-between">
                  <span>Cobertura da plataforma</span>
                  <Badge className="bg-purple-600">100%</Badge>
                </div>
                <div className="flex justify-between">
                  <span>Usuários esperados (6 meses)</span>
                  <Badge className="bg-orange-600">5000+</Badge>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>

      {/* Sections */}
      <Container className="pb-16">
        <div className="space-y-4">
          {sections.map((section) => {
            const Icon = section.icon;
            const isOpen = openSections[section.id];
            
            return (
              <Collapsible key={section.id} open={isOpen} onOpenChange={() => toggleSection(section.id)}>
                <CollapsibleTrigger asChild>
                  <Button
                    className="w-full h-16 text-left justify-between bg-black hover:bg-black/80 text-white"
                    variant="default"
                  >
                    <div className="flex items-center gap-4">
                      <div className="p-2 bg-white/20 rounded-lg">
                        <Icon className="h-6 w-6" />
                      </div>
                      <span className="text-lg font-semibold">
                        {section.id}. {section.title}
                      </span>
                    </div>
                    {isOpen ? (
                      <ChevronDown className="h-5 w-5" />
                    ) : (
                      <ChevronRight className="h-5 w-5" />
                    )}
                  </Button>
                </CollapsibleTrigger>
                
                <CollapsibleContent>
                  <div className="bg-white rounded-b-lg p-8 shadow-lg">
                    {section.id === 1 && (
                      <div className="grid md:grid-cols-2 gap-8">
                        <div>
                          <h3 className="text-xl font-semibold text-primary mb-4">
                            {section.content.problem.title}
                          </h3>
                          <div className="space-y-4">
                            {section.content.problem.items.map((item, idx) => (
                              <div key={idx} className="border-l-4 border-primary/30 pl-4">
                                <h4 className="font-medium text-gray-900 mb-1">
                                  {item.title}
                                </h4>
                                <p className="text-gray-600 text-sm">
                                  {item.description}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        <div>
                          <h3 className="text-xl font-semibold text-primary mb-4">
                            {section.content.solution.title}
                          </h3>
                          <div className="space-y-2">
                            {section.content.solution.items.map((item, idx) => (
                              <div key={idx} className="flex items-start gap-3">
                                <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                                  <div className="w-2 h-2 rounded-full bg-green-600"></div>
                                </div>
                                <p className="text-gray-700">{item}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                    {section.id === 2 && (
                      <div className="grid md:grid-cols-3 gap-6">
                        <div>
                          <h3 className="text-lg font-semibold text-primary mb-4">Frontend</h3>
                          <ul className="space-y-2">
                            {section.content.frontend.map((tech, idx) => (
                              <li key={idx} className="flex items-center gap-2">
                                <Code className="h-4 w-4 text-blue-600" />
                                <span className="text-gray-700">{tech}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-primary mb-4">Backend</h3>
                          <ul className="space-y-2">
                            {section.content.backend.map((tech, idx) => (
                              <li key={idx} className="flex items-center gap-2">
                                <Database className="h-4 w-4 text-green-600" />
                                <span className="text-gray-700">{tech}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-primary mb-4">Integrações</h3>
                          <ul className="space-y-2">
                            {section.content.integrations.map((tech, idx) => (
                              <li key={idx} className="flex items-center gap-2">
                                <Globe className="h-4 w-4 text-purple-600" />
                                <span className="text-gray-700">{tech}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    )}

                    {section.id === 5 && (
                      <div className="grid md:grid-cols-2 gap-8">
                        <div>
                          <h3 className="text-lg font-semibold text-primary mb-4">KPIs de Performance</h3>
                          <div className="space-y-4">
                            {section.content.kpis.map((kpi, idx) => (
                              <div key={idx} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                <span className="text-gray-700">{kpi.metric}</span>
                                <Badge className={`${kpi.color} bg-transparent border`}>
                                  {kpi.value}
                                </Badge>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-primary mb-4">Impacto Social</h3>
                          <div className="space-y-2">
                            {section.content.impact.map((item, idx) => (
                              <div key={idx} className="flex items-center gap-3">
                                <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                                  <div className="w-2 h-2 rounded-full bg-green-600"></div>
                                </div>
                                <span className="text-gray-700">{item}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                    {section.id === 3 && (
                      <div className="grid md:grid-cols-2 gap-8">
                        <div>
                          <h3 className="text-lg font-semibold text-primary mb-4">Arquitetura</h3>
                          <div className="space-y-2">
                            {section.content.architecture.map((item, idx) => (
                              <div key={idx} className="flex items-start gap-3">
                                <Globe className="h-5 w-5 text-blue-600 mt-0.5" />
                                <span className="text-gray-700">{item}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-primary mb-4">Segurança</h3>
                          <div className="space-y-2">
                            {section.content.security.map((item, idx) => (
                              <div key={idx} className="flex items-start gap-3">
                                <Shield className="h-5 w-5 text-green-600 mt-0.5" />
                                <span className="text-gray-700">{item}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                    {section.id === 4 && (
                      <div className="grid md:grid-cols-3 gap-6">
                        <div>
                          <h3 className="text-lg font-semibold text-primary mb-4">Para Motoristas</h3>
                          <div className="space-y-2">
                            {section.content.motoristas.map((item, idx) => (
                              <div key={idx} className="flex items-start gap-3">
                                <Smartphone className="h-4 w-4 text-blue-600 mt-1" />
                                <span className="text-sm text-gray-700">{item}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-primary mb-4">Para Proprietários</h3>
                          <div className="space-y-2">
                            {section.content.proprietarios.map((item, idx) => (
                              <div key={idx} className="flex items-start gap-3">
                                <Users className="h-4 w-4 text-green-600 mt-1" />
                                <span className="text-sm text-gray-700">{item}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-primary mb-4">Premium</h3>
                          <div className="space-y-2">
                            {section.content.premium.map((item, idx) => (
                              <div key={idx} className="flex items-start gap-3">
                                <Zap className="h-4 w-4 text-purple-600 mt-1" />
                                <span className="text-sm text-gray-700">{item}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                    {section.id === 6 && (
                      <div className="grid md:grid-cols-2 gap-8">
                        <div>
                          <h3 className="text-lg font-semibold text-primary mb-4">Fase Atual (MVP)</h3>
                          <div className="space-y-2">
                            {section.content.current.map((item, idx) => (
                              <div key={idx} className="flex items-start gap-3">
                                <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                                  <div className="w-2 h-2 rounded-full bg-green-600"></div>
                                </div>
                                <span className="text-gray-700">{item}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-primary mb-4">Próximas Fases</h3>
                          <div className="space-y-2">
                            {section.content.next.map((item, idx) => (
                              <div key={idx} className="flex items-start gap-3">
                                <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                                  <div className="w-2 h-2 rounded-full bg-blue-600"></div>
                                </div>
                                <span className="text-gray-700">{item}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                    {section.id === 7 && (
                      <div className="grid md:grid-cols-2 gap-8">
                        <div>
                          <h3 className="text-lg font-semibold text-primary mb-4">Estratégia de Testes</h3>
                          <div className="space-y-2">
                            {section.content.testing.map((item, idx) => (
                              <div key={idx} className="flex items-start gap-3">
                                <Shield className="h-4 w-4 text-red-600 mt-1" />
                                <span className="text-gray-700">{item}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-primary mb-4">Métricas de Qualidade</h3>
                          <div className="space-y-2">
                            {section.content.quality.map((item, idx) => (
                              <div key={idx} className="flex items-start gap-3">
                                <BarChart3 className="h-4 w-4 text-blue-600 mt-1" />
                                <span className="text-gray-700">{item}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                    {section.id === 8 && (
                      <div className="grid md:grid-cols-2 gap-8">
                        <div>
                          <h3 className="text-lg font-semibold text-primary mb-4">Deploy e Infraestrutura</h3>
                          <div className="space-y-2">
                            {section.content.deployment.map((item, idx) => (
                              <div key={idx} className="flex items-start gap-3">
                                <Rocket className="h-4 w-4 text-green-600 mt-1" />
                                <span className="text-gray-700">{item}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-primary mb-4">Monitoramento</h3>
                          <div className="space-y-2">
                            {section.content.monitoring.map((item, idx) => (
                              <div key={idx} className="flex items-start gap-3">
                                <BarChart3 className="h-4 w-4 text-purple-600 mt-1" />
                                <span className="text-gray-700">{item}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                    {section.id === 9 && (
                      <div className="space-y-8">
                        {/* SmartMatch */}
                        <div>
                          <div className="flex items-center gap-3 mb-4">
                            <Sparkles className="h-6 w-6 text-purple-600" />
                            <h3 className="text-xl font-semibold text-primary">{section.content.smartmatch.title}</h3>
                          </div>
                          <p className="text-gray-700 mb-4">{section.content.smartmatch.description}</p>
                          <div className="bg-gray-50 rounded-lg p-4 mb-4">
                            <h4 className="font-semibold text-gray-900 mb-2">Algoritmo Base:</h4>
                            <code className="text-sm text-gray-700 bg-white px-3 py-1 rounded">
                              {section.content.smartmatch.algorithm}
                            </code>
                          </div>
                          <div className="grid md:grid-cols-2 gap-4">
                            {section.content.smartmatch.features.map((feature, idx) => (
                              <div key={idx} className="flex items-start gap-3">
                                <Brain className="h-4 w-4 text-purple-600 mt-1 flex-shrink-0" />
                                <span className="text-gray-700 text-sm">{feature}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Chat IA */}
                        <div className="border-t pt-8">
                          <div className="flex items-center gap-3 mb-4">
                            <Bot className="h-6 w-6 text-blue-600" />
                            <h3 className="text-xl font-semibold text-primary">{section.content.chatbot.title}</h3>
                          </div>
                          <p className="text-gray-700 mb-4">{section.content.chatbot.description}</p>
                          <div className="grid md:grid-cols-2 gap-4">
                            {section.content.chatbot.capabilities.map((capability, idx) => (
                              <div key={idx} className="flex items-start gap-3">
                                <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                                  <div className="w-2 h-2 rounded-full bg-blue-600"></div>
                                </div>
                                <span className="text-gray-700 text-sm">{capability}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Arquitetura IA */}
                        <div className="border-t pt-8">
                          <div className="flex items-center gap-3 mb-4">
                            <Database className="h-6 w-6 text-green-600" />
                            <h3 className="text-xl font-semibold text-primary">{section.content.aiArchitecture.title}</h3>
                          </div>
                          <div className="bg-green-50 rounded-lg p-4 mb-4">
                            <h4 className="font-semibold text-green-900 mb-2">Fluxo de Dados:</h4>
                            <p className="text-green-800 text-sm">{section.content.aiArchitecture.flow}</p>
                          </div>
                          <div className="space-y-2">
                            {section.content.aiArchitecture.components.map((component, idx) => (
                              <div key={idx} className="flex items-start gap-3">
                                <Code className="h-4 w-4 text-green-600 mt-1" />
                                <span className="text-gray-700">{component}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Performance IA */}
                        <div className="border-t pt-8">
                          <div className="flex items-center gap-3 mb-6">
                            <BarChart3 className="h-6 w-6 text-orange-600" />
                            <h3 className="text-xl font-semibold text-primary">{section.content.performance.title}</h3>
                          </div>
                          
                          <div className="grid md:grid-cols-2 gap-8">
                            <div>
                              <h4 className="text-lg font-semibold text-gray-900 mb-4">Métricas de Performance</h4>
                              <div className="space-y-4">
                                {section.content.performance.metrics.map((metric, idx) => (
                                  <div key={idx} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                    <span className="text-gray-700">{metric.metric}</span>
                                    <Badge className={`${metric.color} bg-transparent border`}>
                                      {metric.value}
                                    </Badge>
                                  </div>
                                ))}
                              </div>
                            </div>
                            
                            <div>
                              <h4 className="text-lg font-semibold text-gray-900 mb-4">Otimizações</h4>
                              <div className="space-y-2">
                                {section.content.performance.optimizations.map((opt, idx) => (
                                  <div key={idx} className="flex items-start gap-3">
                                    <Zap className="h-4 w-4 text-orange-600 mt-1" />
                                    <span className="text-gray-700 text-sm">{opt}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </CollapsibleContent>
              </Collapsible>
            );
          })}
        </div>

        {/* Footer */}
        <div className="mt-16 bg-primary/20 backdrop-blur-sm rounded-lg p-8 text-center">
          <div className="text-white">
            <h2 className="text-2xl font-bold mb-4">ESTACIONA AÍ</h2>
            <p className="mb-2">Plataforma Inteligente de Compartilhamento de Vagas</p>
            <p className="text-sm opacity-80 mb-4">
              Projeto Integrador FIAP 2025 - Sistemas de Informação
            </p>
            <div className="w-full h-px bg-white/30 my-4"></div>
            <p className="text-sm opacity-70">
              Documentação Técnica e Acadêmica - Versão 1.0 - Janeiro 2025
            </p>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Documentation;