# Imã Site

Site institucional oficial da Imã, marca do Grupo Thanks.

## Produção

Repositório canônico: `samarathanks/ima-site`

Domínio oficial: `https://somosima.com.br`

A hospedagem de produção está sendo migrada do Lovable para GitHub Pages. O Lovable permanece apenas como origem histórica/editor visual enquanto a migração é validada.

## Build

Este projeto usa TanStack Start. A rota pública é prerenderizada para HTML estático no build de produção e publicada a partir de `.output/public`.

```sh
npm ci
npm run build
```

## Deploy

O workflow `.github/workflows/pages.yml` publica automaticamente o conteúdo estático no GitHub Pages quando há push na branch `main`.

## Desenvolvimento local

```sh
npm ci
npm run dev
```

## Observação

Não alterar DNS do domínio até o workflow do GitHub Pages estar validado e a publicação estática responder corretamente.
