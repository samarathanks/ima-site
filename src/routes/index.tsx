import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowRight,
  CalendarCheck,
  Award,
  Bus,
  Check,
  ChevronDown,
  CreditCard,
  Gift,
  HeartHandshake,
  Instagram,
  ListChecks,
  Mail,
  Menu,
  MessageCircle,
  Phone,
  Scale,
  ShoppingBasket,
  ShoppingBag,
  Smartphone,
  Sparkles,
  Upload,
  Users,
  Utensils,
  WalletCards,
  X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

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
const MEETING_HREF = SCHEDULE_LINK || "#contato";
const PREVIEW_HREF = "#contato";

// Endpoint preparado para futura integração de CRM (ex.: Zoho).
// Enquanto estiver vazio, os dados são organizados em um e-mail comercial.
const LEAD_ENDPOINT = "";

const MEETING_TOPICS = [
  "Solução de cartão multibenefícios",
  "Possibilidade de personalização",
  "Benefícios para colaboradores",
  "Agendar uma conversa",
];

const PRIVACY_NOTE =
  "Seus dados serão utilizados apenas para o atendimento da sua solicitação, conforme nossa Política de Privacidade.";


const benefits = [
  { icon: ShoppingBasket, title: "Multibenefícios", text: "Alimentação, refeição e outras categorias reunidas em uma experiência simples, conforme a configuração contratada." },
  { icon: Award, title: "Premiação", text: "Reconhecimento de campanhas, metas e momentos importantes, com estruturação adequada." },
  { icon: Bus, title: "Mobilidade e vale-transporte", text: "Mais simplicidade nos deslocamentos, conforme os serviços contratados e a cobertura disponível." },
  { icon: Gift, title: "Clube de benefícios", text: "Condições e vantagens adicionais conforme o ecossistema disponível." },
  { icon: HeartHandshake, title: "Saúde e bem-estar", text: "Uma possibilidade de apoio a estratégias mais amplas de cuidado, quando aplicável." },
];

const appFeatures = [
  { icon: WalletCards, title: "Saldos", text: "Visualização clara dos valores disponíveis para o dia a dia." },
  { icon: ListChecks, title: "Categorias de benefícios", text: "Organização dos benefícios conforme a configuração contratada." },
  { icon: ShoppingBag, title: "Consulta de compras", text: "Acompanhamento das movimentações realizadas com o cartão." },
  { icon: Smartphone, title: "Gestão pelo aplicativo", text: "Informações e recursos reunidos em uma experiência simples de usar." },
  { icon: Users, title: "Experiência do colaborador", text: "Mais autonomia, clareza e praticidade em cada interação." },
];

const companyBenefits = [
  "Fortalecimento do employer branding",
  "Maior percepção de valor",
  "Reforço da cultura organizacional",
  "Pertencimento e reconhecimento",
  "Apoio à atração e retenção de talentos",
  "Gestão mais organizada dos benefícios",
];

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Imã | Cartão multibenefícios para empresas" },
      {
        name: "description",
        content: "Cartão multibenefícios e aplicativo para alimentação, refeição, mobilidade, premiação e clube de benefícios. Benefícios que atraem. Pessoas que ficam.",
      },
      { property: "og:title", content: "Imã | Benefícios que atraem. Pessoas que ficam." },
      { property: "og:description", content: "Uma solução de benefícios prática, flexível e segura para empresas que querem cuidar melhor das pessoas." },
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

