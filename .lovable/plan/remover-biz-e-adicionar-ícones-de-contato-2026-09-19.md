# Remover menções a fornecedores e adicionar ícones de contato

## O que será feito

1. **Remover menções nominais a fornecedores**
   - Excluir do rodapé qualquer crédito ou referência a empresas parceiras ou fornecedoras.
   - É a única menção visível no site; nenhuma outra aparece em textos, títulos ou botões.
   - Ajuste no layout do rodapé para a linha de copyright ficar alinhada sem lacuna.

2. **Ícones de contato no rodapé**
   - E-mail: ícone de envelope (Mail), clicável — abre o e-mail para contato@ima.com.br já com assunto e mensagem preenchidos (link atual mantido).
   - WhatsApp: ícone do WhatsApp — clicável, abre `https://wa.me/5511996443300` em nova aba com mensagem inicial contextualizada.
   - Instagram: mantido como está (@somos.ima, nova aba).
   - Os três ícones ficam juntos no rodapé, ao lado do texto atual (contato@ima.com.br, telefone e @somos.ima), no mesmo estilo visual (verde-escuro com destaque amarelo no toque/click).

3. **Atualizar o checklist interno** do projeto refletindo a remoção dessas referências.

## Notas técnicas

- O WhatsApp não existe na biblioteca de ícones usada (lucide); será um pequeno SVG embutido com o desenho oficial do aplicativo, mesmo tamanho e traço dos outros ícones.
- Arquivo único alterado: `src/routes/index.tsx` (mais o checklist interno do projeto).

## Seção "Aplicativo personalizado": trocar as telas

- As três imagens atuais do celular (acesso, benefícios, perfil) estão praticamente pretas — o conteúdo da tela não aparece, e a seção vira uma mancha escura sem significado.
- Serão geradas novas telas de aplicativo no estilo da Imã (verde-escuro, amarelo e menta do manual da marca), legíveis e com identidade da empresa cliente:
  - **Saldo e benefícios** — saldo do cartão e categorias de benefícios.
  - **Cartão virtual** — cartão com espaço para a marca da empresa.
  - **Perfil do colaborador** — dados e acesso a suporte.
- As novas telas substituem as atuais na mesma composição (três celulares sobre fundo verde-escuro), sem mudar textos nem o restante da seção.

