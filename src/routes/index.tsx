import { createFileRoute } from "@tanstack/react-router";
import { SiWhatsapp } from "@icons-pack/react-simple-icons";
import {
  ArrowDown,
  ArrowRight,
  Building2,
  Check,
  CreditCard,
  HeartHandshake,
  Instagram,
  Mail,
  Menu,
  Phone,
  ShieldCheck,
  Smartphone,
  Sparkles,
  WalletCards,
  X,
} from "lucide-react";
import { useState } from "react";

import appCartao from "@/assets/app-cartao.png.asset.json";
import appPerfil from "@/assets/app-perfil.png.asset.json";
import appSaldo from "@/assets/app-saldo.png.asset.json";
import brandExperience from "@/assets/ima-brand-experience.png.asset.json";
import cards from "@/assets/ima-cards.png.asset.json";
import heroPeople from "@/assets/ima-hero-people.jpg";
import logo from "@/assets/ima-logo.png.asset.json";
import { Button } from "@/components/ui/button";

// Canais configuráveis: substitua somente os valores abaixo quando os destinos definitivos forem aprovados.
const CONTACT_LINKS = {
  email: "mailto:contato@ima.com.br",
  phone: "tel:+5511996443300",
  whatsapp: "https://wa.me/5511996443300",
  instagram: "https://instagram.com/somos.ima",
};

// Adicione os arquivos finais em /public/videos e preencha esta lista para ativar o vídeo automaticamente.
const HERO_VIDEO_SOURCES: Array<{ src: string; type: string }> = [];

function HeroMedia() {
  const hasVideo = HERO_VIDEO_SOURCES.length > 0;

  return (
    <div className="absolute inset-0">
      <img
        src={heroPeople}
        alt="Pessoas vivendo momentos de trabalho, alimentação, mobilidade e bem-estar"
        width={1920}
        height={1080}
        className="h-full w-full object-cover object-center"
      />
      {hasVideo && (
        <video
          className="hero-video absolute inset-0 h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={heroPeople}
          aria-label="Vídeo institucional da Imã sobre pessoas, benefícios e pertencimento"
        >
          {HERO_VIDEO_SOURCES.map((source) => (
            <source key={source.src} src={source.src} type={source.type} />
          ))}
        </video>
      )}
      <div className="absolute inset-0 bg-primary/70" />
    </div>
  );
}

