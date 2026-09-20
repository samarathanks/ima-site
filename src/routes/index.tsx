import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowRight,
  CalendarCheck,
  Award,
  BookOpen,
  BriefcaseBusiness,
  Bus,
  Check,
  ChevronDown,
  CreditCard,
  Gift,
  HeartHandshake,
  House,
  Instagram,
  Landmark,
  Mail,
  Menu,
  MessageCircle,
  Phone,
  ReceiptText,
  Scale,
  ShoppingBasket,
  Smartphone,
  Sparkles,
  Upload,
  Users,
  Utensils,
  WalletCards,
  X,
} from "lucide-react";
import { useState } from "react";

import appCartao from "@/assets/app-cartao.png.asset.json";
import appPerfil from "@/assets/app-perfil.png.asset.json";
import appSaldo from "@/assets/app-saldo.png.asset.json";
import brandExperience from "@/assets/ima-brand-experience.png.asset.json";
import officialCard from "@/assets/ima-cartao-oficial.png.asset.json";
import heroPoster from "@/assets/ima-hero-poster.jpg.asset.json";
import heroVideo from "@/assets/ima-hero-impacto-web.mp4.asset.json";
import heroPeople from "@/assets/ima-hero-pessoas.jpg";
import deliveryExperience from "@/assets/ima-entrega-experiencia.jpg";
import logoWhiteCoral from "@/assets/ima-logo-white-coral.png";
import { Button } from "@/components/ui/button";

const CONTACT_LINKS = {
  email: "mailto:contato@ima.com.br",
  phone: "tel:+5511996443300",
  whatsapp: "https://wa.me/5511996443300",
  instagram: "https://instagram.com/somos.ima",
};

// Quando existir um link real de agenda, informe-o aqui. Enquanto estiver
// vazio, o CTA "Agendar uma conversa" leva ao formulário de reunião comercial.
const SCHEDULE_LINK = "";
const MEETING_HREF = SCHEDULE_LINK || "#reuniao";
const PREVIEW_HREF = "#previa";

// Endpoint preparado para futura integração de CRM (ex.: Zoho).
// Enquanto estiver vazio, os dados são organizados em um e-mail comercial.
const LEAD_ENDPOINT = "";

const INTEREST_OPTIONS = [
  "Alimentação",
  "Refeição",
  "Mobilidade",
  "Vale-transporte",
  "Premiação",
  "Clube de benefícios",
  "Outros benefícios",
];

const MEETING_TOPICS = [
  "Cartão multibenefícios",
  "Personalização com a marca da empresa",
  "Alimentação e refeição",
  "Mobilidade e vale-transporte",
  "Premiação",
  "Clube de benefícios",
  "PAT e gestão responsável",
  "Quero avaliar a solução completa",
];

const PRIVACY_NOTE =
  "Seus dados serão utilizados apenas para o atendimento da sua solicitação, conforme nossa Política de Privacidade.";


const benefits = [
  { icon: ShoppingBasket, title: "Alimentação", text: "Compras para a rotina, conforme a categoria contratada." },
  { icon: Utensils, title: "Refeição", text: "Praticidade em restaurantes e estabelecimentos compatíveis." },
  { icon: Bus, title: "Mobilidade", text: "Mais flexibilidade nos deslocamentos do dia a dia." },
  { icon: WalletCards, title: "Vale-transporte", text: "Gestão integrada, conforme serviços e cobertura disponíveis." },
  { icon: HeartHandshake, title: "Saúde e bem-estar", text: "Apoio a uma estratégia mais ampla de cuidado com as pessoas." },
  { icon: BookOpen, title: "Educação", text: "Possibilidade de apoiar aprendizado e desenvolvimento." },
  { icon: House, title: "Home office", text: "Recursos para apoiar a rotina de trabalho remoto." },
  { icon: Award, title: "Premiação", text: "Reconhecimento de campanhas, metas e momentos importantes." },
  { icon: BriefcaseBusiness, title: "Saldo livre", text: "Disponível quando aplicável ao produto contratado." },
  { icon: ReceiptText, title: "Gestão de despesas", text: "Controle de gastos corporativos com regras de uso definidas pela empresa." },
  { icon: Landmark, title: "Antecipação salarial", text: "Acesso antecipado a parte do salário, conforme contratação e regras definidas pela empresa." },
  { icon: Gift, title: "Clube de benefícios", text: "Condições e vantagens adicionais conforme o ecossistema disponível." },
];

const companyBenefits = [
  "Fortalecimento do employer branding",
  "Maior percepção de valor",
  "Reforço da cultura organizacional",
  "Pertencimento e reconhecimento",
  "Apoio à atração e retenção de talentos",
  "Gestão mais organizada dos benefícios",
];