function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [notice, setNotice] = useState<{ text: string; ok: boolean } | null>(null);
  const [sending, setSending] = useState(false);
  const [topic, setTopic] = useState("");
  const [activeAppFeature, setActiveAppFeature] = useState(0);

  useEffect(() => {
    const sections = document.querySelectorAll<HTMLElement>(".reveal-section");
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      }),
      { threshold: 0.08 },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
      event.preventDefault();
      if (sending) return;
      const form = event.currentTarget;
      const data = new FormData(form);

      const fail = (text: string) => setNotice({ text, ok: false });

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
      setSending(true);

      const base = [
        `Tipo de conversão: ${value("tema")}`,
        `Origem: ${typeof window !== "undefined" ? window.location.href : "site Imã"}`,
        `Data e horário: ${new Date().toLocaleString("pt-BR")}`,
        "Consentimento de contato: concedido",
        "",
        `Nome: ${value("nome")}`,
        `Empresa: ${value("empresa")}`,
        `E-mail corporativo: ${value("email")}`,
        `WhatsApp: ${value("whatsapp")}`,
        `O que deseja conhecer: ${value("tema")}`,
        `Logotipo: ${logoFile instanceof File && logoFile.size > 0 ? "selecionado pelo visitante" : "não enviado"}`,
      ];

      const subject = encodeURIComponent(`Contato pelo site — ${value("tema")}`);
      const body = encodeURIComponent(base.join("\n"));

      // Estrutura pronta para uma futura integração de CRM.
      if (LEAD_ENDPOINT) {
        void fetch(LEAD_ENDPOINT, {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({
            tipo_conversao: value("tema"),
            origem: typeof window !== "undefined" ? window.location.href : "",
            enviado_em: new Date().toISOString(),
            consentimento: true,
            campos: Object.fromEntries(
              [...data.entries()].filter(([, item]) => typeof item === "string"),
            ),
          }),
        }).catch(() => undefined);
      }


      setNotice({ ok: true, text: "Sua solicitação está pronta. Nossa equipe dará continuidade ao atendimento pelo canal escolhido." });

      window.location.href = `${CONTACT_LINKS.email}?subject=${subject}&body=${body}`;
      form.reset();
      setTopic("");
      window.setTimeout(() => setSending(false), 4000);
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
            <a className="nav-link" href="#sua-marca">Personalização</a>
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
              {[['O cartão', '#cartao'], ['Benefícios', '#beneficios'], ['Personalização', '#sua-marca'], ['Para empresas', '#empresas'], ['PAT e segurança', '#seguranca'], ['Dúvidas', '#duvidas']].map(([label, href]) => (
                <a key={href} className="nav-link" href={href} onClick={closeMenu}>{label}</a>
              ))}
              <Button asChild className="mt-2 bg-accent text-accent-foreground hover:bg-accent/90"><a href={MEETING_HREF} onClick={closeMenu}><CalendarCheck /> Agendar uma conversa</a></Button>
              <Button asChild variant="outline" className="border-brand-mint/60 bg-transparent text-brand-mint"><a href="#cartao" onClick={closeMenu}>Conhecer a solução</a></Button>

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
            <h1 className="mt-6 text-4xl font-extrabold leading-[1.03] sm:text-5xl lg:text-6xl">Benefícios que atraem. Pessoas que ficam.</h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-primary-foreground/85">Uma solução de benefícios prática, flexível e segura para empresas que querem cuidar melhor das pessoas.</p>
            <p className="mt-4 max-w-xl leading-relaxed text-primary-foreground/65">E, para empresas que desejam levar sua identidade ainda mais longe, existe a possibilidade de personalizar a experiência conforme o projeto.</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Button asChild size="lg" className="h-auto min-h-12 bg-accent px-6 py-3 text-accent-foreground hover:bg-accent/90"><a href="#cartao">Conhecer a solução <ArrowRight /></a></Button>
              <Button asChild size="lg" variant="outline" className="h-auto min-h-12 border-brand-mint/60 bg-transparent px-6 py-3 text-brand-mint hover:bg-brand-mint hover:text-primary"><a href={MEETING_HREF}><CalendarCheck /> Agendar uma conversa</a></Button>
            </div>
            <p className="mt-9 text-xl font-extrabold text-brand-mint">Sua empresa tem IMÃ?</p>
          </div>
          <div className="self-end pb-2 lg:pb-10"><TiltCard className="mx-auto w-full max-w-sm lg:ml-auto lg:max-w-xl" /></div>
        </div>
      </section>

      <section aria-label="Vídeo institucional da Imã" className="bg-primary-deep py-8 sm:py-12">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12"><div className="overflow-hidden rounded-md"><HeroMedia /></div></div>
      </section>

      <section id="cartao" className="reveal-section bg-surface py-20 sm:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-[.85fr_1.15fr] lg:items-center lg:px-12">
          <div>
            <p className="eyebrow">Cartão multibenefícios</p>
            <h2 className="section-title mt-4">O cartão que reúne benefícios para a rotina da sua empresa.</h2>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">O cartão IMÃ reúne diferentes benefícios em uma experiência simples para a empresa e flexível para os colaboradores.</p>
            <p className="mt-4 max-w-xl leading-relaxed text-muted-foreground">Ele pode ser utilizado como a solução oficial da IMÃ, com sua identidade própria, ou fazer parte de projetos especiais de personalização, conforme a necessidade da empresa.</p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {["Cartão multibenefícios", "Alimentação e refeição", "Mobilidade e vale-transporte", "Premiação", "Clube de benefícios", "Aplicativo", "Gestão dos benefícios", "Bandeira Visa, quando aplicável à configuração contratada"].map((item) => <p key={item} className="flex items-center gap-3 font-bold text-primary"><span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-brand-mint"><Check className="size-4" /></span>{item}</p>)}
            </div>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row"><Button asChild size="lg" className="h-auto min-h-12 bg-primary px-6 py-3 text-primary-foreground hover:bg-primary/90"><a href={MEETING_HREF}><CalendarCheck /> Agendar uma conversa</a></Button></div>
          </div>
          <TiltCard className="w-full" lazy />
        </div>
      </section>


      <section id="beneficios" className="reveal-section py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <div className="max-w-3xl"><p className="eyebrow">Benefícios para diferentes momentos</p><h2 className="section-title mt-4">Uma solução que acompanha a vida real.</h2><p className="mt-5 text-lg leading-relaxed text-muted-foreground">Categorias e experiências disponíveis conforme a configuração contratada e a validação técnica.</p></div>
          <div className="mt-12 grid gap-px overflow-hidden rounded-md border border-border bg-border sm:grid-cols-2 lg:grid-cols-5">
            {benefits.map(({ icon: Icon, title, text }) => <details key={title} className="benefit-card group bg-background p-7 sm:p-8"><summary className="flex cursor-pointer list-none items-center gap-4"><span className="flex size-11 shrink-0 items-center justify-center rounded-md bg-brand-mint text-primary"><Icon className="size-5" /></span><span className="flex-1 text-lg font-bold text-primary">{title}</span><ChevronDown className="size-5 shrink-0 text-accent transition-transform group-open:rotate-180" /></summary><div className="benefit-answer"><p className="pt-5 leading-relaxed text-muted-foreground">{text}</p></div></details>)}
          </div>
          <Button asChild size="lg" variant="outline" className="mt-10 h-auto min-h-12 border-primary/30 px-6 py-3 text-primary hover:bg-primary hover:text-primary-foreground"><a href={MEETING_HREF}><CalendarCheck /> Entender como funciona</a></Button>

        </div>
      </section>


      <section className="reveal-section py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <div className="grid gap-12 lg:grid-cols-[1.08fr_.92fr] lg:items-center">
            <div className="app-stage relative flex h-[520px] items-end justify-center overflow-hidden rounded-md bg-primary sm:h-[610px]">
              <div className="absolute inset-x-0 top-0 z-20 p-8 sm:p-10"><p className="text-xs font-bold uppercase tracking-[.16em] text-brand-mint">Cartão e aplicativo</p><h2 className="mt-4 max-w-md text-3xl font-extrabold leading-tight text-primary-foreground sm:text-4xl">Benefícios na mão do colaborador.</h2></div>
              <div className="app-orbit app-orbit-one" aria-hidden="true" />
              <div className="app-orbit app-orbit-two" aria-hidden="true" />
              <img src={appSaldo.url} alt="Tela de saldos e benefícios no aplicativo Imã" loading="lazy" className={`app-screen app-screen-left absolute bottom-[-6%] left-[1%] h-[60%] drop-shadow-2xl ${activeAppFeature < 2 ? "is-active" : ""}`} />
              <img src={appCartao.url} alt="Tela do cartão no aplicativo Imã" loading="lazy" className={`app-screen app-screen-center absolute bottom-[-2%] z-10 h-[69%] drop-shadow-2xl ${activeAppFeature === 2 || activeAppFeature === 3 ? "is-active" : ""}`} />
              <img src={appPerfil.url} alt="Tela da experiência do colaborador no aplicativo Imã" loading="lazy" className={`app-screen app-screen-right absolute bottom-[-6%] right-[-3%] h-[60%] drop-shadow-2xl ${activeAppFeature === 4 ? "is-active" : ""}`} />
            </div>
            <div><p className="eyebrow">Experiência do colaborador</p><h2 className="section-title mt-4">Simples para usar. Fácil de acompanhar.</h2><p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">O aplicativo reúne informações essenciais para uma jornada mais clara, prática e segura.</p><div className="mt-9 grid gap-2" role="list" aria-label="Recursos do aplicativo">{appFeatures.map(({ icon: Icon, title, text }, index) => <Button key={title} type="button" variant="ghost" onClick={() => setActiveAppFeature(index)} className={`app-feature h-auto min-h-20 w-full justify-start gap-4 whitespace-normal px-4 py-4 text-left ${activeAppFeature === index ? "is-active" : ""}`} aria-pressed={activeAppFeature === index}><span className="app-feature-icon"><Icon className="size-5" /></span><span className="min-w-0 flex-1"><span className="block font-extrabold text-primary">{title}</span><span className="mt-1 block text-sm font-normal leading-relaxed text-muted-foreground">{text}</span></span><ArrowRight className="app-feature-arrow size-4 shrink-0" /></Button>)}</div></div>
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

      <section id="sua-marca" className="reveal-section bg-primary py-20 text-primary-foreground sm:py-28">
        <div className="mx-auto grid max-w-7xl gap-14 px-5 sm:px-8 lg:grid-cols-[.9fr_1.1fr] lg:items-center lg:px-12">
          <div>
            <p className="eyebrow text-brand-mint">Diferencial opcional</p>
            <h2 className="mt-4 text-4xl font-extrabold leading-tight sm:text-5xl">Para algumas empresas, a experiência pode levar ainda mais identidade.</h2>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-primary-foreground/75">Além da solução padrão IMÃ, empresas que desejam fortalecer sua marca empregadora podem avaliar projetos de personalização do cartão e de outros pontos da jornada do colaborador.</p>
            <div className="mt-8 grid gap-px overflow-hidden rounded-md border border-primary-foreground/15 bg-primary-foreground/15 sm:grid-cols-2">
              {["Cartão com a identidade da empresa", "Aplicativo", "Carta-berço e kit de entrega", "Comunicação de implantação", "Materiais de ativação", "Jornada de boas-vindas"].map((item) => <div key={item} className="flex min-h-20 items-center gap-3 bg-primary p-5"><Sparkles className="size-5 shrink-0 text-brand-mint" /><p className="font-semibold">{item}</p></div>)}
            </div>
            <p className="mt-6 max-w-xl text-sm leading-relaxed text-primary-foreground/60">Projetos personalizados sob consulta, conforme a configuração contratada e sujeitos à avaliação do projeto.</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row"><Button asChild size="lg" className="h-auto min-h-12 bg-accent px-6 py-3 text-accent-foreground hover:bg-accent/90"><a href={PREVIEW_HREF} onClick={() => setTopic("Possibilidade de personalização")}>Quero avaliar essa possibilidade <ArrowRight /></a></Button></div>
          </div>
          <div className="relative">
            <img src={brandExperience.url} alt="Exemplo demonstrativo de personalização com cartão, aplicativo e materiais de marca fictícia" loading="lazy" className="aspect-[4/3] w-full rounded-md object-cover" />
            <p className="mt-4 text-sm leading-relaxed text-primary-foreground/65">Exemplo demonstrativo com marca fictícia. As possibilidades de personalização dependem da configuração contratada e da avaliação de cada projeto.</p>
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
          <div><p className="eyebrow">Pertencimento em cada entrega</p><h2 className="section-title mt-4">Uma experiência que torna o cuidado visível.</h2><p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">Da entrega do cartão ao uso cotidiano, cada contato aproxima o colaborador do cuidado da empresa.</p><Button asChild size="lg" className="mt-8 h-auto min-h-12 bg-primary px-6 py-3 text-primary-foreground hover:bg-primary/90"><a href={MEETING_HREF}><CalendarCheck /> Agendar uma conversa</a></Button></div>
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
              ["O que é o cartão IMÃ?", "É um cartão multibenefícios acompanhado de aplicativo, que reúne diferentes categorias de benefícios em uma única solução para a empresa e para o colaborador."],
              ["Quais benefícios podem ser disponibilizados?", "A solução pode reunir multibenefícios, premiação, mobilidade e vale-transporte, clube de benefícios e saúde e bem-estar, quando aplicável. A disponibilidade depende da configuração contratada e da validação comercial."],
              ["O cartão pode ter a marca da minha empresa?", "A empresa pode contratar a solução com o cartão oficial da IMÃ ou avaliar um projeto de personalização. Essa possibilidade é analisada caso a caso, conforme a configuração contratada e a avaliação do projeto."],
              ["O aplicativo também pode ser personalizado?", "A identidade da empresa pode estar presente no aplicativo e em outros pontos da jornada, conforme o escopo aprovado."],
              ["Como funciona a bandeira Visa?", "O cartão pode ser utilizado em estabelecimentos compatíveis com cada categoria e configuração, com a praticidade e os recursos previstos na solução."],
              ["A solução atende às regras do PAT?", "A estrutura pode apoiar a gestão adequada. O enquadramento deve considerar a política da empresa, a finalidade de cada categoria e a legislação aplicável."],
              ["É possível incluir vale-transporte?", "A possibilidade depende dos serviços contratados, da cobertura disponível e da validação comercial."],
              ["É possível realizar campanhas de premiação?", "Sim, conforme estruturação adequada. Premiações não devem substituir salário ou verbas obrigatórias."],
              ["Como funciona o clube de benefícios?", "O colaborador pode acessar condições e vantagens adicionais conforme o ecossistema disponibilizado."],
              ["Qual é o prazo de implantação?", "O prazo varia conforme escopo, personalização e validações necessárias. A equipe comercial apresenta uma estimativa para cada projeto."],
              ["Existe quantidade mínima de colaboradores?", "As condições dependem da proposta comercial. Converse com a equipe para avaliar o cenário da sua empresa."],
              ["Como avaliar a possibilidade de personalização?", "Preencha o formulário de avaliação. A equipe comercial analisará o cenário da sua empresa e orientará os próximos passos. O envio das informações representa uma solicitação de avaliação, não uma garantia de personalização."],
            ].map(([question, answer]) => <details key={question} className="group py-6"><summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-lg font-bold text-primary">{question}<ChevronDown className="size-5 shrink-0 transition-transform group-open:rotate-180" /></summary><p className="mt-4 max-w-3xl leading-relaxed text-muted-foreground">{answer}</p></details>)}
          </div>
        </div>
      </section>

      <section className="reveal-section relative overflow-hidden bg-accent py-16 text-accent-foreground sm:py-20">
        <div className="wave-lines absolute inset-0 opacity-20" />
        <div className="relative mx-auto flex max-w-5xl flex-col items-center px-5 text-center sm:px-8"><p className="text-sm font-extrabold uppercase">Sua empresa tem IMÃ?</p><h2 className="mt-5 text-4xl font-extrabold leading-tight sm:text-5xl">Benefícios que atraem. Pessoas que ficam.</h2><p className="mt-5 max-w-3xl text-lg leading-relaxed text-accent-foreground/75">Uma solução de benefícios que organiza a gestão da empresa e valoriza a experiência de quem recebe.</p><div className="mt-8 flex flex-col items-center gap-3 sm:flex-row"><Button asChild size="lg" className="h-auto min-h-12 bg-primary px-6 py-3 text-primary-foreground hover:bg-primary/90"><a href={MEETING_HREF}><CalendarCheck /> Agendar uma conversa</a></Button><Button asChild size="lg" variant="outline" className="h-auto min-h-12 border-accent-foreground/50 bg-transparent px-6 py-3 text-accent-foreground hover:bg-accent-foreground hover:text-accent"><a href={PREVIEW_HREF} onClick={() => setTopic("Possibilidade de personalização")}>Avaliar personalização</a></Button></div></div>
      </section>

      <section id="contato" className="reveal-section bg-primary py-20 text-primary-foreground sm:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-[.8fr_1.2fr] lg:items-start lg:px-12">
          <div className="lg:sticky lg:top-28"><p className="eyebrow text-brand-mint">Conhecer a solução</p><h2 className="mt-4 text-4xl font-extrabold leading-tight sm:text-5xl">Vamos entender o que sua empresa precisa?</h2><p className="mt-6 max-w-lg text-lg leading-relaxed text-primary-foreground/70">Conte seu interesse em poucos campos. A personalização é uma possibilidade opcional, sob consulta e conforme o projeto contratado.</p></div>
          <form onSubmit={handleSubmit} className="grid gap-5 rounded-md bg-background p-6 text-foreground shadow-xl sm:grid-cols-2 sm:p-8">
            <Field label="Nome" name="nome" autoComplete="name" required />
            <Field label="Empresa" name="empresa" autoComplete="organization" required />
            <Field label="E-mail corporativo" name="email" type="email" autoComplete="email" required />
            <Field label="WhatsApp" name="whatsapp" type="tel" autoComplete="tel" required />
            <label className="form-label sm:col-span-2">O que você deseja conhecer?<select name="tema" required value={topic} onChange={(event) => setTopic(event.target.value)} className="form-control"><option value="" disabled>Selecione</option>{MEETING_TOPICS.map((item) => <option key={item}>{item}</option>)}</select></label>
            {topic === "Possibilidade de personalização" && <label className="form-label animate-fade-in sm:col-span-2">Logotipo da empresa <span className="font-normal text-muted-foreground">(opcional)</span><span className="flex min-h-24 cursor-pointer items-center justify-center gap-3 rounded-md border border-dashed border-input bg-surface px-4 text-center text-muted-foreground transition-colors hover:border-primary"><Upload className="size-5" />Selecionar arquivo<input name="logo" type="file" accept="image/png,image/jpeg,image/svg+xml,application/pdf" className="sr-only" /></span><span className="font-normal text-muted-foreground">PNG, JPG, SVG ou PDF, com até 5 MB. A personalização será avaliada conforme o projeto e a configuração contratada.</span></label>}
            <label className="flex items-start gap-3 text-sm leading-relaxed text-muted-foreground sm:col-span-2"><input type="checkbox" name="consentimento" required className="mt-1 size-4 shrink-0 accent-primary" />Autorizo o contato da Imã e o tratamento dos meus dados conforme a Política de Privacidade.</label>
            {notice && <p role="status" className={`rounded-md p-3 text-sm sm:col-span-2 ${notice.ok ? "bg-secondary text-secondary-foreground" : "bg-surface text-destructive"}`}>{notice.text}</p>}
            <Button type="submit" size="lg" disabled={sending} className="h-12 bg-accent text-accent-foreground hover:bg-accent/90 sm:col-span-2">{sending ? "Preparando contato..." : "Conhecer a solução"} <ArrowRight /></Button>
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

function TiltCard({ className, lazy }: { className?: string; lazy?: boolean }) {
  const card = useRef<HTMLImageElement>(null);
  const move = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "touch" || !card.current) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    card.current.style.transform = `perspective(900px) rotateX(${-y * 7}deg) rotateY(${x * 9}deg) translateY(-4px)`;
  };
  const reset = () => { if (card.current) card.current.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg)"; };
  return <div className={`card-perspective ${className ?? ""}`} onPointerMove={move} onPointerLeave={reset}><img ref={card} src={officialCard.url} alt="Cartão verde oficial da Imã com bandeira Visa" width={669} height={403} loading={lazy ? "lazy" : "eager"} className="card-tilt w-full object-contain drop-shadow-2xl" /></div>;
}

function ContactIcon({ href, label, external, children }: { href: string; label: string; external?: boolean; children: React.ReactElement }) {
  return <a href={href} target={external ? "_blank" : undefined} rel={external ? "noreferrer" : undefined} aria-label={label} title={label} className="flex size-12 items-center justify-center rounded-full border border-primary-foreground/25 text-primary-foreground/80 transition-all hover:-translate-y-0.5 hover:border-brand-mint hover:text-brand-mint [&_svg]:size-5">{children}</a>;
}