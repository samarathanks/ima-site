import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowDown,
  ArrowRight,
  Award,
  Bus,
  Check,
  ChevronDown,
  CreditCard,
  Gift,
  HeartHandshake,
  Instagram,
  Mail,
  Menu,
  MessageCircle,
  Phone,
  Scale,
  Smartphone,
  Sparkles,
  Users,
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
import logo from "@/assets/ima-logo.png.asset.json";
import { Button } from "@/components/ui/button";

const CONTACT_LINKS = {
  email: "mailto:contato@ima.com.br",
  phone: "tel:+5511996443300",
  whatsapp: "https://wa.me/5511996443300",
  instagram: "https://instagram.com/somos.ima",
};

const benefits = [
  { icon: WalletCards, title: "Alimentação e refeição", text: "Categorias organizadas para diferentes momentos da rotina." },
  { icon: Bus, title: "Mobilidade", text: "Possibilidade de integrar transporte e mobilidade conforme contratação." },
  { icon: HeartHandshake, title: "Saúde e bem-estar", text: "Benefícios que podem apoiar uma estratégia mais ampla de cuidado." },
  { icon: Award, title: "Premiação e reconhecimento", text: "Apoio a campanhas internas, conquistas e datas especiais." },
  { icon: Gift, title: "Cultura, lazer e vantagens", text: "Um ecossistema que pode ampliar o valor percebido no dia a dia." },
  { icon: Smartphone, title: "Aplicativo personalizado", text: "Saldo, compras, cartão e suporte em uma experiência reconhecível." },
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

function Index() {
  const [menuOpen, setMenuOpen] = useState(false);

  function submitCommercialForm(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if (data.get("consentimento") !== "on") return;

    const value = (key: string, fallback = "Não informado") => {
      const field = data.get(key);
      return typeof field === "string" && field.trim() ? field.trim().slice(0, 1000) : fallback;
    };

    const subject = encodeURIComponent("Quero conhecer a Imã");
    const body = encodeURIComponent(
      `Nome: ${value("nome")}\nEmpresa: ${value("empresa")}\nCargo: ${value("cargo")}\nE-mail: ${value("email")}\nWhatsApp: ${value("whatsapp")}\nColaboradores: ${value("colaboradores")}\nBenefícios de interesse: ${value("beneficios")}\nCartão personalizado: ${value("personalizado")}\n\nMensagem:\n${value("mensagem", "Quero conhecer a solução da Imã.")}`,
    );
    window.location.href = `${CONTACT_LINKS.email}?subject=${subject}&body=${body}`;
  }

  const closeMenu = () => setMenuOpen(false);

  return (
    <main className="min-h-screen overflow-hidden bg-background text-foreground">
      <header className="sticky top-0 z-50 border-b border-primary-foreground/15 bg-primary text-primary-foreground">
        <div className="mx-auto flex h-20 max-w-[90rem] items-center justify-between px-5 sm:px-8 lg:px-10">
          <a href="#inicio" aria-label="Imã — início" className="shrink-0">
            <img src={logo.url} alt="Imã" className="h-10 w-auto brightness-0 invert" />
          </a>
          <nav className="hidden items-center gap-5 xl:flex" aria-label="Navegação principal">
            <a className="nav-link" href="#cartao">O cartão</a>
            <a className="nav-link" href="#beneficios">Benefícios</a>
            <a className="nav-link" href="#sua-marca">Sua marca na Imã</a>
            <a className="nav-link" href="#empresas">Para empresas</a>
            <a className="nav-link" href="#seguranca">PAT e segurança</a>
            <a className="nav-link" href="#duvidas">Dúvidas</a>
            <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
              <a href="#contato">Quero conhecer <ArrowRight /></a>
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
              <Button asChild className="mt-2 bg-accent text-accent-foreground hover:bg-accent/90"><a href="#contato" onClick={closeMenu}>Quero conhecer <ArrowRight /></a></Button>
            </div>
          </nav>
        )}
      </header>

      <section id="inicio" className="bg-primary text-primary-foreground">
        <HeroMedia />
        <div className="mx-auto flex max-w-7xl flex-col items-center px-5 py-10 text-center sm:px-8 sm:py-14 lg:px-12">
          <p className="max-w-3xl text-xl font-bold leading-relaxed sm:text-2xl">Multibenefícios, cartão e aplicativo com a identidade da sua empresa.</p>
          <div className="mt-7 flex w-full max-w-2xl flex-col justify-center gap-3 sm:flex-row">
            <Button asChild size="lg" className="h-auto min-h-12 bg-accent px-6 py-3 text-accent-foreground hover:bg-accent/90"><a href="#contato">Quero conhecer a Imã <ArrowRight /></a></Button>
            <Button asChild size="lg" variant="outline" className="h-auto min-h-12 border-primary-foreground/40 bg-transparent px-6 py-3 text-primary-foreground hover:bg-primary-foreground hover:text-primary"><a href="#contato">Quero ver minha marca no cartão</a></Button>
          </div>
          <a href="#cartao" aria-label="Conhecer o cartão" className="mt-8 text-primary-foreground/70 transition-colors hover:text-primary-foreground"><ArrowDown /></a>
        </div>
      </section>

      <section id="cartao" className="bg-surface py-20 sm:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-[.85fr_1.15fr] lg:items-center lg:px-12">
          <div>
            <p className="eyebrow">Cartão multibenefícios Visa</p>
            <h1 className="section-title mt-4">Um cartão. Múltiplas possibilidades.</h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">A Imã reúne categorias de benefícios em uma experiência simples, acompanhada de aplicativo para consultar saldo, acompanhar compras e gerenciar o cartão.</p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {["Cartão físico Visa", "Pagamento por aproximação", "Compras físicas e digitais", "Gestão pelo aplicativo"].map((item) => <p key={item} className="flex items-center gap-3 font-bold text-primary"><span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-brand-mint"><Check className="size-4" /></span>{item}</p>)}
            </div>
          </div>
          <img src={officialCard.url} alt="Cartão verde oficial da Imã com bandeira Visa" width={1366} height={768} className="w-full rounded-md object-contain" />
        </div>
      </section>

      <section id="beneficios" className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <div className="max-w-3xl"><p className="eyebrow">Benefícios para diferentes momentos</p><h2 className="section-title mt-4">Uma solução que acompanha a vida real.</h2><p className="mt-5 text-lg leading-relaxed text-muted-foreground">Categorias e experiências disponíveis conforme a configuração contratada e a validação técnica.</p></div>
          <div className="mt-12 grid gap-px overflow-hidden rounded-md border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
            {benefits.map(({ icon: Icon, title, text }) => <article key={title} className="group min-h-60 bg-background p-7 transition-colors hover:bg-surface sm:p-8"><div className="flex size-11 items-center justify-center rounded-md bg-brand-mint text-primary"><Icon className="size-5" /></div><h3 className="mt-7 text-xl font-bold text-primary">{title}</h3><p className="mt-3 leading-relaxed text-muted-foreground">{text}</p></article>)}
          </div>
        </div>
      </section>

      <section id="sua-marca" className="bg-primary py-20 text-primary-foreground sm:py-28">
        <div className="mx-auto grid max-w-7xl gap-14 px-5 sm:px-8 lg:grid-cols-[.9fr_1.1fr] lg:items-center lg:px-12">
          <div>
            <p className="eyebrow text-brand-mint">O maior diferencial</p>
            <h2 className="mt-4 text-4xl font-extrabold leading-tight sm:text-5xl">Os benefícios da sua empresa também podem ter a sua marca.</h2>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-primary-foreground/75">Com a Imã, cartão, aplicativo e comunicação podem carregar a identidade da sua empresa. O colaborador reconhece a marca, percebe o cuidado e vivencia o benefício como parte da cultura da organização.</p>
            <p className="mt-7 border-l-4 border-accent pl-5 text-xl font-bold">Se a sua empresa investe nos benefícios, a sua marca deve fazer parte dessa experiência.</p>
            <Button asChild size="lg" className="mt-9 h-auto min-h-12 bg-accent px-6 py-3 text-accent-foreground hover:bg-accent/90"><a href="#contato">Quero ver minha marca nessa experiência <ArrowRight /></a></Button>
          </div>
          <div className="relative">
            <img src={brandExperience.url} alt="Exemplo conceitual de experiência personalizada com cartão, aplicativo e materiais de marca" loading="lazy" className="aspect-[4/3] w-full rounded-md object-cover" />
            <p className="mt-4 text-sm leading-relaxed text-primary-foreground/65">Exemplo conceitual. As possibilidades de personalização dependem da configuração contratada e da validação técnica.</p>
          </div>
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
            <article className="info-panel bg-primary text-primary-foreground"><CreditCard /><p className="info-kicker text-brand-mint">Visa</p><h2>Liberdade para usar. Segurança para confiar.</h2><p>Cartão com bandeira Visa, pagamento por aproximação e uso em estabelecimentos físicos e digitais, conforme configuração.</p></article>
            <article className="info-panel"><Bus /><p className="info-kicker">Mobilidade</p><h2>Da casa ao trabalho, com mais simplicidade.</h2><p>Vale-transporte e mobilidade podem ser organizados de forma integrada, conforme serviços contratados e cobertura disponível.</p></article>
            <article className="info-panel"><Award /><p className="info-kicker">Premiação</p><h2>Reconhecimento que o colaborador percebe.</h2><p>Apoio a incentivos, campanhas internas e conquistas, sempre com estruturação adequada e sem substituir salário ou verbas obrigatórias.</p></article>
          </div>
        </div>
      </section>

      <section className="bg-primary py-20 text-primary-foreground sm:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-[.8fr_1.2fr] lg:items-center lg:px-12">
          <div><Gift className="size-10 text-brand-mint" /><p className="eyebrow mt-7 text-brand-mint">Clube de benefícios</p><h2 className="mt-4 text-4xl font-extrabold leading-tight sm:text-5xl">Vantagens que continuam além do cartão.</h2></div>
          <div><p className="text-xl leading-relaxed text-primary-foreground/80">Um ecossistema de vantagens pode ampliar a percepção de valor com descontos, saúde, bem-estar, lazer, cultura, serviços e conveniência.</p><p className="mt-5 text-sm text-primary-foreground/60">Condições, parceiros e vantagens estão sujeitos à disponibilidade e à configuração comercial.</p></div>
        </div>
      </section>

      <section id="seguranca" className="bg-surface py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <div className="grid gap-8 lg:grid-cols-2">
            <article className="rounded-md border border-border bg-background p-7 sm:p-10"><Scale className="size-9 text-accent" /><p className="eyebrow mt-7">PAT e segurança jurídica</p><h2 className="mt-4 text-3xl font-extrabold text-primary sm:text-4xl">Benefícios estruturados com mais segurança.</h2><p className="mt-5 leading-relaxed text-muted-foreground">A Imã oferece uma estrutura preparada para apoiar empresas na organização de seus benefícios. A definição da política e seu enquadramento jurídico devem considerar a realidade de cada organização, as regras do PAT, a legislação aplicável e a separação adequada das categorias.</p></article>
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
              ["O que é a Imã?", "Uma solução de multibenefícios corporativos que reúne cartão Visa, aplicativo e uma experiência pensada para atrair, valorizar e reter pessoas."],
              ["A empresa pode ter sua marca no cartão?", "Sim. Cartão, aplicativo e comunicação podem receber a identidade da empresa, conforme a configuração contratada e a validação técnica."],
              ["Quais benefícios podem ser oferecidos?", "A solução pode contemplar alimentação, refeição, mobilidade, saúde, bem-estar, cultura, lazer, premiação, reconhecimento e clube de benefícios, conforme contratação e disponibilidade."],
              ["A Imã garante conformidade com PAT ou NR-1?", "Não de forma isolada. A Imã apoia a organização dos benefícios, enquanto políticas, enquadramento jurídico e gestão de riscos dependem da realidade e das responsabilidades de cada empresa."],
            ].map(([question, answer]) => <details key={question} className="group py-6"><summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-lg font-bold text-primary">{question}<ChevronDown className="size-5 shrink-0 transition-transform group-open:rotate-180" /></summary><p className="mt-4 max-w-3xl leading-relaxed text-muted-foreground">{answer}</p></details>)}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-accent py-16 text-accent-foreground sm:py-20">
        <div className="wave-lines absolute inset-0 opacity-20" />
        <div className="relative mx-auto flex max-w-5xl flex-col items-center px-5 text-center sm:px-8"><p className="text-sm font-extrabold uppercase tracking-[.16em]">Sua empresa tem IMÃ?</p><h2 className="mt-5 text-4xl font-extrabold leading-tight sm:text-5xl">Transforme benefícios em uma experiência que carrega a identidade da sua empresa.</h2><p className="mt-5 max-w-3xl text-lg leading-relaxed text-accent-foreground/75">Aproxime pessoas, fortaleça vínculos e torne o cuidado da empresa reconhecível todos os dias.</p><Button asChild size="lg" className="mt-8 h-auto min-h-12 bg-primary px-6 py-3 text-primary-foreground hover:bg-primary/90"><a href="#contato">Quero levar a Imã para minha empresa <ArrowRight /></a></Button></div>
      </section>

      <section id="contato" className="bg-primary py-20 text-primary-foreground sm:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-[.8fr_1.2fr] lg:items-start lg:px-12">
          <div className="lg:sticky lg:top-28"><p className="eyebrow text-brand-mint">Conversa comercial</p><h2 className="mt-4 text-4xl font-extrabold leading-tight sm:text-5xl">Vamos criar uma experiência que tenha a marca da sua empresa?</h2><p className="mt-6 max-w-lg text-lg leading-relaxed text-primary-foreground/70">Conte um pouco sobre o seu momento. Sua mensagem será preparada no aplicativo de e-mail para envio.</p></div>
          <form onSubmit={submitCommercialForm} className="grid gap-5 rounded-md bg-background p-6 text-foreground shadow-xl sm:grid-cols-2 sm:p-8">
            <Field label="Nome" name="nome" autoComplete="name" required />
            <Field label="Empresa" name="empresa" autoComplete="organization" required />
            <Field label="Cargo" name="cargo" autoComplete="organization-title" required />
            <Field label="E-mail corporativo" name="email" type="email" autoComplete="email" required />
            <Field label="WhatsApp" name="whatsapp" type="tel" autoComplete="tel" required />
            <label className="form-label">Número aproximado de colaboradores<select name="colaboradores" required defaultValue="" className="form-control"><option value="" disabled>Selecione</option><option>Até 50</option><option>De 51 a 200</option><option>De 201 a 500</option><option>De 501 a 1.000</option><option>Mais de 1.000</option></select></label>
            <label className="form-label">Benefícios de interesse<input name="beneficios" required maxLength={300} placeholder="Ex.: alimentação, mobilidade e bem-estar" className="form-control" /></label>
            <label className="form-label">Interesse em cartão personalizado<select name="personalizado" required defaultValue="" className="form-control"><option value="" disabled>Selecione</option><option>Sim</option><option>Quero entender melhor</option><option>Ainda não sei</option></select></label>
            <label className="form-label sm:col-span-2">Mensagem<textarea name="mensagem" rows={4} maxLength={1000} className="form-control h-auto resize-none py-3" /></label>
            <label className="flex items-start gap-3 text-sm leading-relaxed text-muted-foreground sm:col-span-2"><input type="checkbox" name="consentimento" required className="mt-1 size-4 shrink-0 accent-primary" />Autorizo o tratamento dos meus dados para receber contato comercial da Imã.</label>
            <Button type="submit" size="lg" className="h-12 bg-accent text-accent-foreground hover:bg-accent/90 sm:col-span-2">Solicitar uma proposta <ArrowRight /></Button>
          </form>
        </div>
      </section>

      <footer className="bg-primary-deep py-12 text-primary-foreground">
        <div className="mx-auto flex max-w-7xl flex-col gap-9 px-5 sm:px-8 lg:px-12">
          <div className="flex flex-col justify-between gap-8 sm:flex-row sm:items-end">
            <div><img src={logo.url} alt="Imã" loading="lazy" className="h-11 w-auto brightness-0 invert" /><p className="mt-4 text-sm text-primary-foreground/65">Benefícios que atraem. Pessoas que ficam.</p></div>
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