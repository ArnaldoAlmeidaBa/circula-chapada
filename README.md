# Circula Chapada

Circula Chapada e um experimento de mobilidade regional voltado para a organizacao e visualizacao de viagens e transportes entre localidades da Chapada Diamantina.

O projeto nao foi concebido como aplicativo de corridas urbanas nem como plataforma de transporte sob demanda. Sua proposta atual e funcionar como um quadro digital de circulacao regional, aproximando passageiros de motoristas e operadores ja existentes no territorio.

## Estado Atual

Fase atual:

**Local Real 0.1**

Capacidades disponiveis:

* cadastro local de viagens;
* persistencia via localStorage;
* listagem de viagens;
* visualizacao de detalhes;
* contato via WhatsApp;
* funcionamento em desktop e mobile.

Limitacoes atuais:

* sem autenticacao;
* sem sincronizacao entre dispositivos;
* sem backend;
* sem Firebase;
* sem Supabase;
* sem integracao com Traccar.

## Principios

* tecnologia como apoio a coordenacao humana;
* simplicidade operacional;
* valorizacao das dinamicas territoriais existentes;
* evolucao por microblocos;
* observacao antes de automacao.

## Documentacao

Leituras conceituais:

* docs/IDENTIDADE_DO_PRODUTO.md
* docs/LEITURA_CONCEITUAL_DAS_TELAS.md
* docs/ESTADO_ENCONTRADO_2026.md

Marcos:

* docs/MARCO_REDESCOBERTA_CIRCULA_CHAPADA.md
* docs/MARCO_LOCAL_REAL_0_1.md

Planejamento:

* docs/PLANO_LOCAL_REAL.md

## Desenvolvimento

Instalacao:

```bash
npm install
npm run dev
```

Build:

```bash
npm run build
```

## Observacao

O Circula Chapada e o Caronas Chapada sao projetos distintos.

Caronas Chapada investiga compartilhamento de viagens entre pessoas que ja realizariam determinado deslocamento.

Circula Chapada investiga a organizacao e visualizacao de transportes e viagens regionais oferecidos por motoristas e operadores do territorio.