const featureGroups = [
  {
    icon: WalletCards,
    title: "Benefícios e saldos",
    text: "Refeição, alimentação e transporte organizados em uma experiência simples de acompanhar.",
  },
  {
    icon: CreditCard,
    title: "Cartão físico",
    text: "Compras em lojas físicas e online, uso por aproximação e identidade visual personalizada.",
  },
  {
    icon: Smartphone,
    title: "Aplicativo personalizado",
    text: "Consulta de saldo e compras, gestão do cartão e suporte em um app com a identidade da marca.",
  },
  {
    icon: Sparkles,
    title: "Personalização da marca",
    text: "Cartão, aplicativo, carta-berço e comunicação formam uma experiência visual consistente.",
  },
  {
    icon: HeartHandshake,
    title: "Experiência do colaborador",
    text: "Um ponto de contato cotidiano que torna o cuidado da empresa visível e reconhecível.",
  },
  {
    icon: ShieldCheck,
    title: "Segurança e atendimento",
    text: "Validações de segurança, controle do cartão pelo aplicativo e acesso fácil à ajuda.",
  },
];

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Imã | Benefícios que atraem. Pessoas que ficam." },
      {
        name: "description",
        content:
          "Benefícios com a marca da sua empresa: cartão, aplicativo e comunicação personalizados para fortalecer pertencimento.",
      },
      { property: "og:title", content: "Imã | Benefícios que atraem. Pessoas que ficam." },
      {
        property: "og:description",
        content:
          "Uma experiência de benefícios que carrega a cultura e a identidade da sua empresa.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const [menuOpen, setMenuOpen] = useState(false);

  function submitCommercialForm(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const subject = encodeURIComponent("Quero conhecer a Imã");
    const body = encodeURIComponent(
      `Nome: ${data.get("nome")}\nEmpresa: ${data.get("empresa")}\nE-mail: ${data.get("email")}\nTelefone: ${data.get("telefone") || "Não informado"}\n\nMensagem:\n${data.get("mensagem") || "Quero conhecer a solução da Imã."}`,
    );
    window.location.href = `${CONTACT_LINKS.email}?subject=${subject}&body=${body}`;
  }

  return (
    <main className="min-h-screen overflow-hidden bg-background text-foreground">
      <header className="absolute inset-x-0 top-0 z-50 border-b border-primary-foreground/15">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-12">
          <a href="#inicio" aria-label="Imã — início" className="block">
            <img src={logo.url} alt="Imã" className="h-10 w-auto brightness-0 invert" />
          </a>
          <nav className="hidden items-center gap-8 md:flex" aria-label="Navegação principal">
            <a className="nav-link" href="#diferencial">O diferencial</a>
            <a className="nav-link" href="#experiencia">A experiência</a>
            <a className="nav-link" href="#como-funciona">Como funciona</a>
            <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
              <a href="#contato">Fale com a Imã <ArrowRight /></a>
            </Button>
          </nav>
          <Button
            variant="ghost"
            size="icon"
            className="text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground md:hidden"
            onClick={() => setMenuOpen((value) => !value)}
            aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X /> : <Menu />}
          </Button>
        </div>
        {menuOpen && (
          <nav className="border-t border-primary-foreground/15 bg-primary px-5 py-6 md:hidden" aria-label="Menu móvel">
            <div className="flex flex-col gap-5">
              <a className="nav-link" href="#diferencial" onClick={() => setMenuOpen(false)}>O diferencial</a>
              <a className="nav-link" href="#experiencia" onClick={() => setMenuOpen(false)}>A experiência</a>
              <a className="nav-link" href="#como-funciona" onClick={() => setMenuOpen(false)}>Como funciona</a>
              <Button asChild className="mt-2 bg-accent text-accent-foreground hover:bg-accent/90">
                <a href="#contato" onClick={() => setMenuOpen(false)}>Fale com a Imã <ArrowRight /></a>
              </Button>
            </div>
          </nav>
        )}
      </header>

      <section id="inicio" className="relative min-h-[92svh] bg-primary pt-20 text-primary-foreground">
        <HeroMedia />
        <div className="mx-auto grid min-h-[calc(92svh-5rem)] max-w-7xl items-center gap-8 px-5 py-12 sm:px-8 lg:grid-cols-[1.05fr_.95fr] lg:px-12 lg:py-16">
          <div className="relative z-10 max-w-2xl animate-rise">
            <p className="mb-5 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.18em] text-brand-mint">
              <span className="h-px w-9 bg-brand-mint" /> Benefícios com identidade própria
            </p>
            <h1 className="max-w-[13ch] text-5xl font-extrabold leading-[.98] sm:text-6xl lg:text-7xl">
              Benefícios que carregam a sua marca.
            </h1>
            <p className="mt-7 max-w-xl text-lg leading-relaxed text-primary-foreground/80 sm:text-xl">
              A Imã transforma benefícios em uma experiência de pertencimento — com cartão, aplicativo e comunicação que falam a língua da sua empresa.
            </p>
            <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center">
              <Button asChild size="lg" className="h-12 bg-accent px-6 text-accent-foreground hover:bg-accent/90">
                <a href="#contato">Quero conhecer a Imã <ArrowRight /></a>
              </Button>
              <a href="#diferencial" className="inline-flex items-center gap-2 text-sm font-semibold text-primary-foreground/85 hover:text-primary-foreground">
                Entenda o diferencial <ArrowDown className="size-4" />
              </a>
            </div>
          </div>
          <div className="relative mx-auto h-72 w-full max-w-xl animate-float sm:h-96 lg:mr-0">
            <div className="absolute inset-x-[4%] top-[8%] h-[70%] rotate-[-4deg] overflow-hidden rounded-md shadow-2xl">
              <img src={cards.url} alt="Cartão multibenefícios verde da Imã" className="h-[195%] w-full object-cover object-top" />
            </div>
            <div className="absolute bottom-3 left-1 z-20 max-w-[13rem] rounded-md bg-brand-mint px-4 py-3 text-sm font-bold leading-snug text-primary">
              Sua marca presente em cada escolha.
            </div>
          </div>
        </div>
      </section>

      <section id="diferencial" className="bg-surface py-20 sm:py-28">
        <div className="mx-auto grid max-w-7xl gap-14 px-5 sm:px-8 lg:grid-cols-[.9fr_1.1fr] lg:items-center lg:px-12">
          <div>
            <p className="eyebrow">O diferencial Imã</p>
            <h2 className="section-title mt-4">Sua empresa investe nos benefícios. A sua marca deve fazer parte dessa experiência.</h2>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
              Com a Imã, cartão, aplicativo e comunicação podem carregar a identidade da sua empresa. O colaborador reconhece a marca, percebe o cuidado e vivencia o benefício como parte da cultura da organização.
            </p>
            <div className="mt-8 border-l-4 border-accent pl-5">
              <p className="text-2xl font-extrabold text-primary">Tecnologia por trás. Sua marca na frente.</p>
            </div>
            <Button asChild size="lg" className="mt-9 h-12 px-6">
              <a href="#contato">Quero ver minha marca nessa experiência <ArrowRight /></a>
            </Button>
          </div>
          <div className="relative">
            <div className="aspect-[4/3] overflow-hidden rounded-md bg-muted">
              <img src={brandExperience.url} alt="Objetos personalizados que mostram uma experiência de marca completa" className="h-full w-full object-cover" />
            </div>
            <div className="absolute -bottom-6 right-4 w-52 rounded-md bg-accent p-5 text-accent-foreground sm:right-8">
              <p className="text-xs font-bold uppercase tracking-[.14em]">Marca empregadora</p>
              <p className="mt-2 text-lg font-bold leading-tight">Cuidado que se vê, se usa e se lembra.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="experiencia" className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <div className="max-w-3xl">
            <p className="eyebrow">Uma solução, muitos pontos de contato</p>
            <h2 className="section-title mt-4">Do primeiro acesso ao uso de todos os dias.</h2>
            <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
              Uma jornada coesa, reconhecível e simples — pensada para aproximar pessoas e cultura em cada detalhe.
            </p>
          </div>
          <div className="mt-14 grid gap-px overflow-hidden rounded-md border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
            {featureGroups.map(({ icon: Icon, title, text }) => (
              <article key={title} className="group min-h-64 bg-background p-7 transition-colors hover:bg-surface sm:p-8">
                <div className="flex size-11 items-center justify-center rounded-md bg-brand-mint text-primary transition-transform group-hover:-translate-y-1">
                  <Icon className="size-5" />
                </div>
                <h3 className="mt-8 text-xl font-bold text-primary">{title}</h3>
                <p className="mt-3 leading-relaxed text-muted-foreground">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-primary py-20 text-primary-foreground sm:py-28">
        <div className="mx-auto grid max-w-7xl gap-14 px-5 sm:px-8 lg:grid-cols-[.9fr_1.1fr] lg:items-center lg:px-12">
          <div className="relative flex h-[500px] items-end justify-center overflow-hidden rounded-md bg-primary-deep sm:h-[580px]">
            <div className="absolute inset-x-0 top-0 p-8 sm:p-10">
              <p className="text-xs font-bold uppercase tracking-[.16em] text-brand-mint">Aplicativo personalizado</p>
              <h2 className="mt-4 max-w-md text-3xl font-extrabold leading-tight sm:text-4xl">A identidade da empresa acompanha o colaborador.</h2>
            </div>
            <img src={appSaldo.url} alt="Tela de saldo e benefícios no aplicativo Imã" className="absolute bottom-[-8%] left-[3%] h-[65%] rotate-[-5deg] drop-shadow-2xl" />
            <img src={appCartao.url} alt="Tela de cartão virtual do aplicativo Imã" className="absolute bottom-[-3%] z-10 h-[72%] drop-shadow-2xl" />
            <img src={appPerfil.url} alt="Tela de perfil do colaborador no aplicativo Imã" className="absolute bottom-[-8%] right-[-2%] h-[65%] rotate-[5deg] drop-shadow-2xl" />
          </div>
          <div>
            <p className="eyebrow text-brand-mint">Experiência digital</p>
            <h2 className="mt-4 text-4xl font-extrabold leading-tight sm:text-5xl">Mais do que acessar benefícios. Reconhecer pertencimento.</h2>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-primary-foreground/75">
              Cores, marca e linguagem da empresa vivem no aplicativo. Para o colaborador, a experiência parece parte natural da organização — porque foi pensada para ser.
            </p>
            <ul className="mt-9 space-y-4">
              {["Consulta de saldos e compras", "Gestão e segurança do cartão", "Identidade visual da empresa", "Acesso direto a suporte e informações"].map((item) => (
                <li key={item} className="flex items-center gap-3 font-semibold">
                  <span className="flex size-6 items-center justify-center rounded-full bg-accent text-accent-foreground"><Check className="size-4" /></span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section id="como-funciona" className="bg-surface py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <div className="mx-auto max-w-3xl text-center">
            <p className="eyebrow justify-center">Como a solução ganha vida</p>
            <h2 className="section-title mt-4">Três forças. Uma experiência única.</h2>
          </div>
          <div className="relative mt-16 grid gap-6 lg:grid-cols-3">
            <article className="step-card">
              <span className="step-number">01</span>
              <p className="step-kicker">A base</p>
              <h3 className="step-title">Tecnologia</h3>
              <p className="step-text">A infraestrutura viabiliza cartão, aplicativo e operação com segurança e escala.</p>
            </article>
            <article className="step-card bg-primary text-primary-foreground">
              <span className="step-number border-primary-foreground/25 text-brand-mint">02</span>
              <p className="step-kicker text-brand-mint">A conexão</p>
              <h3 className="step-title text-primary-foreground">Imã</h3>
              <p className="step-text text-primary-foreground/75">Estratégia, personalização, implantação e relacionamento conduzidos para cada empresa.</p>
            </article>
            <article className="step-card">
              <span className="step-number">03</span>
              <p className="step-kicker">A presença</p>
              <h3 className="step-title">Sua empresa</h3>
              <p className="step-text">A marca que o colaborador reconhece no cartão, no aplicativo e na experiência.</p>
            </article>
          </div>
          <p className="mx-auto mt-10 max-w-3xl text-center text-lg font-bold text-primary">
            A tecnologia viabiliza. A Imã conduz. A sua marca aproxima.
          </p>
        </div>
      </section>

      <section id="contato" className="relative overflow-hidden bg-accent py-20 text-accent-foreground sm:py-24">
        <div className="wave-lines absolute inset-0 opacity-25" />
        <div className="relative mx-auto grid max-w-6xl gap-12 px-5 sm:px-8 lg:grid-cols-[.85fr_1.15fr] lg:items-start">
          <div className="lg:pt-4">
            <p className="text-xs font-bold uppercase tracking-[.16em]">Sua empresa tem Imã?</p>
            <h2 className="mt-4 max-w-3xl text-4xl font-extrabold leading-tight sm:text-5xl">Transforme benefícios em um sinal diário de valorização.</h2>
            <p className="mt-5 max-w-lg text-lg leading-relaxed text-accent-foreground/75">Conte um pouco sobre sua empresa. A mensagem será preparada no seu aplicativo de e-mail.</p>
          </div>
          <form onSubmit={submitCommercialForm} className="grid gap-4 rounded-md bg-background p-6 text-foreground shadow-xl sm:grid-cols-2 sm:p-8">
            <label className="grid gap-2 text-sm font-bold text-primary">
              Nome
              <input name="nome" required autoComplete="name" className="h-12 rounded-md border border-input bg-background px-4 font-normal outline-none transition-shadow focus:ring-2 focus:ring-ring" />
            </label>
            <label className="grid gap-2 text-sm font-bold text-primary">
              Empresa
              <input name="empresa" required autoComplete="organization" className="h-12 rounded-md border border-input bg-background px-4 font-normal outline-none transition-shadow focus:ring-2 focus:ring-ring" />
            </label>
            <label className="grid gap-2 text-sm font-bold text-primary">
              E-mail profissional
              <input name="email" type="email" required autoComplete="email" className="h-12 rounded-md border border-input bg-background px-4 font-normal outline-none transition-shadow focus:ring-2 focus:ring-ring" />
            </label>
            <label className="grid gap-2 text-sm font-bold text-primary">
              Telefone
              <input name="telefone" type="tel" autoComplete="tel" className="h-12 rounded-md border border-input bg-background px-4 font-normal outline-none transition-shadow focus:ring-2 focus:ring-ring" />
            </label>
            <label className="grid gap-2 text-sm font-bold text-primary sm:col-span-2">
              Como podemos ajudar?
              <textarea name="mensagem" rows={4} className="resize-none rounded-md border border-input bg-background px-4 py-3 font-normal outline-none transition-shadow focus:ring-2 focus:ring-ring" />
            </label>
            <Button type="submit" size="lg" className="h-12 bg-primary text-primary-foreground hover:bg-primary/90 sm:col-span-2">
              Solicitar uma proposta <ArrowRight />
            </Button>
          </form>
        </div>
      </section>

      <footer className="bg-primary-deep py-12 text-primary-foreground">
        <div className="mx-auto flex max-w-7xl flex-col gap-10 px-5 sm:px-8 lg:px-12">
          <div className="flex flex-col justify-between gap-8 sm:flex-row sm:items-end">
            <div>
              <img src={logo.url} alt="Imã" className="h-11 w-auto brightness-0 invert" />
              <p className="mt-4 text-sm text-primary-foreground/65">Benefícios que atraem. Pessoas que ficam.</p>
            </div>
            <div className="flex items-center gap-3" aria-label="Canais de contato">
              <a href={CONTACT_LINKS.email} aria-label="Enviar e-mail" title="Enviar e-mail" className="flex size-12 items-center justify-center rounded-full border border-primary-foreground/25 text-primary-foreground/85 transition-all hover:-translate-y-0.5 hover:border-brand-mint hover:text-brand-mint">
                <Mail className="size-5" aria-hidden="true" />
              </a>
              <a href={CONTACT_LINKS.phone} aria-label="Ligar para a Imã" title="Ligar para a Imã" className="flex size-12 items-center justify-center rounded-full border border-primary-foreground/25 text-primary-foreground/85 transition-all hover:-translate-y-0.5 hover:border-brand-mint hover:text-brand-mint">
                <Phone className="size-5" aria-hidden="true" />
              </a>
              <a href={CONTACT_LINKS.whatsapp} target="_blank" rel="noreferrer" aria-label="Conversar pelo WhatsApp" title="Conversar pelo WhatsApp" className="flex size-12 items-center justify-center rounded-full border border-primary-foreground/25 text-primary-foreground/85 transition-all hover:-translate-y-0.5 hover:border-brand-mint hover:text-brand-mint">
                <SiWhatsapp className="size-5" aria-hidden="true" />
              </a>
              <a href={CONTACT_LINKS.instagram} target="_blank" rel="noreferrer" aria-label="Visitar o Instagram" title="Visitar o Instagram" className="flex size-12 items-center justify-center rounded-full border border-primary-foreground/25 text-primary-foreground/85 transition-all hover:-translate-y-0.5 hover:border-brand-mint hover:text-brand-mint">
                <Instagram className="size-5" aria-hidden="true" />
              </a>
            </div>
          </div>
          <div className="border-t border-primary-foreground/15 pt-7 text-xs text-primary-foreground/50">
            <p>© 2026 Imã. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