const employeeBenefits = [
  "Cartão para diferentes momentos",
  "Consulta de saldo e compras",
  "Gestão e segurança pelo aplicativo",
  "Pagamento por aproximação",
  "Experiência com a identidade da empresa",
  "Acesso a vantagens e benefícios",
];

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Imã | Cartão multibenefícios com a marca da sua empresa" },
      {
        name: "description",
        content: "Cartão multibenefícios Visa, aplicativo e comunicação com a identidade da sua empresa. Benefícios que atraem. Pessoas que ficam.",
      },
      { property: "og:title", content: "Imã | Benefícios que atraem. Pessoas que ficam." },
      { property: "og:description", content: "Multibenefícios, cartão e aplicativo com a identidade da sua empresa." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function HeroMedia() {
  return (
    <div className="relative aspect-video w-full overflow-hidden bg-primary">
      <img
        src={heroPoster.url}
        alt="Pessoas reunidas durante uma refeição com a mensagem Sua empresa tem Imã?"
        width={1920}
        height={1080}
        fetchPriority="high"
        className="absolute inset-0 h-full w-full object-contain"
      />
      <video
        className="hero-video absolute inset-0 h-full w-full object-contain"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster={heroPoster.url}
        aria-label="Vídeo institucional da Imã sobre benefícios, cartão e experiência personalizada"
      >
        <source src={heroVideo.url} type="video/mp4" />
      </video>
    </div>
  );
}

type LeadKind = "previa" | "reuniao";

const LEAD_LABEL: Record<LeadKind, string> = {
  previa: "Solicitação de prévia personalizada",
  reuniao: "Solicitação de reunião comercial",
};

function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [notice, setNotice] = useState<Record<LeadKind, { text: string; ok: boolean } | null>>({
    previa: null,
    reuniao: null,
  });
  const [sending, setSending] = useState<LeadKind | null>(null);

  function handleSubmit(kind: LeadKind, cta: string) {
    return (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      if (sending) return;
      const form = event.currentTarget;
      const data = new FormData(form);

      const fail = (text: string) => setNotice((prev) => ({ ...prev, [kind]: { text, ok: false } }));

      if (data.get("consentimento") !== "on") {
        fail("Confirme o consentimento para continuar.");
        return;
      }
      const logoFile = data.get("logo");
      if (logoFile instanceof File && logoFile.size > 5 * 1024 * 1024) {
        fail("O arquivo do logotipo deve ter até 5 MB.");
        return;
      }

      const value = (key: string, fallback = "Não informado") => {
        const field = data.get(key);
        return typeof field === "string" && field.trim() ? field.trim().slice(0, 1000) : fallback;
      };
      const list = (key: string) => {
        const items = data.getAll(key).filter((item): item is string => typeof item === "string");
        return items.length ? items.join(", ") : "Não informado";
      };

      setSending(kind);

      const base = [
        `Tipo de conversão: ${LEAD_LABEL[kind]}`,
        `CTA utilizado: ${cta}`,
        `Origem: ${typeof window !== "undefined" ? window.location.href : "site Imã"}`,
        `Data e horário: ${new Date().toLocaleString("pt-BR")}`,
        "Consentimento de contato: concedido",
        "",
        `Nome: ${value("nome")}`,
        `Empresa: ${value("empresa")}`,
        `Cargo: ${value("cargo")}`,
        `E-mail corporativo: ${value("email")}`,
        `WhatsApp: ${value("whatsapp")}`,
        `Colaboradores: ${value("colaboradores")}`,
      ];

      const extra =
        kind === "previa"
          ? [
              `Benefícios de maior interesse: ${list("interesses")}`,
              `Logotipo: ${logoFile instanceof File && logoFile.size > 0 ? "será anexado ao e-mail" : "não enviado"}`,
            ]
          : [
              `O que deseja conhecer: ${value("tema")}`,
              `Benefício ou necessidade principal: ${value("necessidade")}`,
              `Melhor período para contato: ${value("periodo")}`,
              "",
              `Observações: ${value("mensagem", "—")}`,
            ];

      const subject = encodeURIComponent(LEAD_LABEL[kind]);
      const body = encodeURIComponent([...base, ...extra].join("\n"));

      // Estrutura pronta para uma futura integração de CRM.
      if (LEAD_ENDPOINT) {
        void fetch(LEAD_ENDPOINT, {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({
            tipo_conversao: LEAD_LABEL[kind],
            cta,
            origem: typeof window !== "undefined" ? window.location.href : "",
            enviado_em: new Date().toISOString(),
            consentimento: true,
            campos: Object.fromEntries(
              [...data.entries()].filter(([, item]) => typeof item === "string"),
            ),
          }),
        }).catch(() => undefined);
      }


      setNotice((prev) => ({
        ...prev,
        [kind]: {
          ok: true,
          text:
            kind === "previa"
              ? "Recebemos suas informações. Nossa equipe avaliará a melhor forma de apresentar a sua marca na experiência IMÃ e entrará em contato."
              : "Recebemos sua solicitação. Nossa equipe entrará em contato para entender o cenário da sua empresa e apresentar a solução mais adequada.",
        },
      }));

      window.location.href = `${CONTACT_LINKS.email}?subject=${subject}&body=${body}`;
      form.reset();
      window.setTimeout(() => setSending(null), 4000);
    };
  }

  const closeMenu = () => setMenuOpen(false);


  return (
    <main className="min-h-screen overflow-hidden bg-background text-foreground">
      <header className="sticky top-0 z-50 border-b border-primary-foreground/15 bg-primary text-primary-foreground">
        <div className="mx-auto flex h-20 max-w-[90rem] items-center justify-between px-5 sm:px-8 lg:px-10">
          <a href="#inicio" aria-label="Imã — início" className="shrink-0">
            <img src={logoWhiteCoral} alt="Imã" className="h-10 w-auto" />
          </a>
          <nav className="hidden items-center gap-5 xl:flex" aria-label="Navegação principal">
            <a className="nav-link" href="#cartao">O cartão</a>
            <a className="nav-link" href="#beneficios">Benefícios</a>
            <a className="nav-link" href="#sua-marca">Sua marca na Imã</a>
            <a className="nav-link" href="#empresas">Para empresas</a>
            <a className="nav-link" href="#seguranca">PAT e segurança</a>
            <a className="nav-link" href="#duvidas">Dúvidas</a>
            <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
              <a href={MEETING_HREF}><CalendarCheck /> Agendar uma conversa</a>
            </Button>

          </nav>
          <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground xl:hidden" onClick={() => setMenuOpen((value) => !value)} aria-label={menuOpen ? "Fechar menu" : "Abrir menu"} aria-expanded={menuOpen}>
            {menuOpen ? <X /> : <Menu />}
          </Button>
        </div>
        {menuOpen && (
          <nav className="border-t border-primary-foreground/15 bg-primary px-5 py-6 xl:hidden" aria-label="Menu móvel">
            <div className="mx-auto flex max-w-7xl flex-col gap-5">
              {[['O cartão', '#cartao'], ['Benefícios', '#beneficios'], ['Sua marca na Imã', '#sua-marca'], ['Para empresas', '#empresas'], ['PAT e segurança', '#seguranca'], ['Dúvidas', '#duvidas']].map(([label, href]) => (
                <a key={href} className="nav-link" href={href} onClick={closeMenu}>{label}</a>
              ))}
              <Button asChild className="mt-2 bg-accent text-accent-foreground hover:bg-accent/90"><a href={MEETING_HREF} onClick={closeMenu}><CalendarCheck /> Agendar uma conversa</a></Button>
              <Button asChild variant="outline" className="border-brand-mint/60 bg-transparent text-brand-mint"><a href={PREVIEW_HREF} onClick={closeMenu}>Quero ver minha marca no cartão</a></Button>

            </div>
          </nav>
        )}
      </header>

      <section id="inicio" className="relative isolate min-h-[calc(100svh-5rem)] overflow-hidden bg-primary text-primary-foreground">
        <img src={heroPeople} alt="Profissionais brasileiros reunidos em um momento de convivência" width={1920} height={1088} fetchPriority="high" className="absolute inset-0 h-full w-full object-cover object-[68%_center]" />
        <div className="hero-fade absolute inset-0" />
        <div className="relative mx-auto grid min-h-[calc(100svh-5rem)] max-w-7xl items-center gap-10 px-5 py-14 sm:px-8 lg:grid-cols-[1.05fr_.95fr] lg:px-12">
          <div className="max-w-2xl animate-rise">
            <p className="inline-flex rounded-full border border-primary-foreground/30 bg-primary/80 px-4 py-2 text-xs font-extrabold uppercase text-brand-mint">Cartão multibenefícios</p>
            <h1 className="mt-6 text-4xl font-extrabold leading-[1.03] sm:text-5xl lg:text-6xl">O benefício da sua empresa com a marca da sua empresa.</h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-primary-foreground/85">Alimentação, refeição, mobilidade, premiação e outros benefícios em um cartão e aplicativo personalizados com a identidade da sua empresa.</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Button asChild size="lg" className="h-auto min-h-12 bg-accent px-6 py-3 text-accent-foreground hover:bg-accent/90"><a href={PREVIEW_HREF}>Quero ver minha marca no cartão <ArrowRight /></a></Button>
              <Button asChild size="lg" variant="outline" className="h-auto min-h-12 border-brand-mint/60 bg-transparent px-6 py-3 text-brand-mint hover:bg-brand-mint hover:text-primary"><a href={MEETING_HREF}><CalendarCheck /> Agendar uma conversa</a></Button>
              <Button asChild size="lg" variant="outline" className="h-auto min-h-12 border-primary-foreground/40 bg-primary/30 px-6 py-3 text-primary-foreground hover:bg-primary-foreground hover:text-primary"><a href="#beneficios">Conhecer os benefícios</a></Button>

            </div>
            <p className="mt-9 text-xl font-extrabold text-brand-mint">Sua empresa tem IMÃ?</p>
          </div>
          <div className="self-end pb-2 lg:pb-10">
            <img src={officialCard.url} alt="Cartão verde oficial da Imã com bandeira Visa" width={669} height={403} className="mx-auto w-full max-w-sm object-contain drop-shadow-2xl lg:ml-auto lg:max-w-xl" />
          </div>
        </div>
      </section>

      <section aria-label="Vídeo institucional da Imã" className="bg-primary-deep py-8 sm:py-12">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12"><div className="overflow-hidden rounded-md"><HeroMedia /></div></div>
      </section>

      <section id="cartao" className="bg-surface py-20 sm:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-[.85fr_1.15fr] lg:items-center lg:px-12">
          <div>
            <p className="eyebrow">Cartão multibenefícios</p>
            <h2 className="section-title mt-4">Um cartão. Múltiplas possibilidades.</h2>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">A Imã reúne diferentes categorias em um cartão físico Visa e um aplicativo para consultar saldo, acompanhar compras e gerenciar a experiência.</p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {["Cartão físico Visa", "Pagamento por aproximação", "Compras físicas e digitais", "Gestão pelo aplicativo"].map((item) => <p key={item} className="flex items-center gap-3 font-bold text-primary"><span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-brand-mint"><Check className="size-4" /></span>{item}</p>)}
            </div>
          </div>
          <img src={officialCard.url} alt="Cartão verde oficial da Imã com bandeira Visa" width={669} height={403} loading="lazy" className="w-full object-contain" />
        </div>
      </section>

      <section id="sua-marca" className="bg-primary py-20 text-primary-foreground sm:py-28">
        <div className="mx-auto grid max-w-7xl gap-14 px-5 sm:px-8 lg:grid-cols-[.9fr_1.1fr] lg:items-center lg:px-12">
          <div>
            <p className="eyebrow text-brand-mint">O maior diferencial</p>
            <h2 className="mt-4 text-4xl font-extrabold leading-tight sm:text-5xl">Seu benefício pode carregar a marca que seus colaboradores já conhecem.</h2>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-primary-foreground/75">A IMÃ transforma o cartão de benefícios em uma extensão da identidade da sua empresa. Cartão, aplicativo e experiência de entrega podem ser personalizados para fortalecer pertencimento, reconhecimento e conexão com os colaboradores.</p>
            <p className="mt-7 border-l-4 border-accent pl-5 text-xl font-bold">O benefício é oferecido pela sua empresa. A marca lembrada também pode ser a sua.</p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row"><Button asChild size="lg" className="h-auto min-h-12 bg-accent px-6 py-3 text-accent-foreground hover:bg-accent/90"><a href={PREVIEW_HREF}>Criar uma prévia personalizada <ArrowRight /></a></Button><Button asChild size="lg" variant="outline" className="h-auto min-h-12 border-brand-mint/60 bg-transparent px-6 py-3 text-brand-mint hover:bg-brand-mint hover:text-primary"><a href={MEETING_HREF}><CalendarCheck /> Agendar uma conversa</a></Button></div>
          </div>
          <div className="relative">
            <img src={brandExperience.url} alt="Exemplo conceitual de experiência personalizada com cartão, aplicativo e materiais de marca" loading="lazy" className="aspect-[4/3] w-full rounded-md object-cover" />
            <p className="mt-4 text-sm leading-relaxed text-primary-foreground/65">Exemplo conceitual. As possibilidades de personalização dependem da configuração contratada e da validação técnica.</p>
          </div>
        </div>
      </section>

      <section id="beneficios" className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <div className="max-w-3xl"><p className="eyebrow">Benefícios para diferentes momentos</p><h2 className="section-title mt-4">Uma solução que acompanha a vida real.</h2><p className="mt-5 text-lg leading-relaxed text-muted-foreground">Categorias e experiências disponíveis conforme a configuração contratada e a validação técnica.</p></div>
          <div className="mt-12 grid gap-px overflow-hidden rounded-md border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
            {benefits.map(({ icon: Icon, title, text }) => <article key={title} className="group min-h-60 bg-background p-7 transition-colors hover:bg-surface sm:p-8"><div className="flex size-11 items-center justify-center rounded-md bg-brand-mint text-primary"><Icon className="size-5" /></div><h3 className="mt-7 text-xl font-bold text-primary">{title}</h3><p className="mt-3 leading-relaxed text-muted-foreground">{text}</p></article>)}
          </div>
          <Button asChild size="lg" variant="outline" className="mt-10 h-auto min-h-12 border-primary/30 px-6 py-3 text-primary hover:bg-primary hover:text-primary-foreground"><a href={MEETING_HREF}><CalendarCheck /> Entender como funciona</a></Button>

        </div>
      </section>

      <section className="bg-surface py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <div className="grid gap-8 lg:grid-cols-5">
            <div className="lg:col-span-2"><p className="eyebrow">Uma experiência integrada</p><h2 className="section-title mt-4">Sua identidade em cada ponto de contato.</h2><p className="mt-6 text-lg leading-relaxed text-muted-foreground">Personalização vai além de cores e logotipo. Ela aproxima benefícios, cultura e reconhecimento em toda a jornada.</p></div>
            <div className="grid gap-px overflow-hidden rounded-md border border-border bg-border sm:grid-cols-2 lg:col-span-3">
              {["Cartão com a marca da empresa", "Aplicativo personalizado", "Carta-berço", "Comunicação de implantação", "Materiais de ativação", "Jornada de boas-vindas"].map((item) => <div key={item} className="flex min-h-28 items-center gap-4 bg-background p-6"><Sparkles className="size-5 shrink-0 text-accent" /><p className="font-bold text-primary">{item}</p></div>)}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:items-center">
            <div className="relative flex h-[490px] items-end justify-center overflow-hidden rounded-md bg-primary sm:h-[570px]">
              <div className="absolute inset-x-0 top-0 p-8 sm:p-10"><p className="text-xs font-bold uppercase tracking-[.16em] text-brand-mint">Cartão e aplicativo</p><h2 className="mt-4 max-w-md text-3xl font-extrabold leading-tight text-primary-foreground sm:text-4xl">A marca da empresa acompanha o colaborador.</h2></div>
              <img src={appSaldo.url} alt="Tela de saldo no aplicativo Imã" loading="lazy" className="absolute bottom-[-8%] left-[3%] h-[62%] rotate-[-5deg] drop-shadow-2xl" />
              <img src={appCartao.url} alt="Tela de cartão no aplicativo Imã" loading="lazy" className="absolute bottom-[-3%] z-10 h-[70%] drop-shadow-2xl" />
              <img src={appPerfil.url} alt="Tela de perfil no aplicativo Imã" loading="lazy" className="absolute bottom-[-8%] right-[-2%] h-[62%] rotate-[5deg] drop-shadow-2xl" />
            </div>
            <div><p className="eyebrow">Experiência do colaborador</p><h2 className="section-title mt-4">Simples para usar. Fácil de reconhecer.</h2><p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">O cartão e o aplicativo entram na rotina como uma extensão do cuidado da empresa — com autonomia, informação e identidade.</p><div className="mt-9 grid gap-4 sm:grid-cols-2">{employeeBenefits.map((item) => <p key={item} className="flex gap-3 font-semibold"><Check className="mt-0.5 size-5 shrink-0 text-accent" />{item}</p>)}</div></div>
          </div>
        </div>
      </section>

      <section id="empresas" className="bg-surface py-20 sm:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-2 lg:px-12">
          <div><p className="eyebrow">Para empresas</p><h2 className="section-title mt-4">Benefícios que também comunicam cultura.</h2><p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">Uma experiência bem apresentada torna o investimento da empresa mais visível, reconhecível e próximo de quem recebe.</p></div>
          <div className="grid gap-4 sm:grid-cols-2">{companyBenefits.map((item) => <div key={item} className="flex min-h-28 items-start gap-4 rounded-md border border-border bg-background p-5"><Users className="mt-0.5 size-5 shrink-0 text-accent" /><p className="font-bold text-primary">{item}</p></div>)}</div>
        </div>
      </section>

      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <div className="grid gap-6 lg:grid-cols-3">
            <article className="info-panel bg-primary text-primary-foreground"><CreditCard /><p className="info-kicker text-brand-mint">Visa</p><h2>Liberdade para usar. Segurança para sua empresa.</h2><p>Com a aceitação da bandeira Visa, o colaborador utiliza seus benefícios nos estabelecimentos compatíveis com cada categoria, enquanto a empresa conta com uma operação estruturada.</p></article>
            <article className="info-panel"><Bus /><p className="info-kicker">Mobilidade</p><h2>Da casa ao trabalho, com mais simplicidade.</h2><p>Vale-transporte e mobilidade podem ser organizados de forma integrada, conforme serviços contratados e cobertura disponível.</p></article>
            <article className="info-panel"><Award /><p className="info-kicker">Premiação</p><h2>Reconheça resultados sem deixar sua marca de fora.</h2><p>Premiações podem apoiar campanhas, metas e conquistas, com estruturação adequada e sem substituir salário ou verbas obrigatórias.</p></article>
          </div>
        </div>
      </section>

      <section className="bg-primary py-20 text-primary-foreground sm:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-[.8fr_1.2fr] lg:items-center lg:px-12">
          <div><Gift className="size-10 text-brand-mint" /><p className="eyebrow mt-7 text-brand-mint">Clube de benefícios</p><h2 className="mt-4 text-4xl font-extrabold leading-tight sm:text-5xl">Um cartão. Várias formas de cuidar e reconhecer.</h2></div>
          <div><p className="text-xl leading-relaxed text-primary-foreground/80">Um ecossistema de vantagens pode ampliar a percepção de valor com descontos, saúde, bem-estar, lazer, cultura, serviços e conveniência.</p><p className="mt-5 text-sm text-primary-foreground/60">Condições, parceiros e vantagens estão sujeitos à disponibilidade e à configuração comercial.</p></div>
        </div>
      </section>

      <section className="bg-background py-20 sm:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-2 lg:items-center lg:px-12">
          <img src={deliveryExperience} alt="Colaboradora recebendo uma experiência de boas-vindas" width={1600} height={1200} loading="lazy" className="aspect-[4/3] w-full rounded-md object-cover" />
          <div><p className="eyebrow">Pertencimento em cada entrega</p><h2 className="section-title mt-4">Uma experiência que torna o cuidado visível.</h2><p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">Da carta-berço ao uso cotidiano, cada contato pode aproximar o colaborador da cultura e da identidade da empresa.</p><Button asChild size="lg" className="mt-8 h-auto min-h-12 bg-primary px-6 py-3 text-primary-foreground hover:bg-primary/90"><a href={PREVIEW_HREF}>Personalizar minha experiência <ArrowRight /></a></Button></div>
        </div>
      </section>

      <section id="seguranca" className="bg-surface py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <div className="grid gap-8 lg:grid-cols-2">
            <article className="rounded-md border border-border bg-background p-7 sm:p-10"><Scale className="size-9 text-accent" /><p className="eyebrow mt-7">PAT e segurança jurídica</p><h2 className="mt-4 text-3xl font-extrabold text-primary sm:text-4xl">Benefícios bem estruturados protegem a empresa e valorizam as pessoas.</h2><p className="mt-5 leading-relaxed text-muted-foreground">A Imã oferece uma estrutura preparada para apoiar empresas na organização de seus benefícios. A definição da política e seu enquadramento jurídico devem considerar a realidade de cada organização, as regras do PAT, a legislação aplicável e a separação adequada das categorias.</p></article>
            <article className="rounded-md border border-border bg-background p-7 sm:p-10"><HeartHandshake className="size-9 text-accent" /><p className="eyebrow mt-7">NR-1 e bem-estar</p><h2 className="mt-4 text-3xl font-extrabold text-primary sm:text-4xl">Cuidar das pessoas também faz parte da gestão de riscos.</h2><p className="mt-5 leading-relaxed text-muted-foreground">Benefícios de saúde, bem-estar e apoio podem integrar uma estratégia mais ampla de cuidado. A gestão de riscos psicossociais exige diagnóstico, prevenção, acompanhamento e ações organizacionais próprias.</p></article>
          </div>
          <p className="mt-7 text-center text-xs leading-relaxed text-muted-foreground">As informações apresentadas têm caráter institucional e não substituem orientação jurídica, trabalhista ou contábil. A solução não substitui o PGR, profissionais especializados ou medidas obrigatórias.</p>
        </div>
      </section>

      <section id="duvidas" className="py-20 sm:py-28">
        <div className="mx-auto max-w-4xl px-5 sm:px-8">
          <div className="text-center"><p className="eyebrow justify-center">Dúvidas frequentes</p><h2 className="section-title mt-4">O essencial sobre a Imã.</h2></div>
          <div className="mt-12 divide-y divide-border border-y border-border">
            {[
              ["O que é o cartão IMÃ?", "É um cartão multibenefícios Visa acompanhado de aplicativo e de uma experiência que pode receber a identidade da empresa contratante."],
              ["Quais benefícios podem ser disponibilizados?", "Alimentação, refeição, mobilidade, vale-transporte, saúde e bem-estar, educação, home office, premiação, saldo livre e clube de benefícios podem estar disponíveis. A solução também pode incluir gestão de despesas e antecipação salarial, conforme contratação e validação comercial."],
              ["O cartão pode ter a marca da minha empresa?", "Sim. A personalização depende da configuração contratada e da validação técnica do layout."],
              ["O aplicativo também pode ser personalizado?", "A identidade da empresa pode estar presente no aplicativo e em outros pontos da jornada, conforme o escopo aprovado."],
              ["Como funciona a bandeira Visa?", "O cartão pode ser utilizado em estabelecimentos compatíveis com cada categoria e configuração, com a praticidade e os recursos previstos na solução."],
              ["A solução atende às regras do PAT?", "A estrutura pode apoiar a gestão adequada. O enquadramento deve considerar a política da empresa, a finalidade de cada categoria e a legislação aplicável."],
              ["É possível incluir vale-transporte?", "A possibilidade depende dos serviços contratados, da cobertura disponível e da validação comercial."],
              ["É possível realizar campanhas de premiação?", "Sim, conforme estruturação adequada. Premiações não devem substituir salário ou verbas obrigatórias."],
              ["Como funciona o clube de benefícios?", "O colaborador pode acessar condições e vantagens adicionais conforme o ecossistema disponibilizado."],
              ["Qual é o prazo de implantação?", "O prazo varia conforme escopo, personalização e validações necessárias. A equipe comercial apresenta uma estimativa para cada projeto."],
              ["Existe quantidade mínima de colaboradores?", "As condições dependem da proposta comercial. Converse com a equipe para avaliar o cenário da sua empresa."],
              ["Como solicitar uma prévia personalizada?", "Preencha o formulário e envie seu logotipo. A equipe comercial avaliará o material e orientará os próximos passos."],
            ].map(([question, answer]) => <details key={question} className="group py-6"><summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-lg font-bold text-primary">{question}<ChevronDown className="size-5 shrink-0 transition-transform group-open:rotate-180" /></summary><p className="mt-4 max-w-3xl leading-relaxed text-muted-foreground">{answer}</p></details>)}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-accent py-16 text-accent-foreground sm:py-20">
        <div className="wave-lines absolute inset-0 opacity-20" />
        <div className="relative mx-auto flex max-w-5xl flex-col items-center px-5 text-center sm:px-8"><p className="text-sm font-extrabold uppercase">Sua empresa tem IMÃ?</p><h2 className="mt-5 text-4xl font-extrabold leading-tight sm:text-5xl">Benefícios que atraem. Pessoas que ficam.</h2><p className="mt-5 max-w-3xl text-lg leading-relaxed text-accent-foreground/75">Quando o benefício carrega a marca da empresa, cada uso também reforça pertencimento, reconhecimento e conexão.</p><div className="mt-8 flex flex-col items-center gap-3 sm:flex-row"><Button asChild size="lg" className="h-auto min-h-12 bg-primary px-6 py-3 text-primary-foreground hover:bg-primary/90"><a href={PREVIEW_HREF}>Quero personalizar meu cartão <ArrowRight /></a></Button><Button asChild size="lg" variant="outline" className="h-auto min-h-12 border-accent-foreground/50 bg-transparent px-6 py-3 text-accent-foreground hover:bg-accent-foreground hover:text-accent"><a href={MEETING_HREF}><CalendarCheck /> Quero conversar com um especialista</a></Button></div></div>
      </section>

      <section id="contato" className="bg-surface py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <div className="max-w-3xl"><p className="eyebrow">Dois caminhos</p><h2 className="section-title mt-4">Como você prefere começar?</h2></div>
          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            <article className="flex flex-col rounded-md border border-border bg-background p-7 sm:p-9">
              <Sparkles className="size-9 text-accent" />
              <h3 className="mt-6 text-2xl font-extrabold text-primary">Sua marca no cartão</h3>
              <p className="mt-4 leading-relaxed text-muted-foreground">Veja como sua empresa pode aparecer na experiência de benefícios.</p>
              <Button asChild size="lg" className="mt-7 h-auto min-h-12 self-start bg-accent px-6 py-3 text-accent-foreground hover:bg-accent/90"><a href={PREVIEW_HREF}>Quero uma prévia personalizada <ArrowRight /></a></Button>
            </article>
            <article className="flex flex-col rounded-md border border-border bg-primary p-7 text-primary-foreground sm:p-9">
              <CalendarCheck className="size-9 text-brand-mint" />
              <h3 className="mt-6 text-2xl font-extrabold">Uma conversa sobre a solução</h3>
              <p className="mt-4 leading-relaxed text-primary-foreground/75">Entenda o cartão, os benefícios, a implantação e as possibilidades para sua empresa.</p>
              <Button asChild size="lg" className="mt-7 h-auto min-h-12 self-start bg-brand-mint px-6 py-3 text-primary hover:bg-brand-mint/90"><a href={MEETING_HREF}>Agendar uma conversa <ArrowRight /></a></Button>
            </article>
          </div>
        </div>
      </section>

      <section id="previa" className="bg-primary py-20 text-primary-foreground sm:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-[.8fr_1.2fr] lg:items-start lg:px-12">
          <div className="lg:sticky lg:top-28"><p className="eyebrow text-brand-mint">Prévia personalizada</p><h2 className="mt-4 text-4xl font-extrabold leading-tight sm:text-5xl">Veja como sua marca pode aparecer na experiência de benefícios.</h2><p className="mt-6 max-w-lg text-lg leading-relaxed text-primary-foreground/70">Envie algumas informações sobre sua empresa e, se desejar, o logotipo. Nossa equipe poderá preparar uma prévia conceitual do cartão personalizado para você.</p></div>
          <form onSubmit={handleSubmit("previa", "Quero uma prévia personalizada")} className="grid gap-5 rounded-md bg-background p-6 text-foreground shadow-xl sm:grid-cols-2 sm:p-8">
            <Field label="Nome" name="nome" autoComplete="name" required />
            <Field label="Empresa" name="empresa" autoComplete="organization" required />
            <Field label="Cargo" name="cargo" autoComplete="organization-title" required />
            <Field label="E-mail corporativo" name="email" type="email" autoComplete="email" required />
            <Field label="WhatsApp" name="whatsapp" type="tel" autoComplete="tel" required />
            <label className="form-label">Número aproximado de colaboradores<select name="colaboradores" required defaultValue="" className="form-control"><option value="" disabled>Selecione</option><option>Até 50</option><option>De 51 a 200</option><option>De 201 a 500</option><option>De 501 a 1.000</option><option>Mais de 1.000</option></select></label>
            <fieldset className="sm:col-span-2"><legend className="text-sm font-bold text-primary">Benefícios de maior interesse</legend><div className="mt-3 grid gap-3 sm:grid-cols-2">{INTEREST_OPTIONS.map((item) => <label key={item} className="flex items-center gap-3 text-sm text-muted-foreground"><input type="checkbox" name="interesses" value={item} className="size-4 shrink-0 accent-primary" />{item}</label>)}</div></fieldset>
            <label className="form-label sm:col-span-2">Logotipo da empresa <span className="font-normal text-muted-foreground">(opcional)</span><span className="flex min-h-24 cursor-pointer items-center justify-center gap-3 rounded-md border border-dashed border-input bg-surface px-4 text-center text-muted-foreground transition-colors hover:border-primary"><Upload className="size-5" />Selecionar arquivo<input name="logo" type="file" accept="image/png,image/jpeg,image/svg+xml,application/pdf" className="sr-only" /></span><span className="font-normal text-muted-foreground">PNG, JPG, SVG ou PDF, com até 5 MB. O arquivo deverá ser anexado ao e-mail preparado.</span></label>
            <label className="flex items-start gap-3 text-sm leading-relaxed text-muted-foreground sm:col-span-2"><input type="checkbox" name="consentimento" required className="mt-1 size-4 shrink-0 accent-primary" />Autorizo o contato da Imã e o tratamento dos meus dados conforme a Política de Privacidade.</label>
            {notice.previa && <p role="status" className={`rounded-md p-3 text-sm sm:col-span-2 ${notice.previa.ok ? "bg-secondary text-secondary-foreground" : "bg-surface text-destructive"}`}>{notice.previa.text}</p>}
            <Button type="submit" size="lg" disabled={sending === "previa"} className="h-12 bg-accent text-accent-foreground hover:bg-accent/90 sm:col-span-2">Criar uma prévia personalizada <ArrowRight /></Button>
            <p className="text-xs leading-relaxed text-muted-foreground sm:col-span-2">{PRIVACY_NOTE}</p>
          </form>
        </div>
      </section>

      <section id="reuniao" className="bg-background py-20 sm:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-[.8fr_1.2fr] lg:items-start lg:px-12">
          <div className="lg:sticky lg:top-28"><p className="eyebrow">Reunião comercial</p><h2 className="section-title mt-4">Vamos entender o que a sua empresa precisa?</h2><p className="mt-6 max-w-lg text-lg leading-relaxed text-muted-foreground">Converse com nossa equipe para conhecer o cartão multibenefícios, as possibilidades de personalização, as categorias disponíveis e a melhor forma de estruturar a solução para sua empresa.</p></div>
          <form onSubmit={handleSubmit("reuniao", "Agendar uma conversa")} className="grid gap-5 rounded-md border border-border bg-surface p-6 sm:grid-cols-2 sm:p-8">
            <Field label="Nome" name="nome" autoComplete="name" required />
            <Field label="Empresa" name="empresa" autoComplete="organization" required />
            <Field label="Cargo" name="cargo" autoComplete="organization-title" required />
            <Field label="E-mail corporativo" name="email" type="email" autoComplete="email" required />
            <Field label="WhatsApp" name="whatsapp" type="tel" autoComplete="tel" required />
            <label className="form-label">Número aproximado de colaboradores<select name="colaboradores" required defaultValue="" className="form-control"><option value="" disabled>Selecione</option><option>Até 50</option><option>De 51 a 200</option><option>De 201 a 500</option><option>De 501 a 1.000</option><option>Mais de 1.000</option></select></label>
            <label className="form-label">O que você deseja conhecer?<select name="tema" required defaultValue="" className="form-control"><option value="" disabled>Selecione</option>{MEETING_TOPICS.map((item) => <option key={item}>{item}</option>)}</select></label>
            <label className="form-label">Melhor período para contato<select name="periodo" required defaultValue="" className="form-control"><option value="" disabled>Selecione</option><option>Manhã</option><option>Tarde</option><option>Fim do dia</option><option>Qualquer período</option></select></label>
            <Field label="Benefício ou necessidade principal" name="necessidade" required />
            <label className="form-label sm:col-span-2">Conte brevemente o que você gostaria de entender <span className="font-normal text-muted-foreground">(opcional)</span><textarea name="mensagem" rows={4} maxLength={1000} className="form-control h-auto py-3" /></label>
            <label className="flex items-start gap-3 text-sm leading-relaxed text-muted-foreground sm:col-span-2"><input type="checkbox" name="consentimento" required className="mt-1 size-4 shrink-0 accent-primary" />Autorizo o contato da Imã e o tratamento dos meus dados conforme a Política de Privacidade.</label>
            {notice.reuniao && <p role="status" className={`rounded-md p-3 text-sm sm:col-span-2 ${notice.reuniao.ok ? "bg-secondary text-secondary-foreground" : "bg-background text-destructive"}`}>{notice.reuniao.text}</p>}
            <Button type="submit" size="lg" disabled={sending === "reuniao"} className="h-12 bg-primary text-primary-foreground hover:bg-primary/90 sm:col-span-2">Solicitar uma conversa <ArrowRight /></Button>
            <p className="text-xs leading-relaxed text-muted-foreground sm:col-span-2">{PRIVACY_NOTE}</p>
          </form>
        </div>
      </section>


      <footer className="bg-primary-deep py-12 text-primary-foreground">
        <div className="mx-auto flex max-w-7xl flex-col gap-9 px-5 sm:px-8 lg:px-12">
          <div className="flex flex-col justify-between gap-8 sm:flex-row sm:items-end">
            <div><img src={logoWhiteCoral} alt="Imã" loading="lazy" className="h-11 w-auto" /><p className="mt-4 text-sm text-primary-foreground/65">Benefícios que atraem. Pessoas que ficam.</p></div>
            <div className="flex items-center gap-3" aria-label="Canais de contato">
              <ContactIcon href={CONTACT_LINKS.email} label="Enviar e-mail"><Mail /></ContactIcon>
              <ContactIcon href={CONTACT_LINKS.phone} label="Ligar para a Imã"><Phone /></ContactIcon>
              <ContactIcon href={CONTACT_LINKS.whatsapp} label="Conversar pelo WhatsApp" external><MessageCircle /></ContactIcon>
              <ContactIcon href={CONTACT_LINKS.instagram} label="Visitar o Instagram" external><Instagram /></ContactIcon>
            </div>
          </div>
          <div className="flex flex-col gap-3 border-t border-primary-foreground/15 pt-7 text-xs text-primary-foreground/50 sm:flex-row sm:items-center sm:justify-between"><p>© 2026 Imã. Todos os direitos reservados.</p></div>
        </div>
      </footer>
    </main>
  );
}

function Field({ label, name, type = "text", autoComplete, required }: { label: string; name: string; type?: string; autoComplete?: string; required?: boolean }) {
  return <label className="form-label">{label}<input name={name} type={type} autoComplete={autoComplete} required={required} maxLength={180} className="form-control" /></label>;
}

function ContactIcon({ href, label, external, children }: { href: string; label: string; external?: boolean; children: React.ReactElement }) {
  return <a href={href} target={external ? "_blank" : undefined} rel={external ? "noreferrer" : undefined} aria-label={label} title={label} className="flex size-12 items-center justify-center rounded-full border border-primary-foreground/25 text-primary-foreground/80 transition-all hover:-translate-y-0.5 hover:border-brand-mint hover:text-brand-mint [&_svg]:size-5">{children}</a>;
}