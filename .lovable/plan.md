# Remover Biz e adicionar ícones de contato

## O que será feito

1. **Remover a menção à Biz**
   - Excluir a linha do rodapé: "Made by Biz. Tecnologia e infraestrutura operacional fornecidas pela Biz."
   - É a única menção visível no site; nenhuma outra aparece em textos, títulos ou botões.
   - Ajuste no layout do rodapé para a linha de copyright ficar alinhada sem lacuna.

2. **Ícones de contato no rodapé**
   - E-mail: ícone de envelope (Mail), clicável — abre o e-mail para contato@ima.com.br já com assunto e mensagem preenchidos (link atual mantido).
   - WhatsApp: ícone do WhatsApp — clicável, abre `https://wa.me/5511996443300` em nova aba com mensagem inicial contextualizada.
   - Instagram: mantido como está (@somos.ima, nova aba).
   - Os três ícones ficam juntos no rodapé, ao lado do texto atual (contato@ima.com.br, telefone e @somos.ima), no mesmo estilo visual (verde-escuro com destaque amarelo no toque/click).

3. **Atualizar o checklist interno** do projeto refletindo a remoção da Biz.

## Notas técnicas

- O WhatsApp não existe na biblioteca de ícones usada (lucide); será um pequeno SVG embutido com o desenho oficial do aplicativo, mesmo tamanho e traço dos outros ícones.
- Arquivo único alterado: `src/routes/index.tsx` (mais `roadmap.md` para o checklist interno).
