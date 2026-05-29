# Estado Encontrado 2026

## Fontes consideradas
- Telas originais do prototipo (home, lista de viagens, detalhe da viagem, oferecer viagem).
- Codigo atual em `src/data/trips.ts`, `src/components/TripCard.tsx`, `src/pages/TripDetails.tsx`, `src/pages/Offer.tsx`, `src/pages/Index.tsx`.
- Documentacao existente em `docs/RENOMEACAO_CIRCULA_CHAPADA.md` e `docs/LEITURA_CONCEITUAL_DAS_TELAS.md`.

## O que existe hoje

### Observacoes
- Existe uma aplicacao frontend React com rotas para inicio, viagens, detalhe de viagem e oferecer viagem.
- A listagem de viagens usa dados locais em memoria (`TRIPS`) definidos em `src/data/trips.ts`.
- Cada viagem exibe condutor, veiculo, origem, destino, horario, vagas e preco.
- Existe acao de contato via link de WhatsApp nas telas de card e detalhe.
- Existe formulario de oferta de viagem com validacao local usando `zod`.
- Existe estado local de envio no formulario (`submitted`) que mostra confirmacao visual apos validacao.

### Interpretacoes
- O produto atual opera como quadro digital de ofertas de transporte regional com foco de consulta e contato.

### Hipoteses
- O fluxo principal esperado e: descobrir viagem, confirmar dados e falar no WhatsApp.

### Nao decidido
- Nao ha evidencia suficiente para afirmar volume real de uso, adesao de motoristas ou frequencia operacional.

## O que e mockado

### Observacoes
- Os dados de viagens, cidades e destinos rapidos estao hardcoded em arquivos locais.
- O formulario de "Oferecer viagem" nao persiste dados em banco no codigo lido.
- O status das viagens depende de logica local sobre os dados presentes.

### Interpretacoes
- O projeto esta em estado de prototipo funcional de interface e fluxo, com dados simulados/controlados localmente.

### Hipoteses
- A publicacao de viagem foi pensada para posterior integracao com persistencia externa, mas isso nao esta implementado.

### Nao decidido
- Nao se pode afirmar qual backend seria adotado, nem regras finais de sincronizacao.

## O que parece funcional

### Observacoes
- Navegacao entre paginas funciona por rotas definidas.
- Filtros e exibicao de cards de viagem sao renderizados no frontend.
- Link de WhatsApp e montado com mensagem contextual da viagem.
- Validacao de campos obrigatorios no formulario de oferta ocorre no cliente.
- Build de producao do projeto conclui com sucesso.

### Interpretacoes
- O prototipo entrega um fluxo de demonstracao navegavel com interacoes basicas consistentes.

### Hipoteses
- Em ambiente de uso, a conversao efetiva acontece fora do app, no WhatsApp.

### Nao decidido
- Nao ha evidencia de telemetria, logs de erro ou monitoramento em producao.

## O que nao existe

### Observacoes
- Nao foram encontradas evidencias, nos arquivos analisados, de backend ativo para viagens.
- Nao foram encontradas evidencias, nos arquivos analisados, de autenticacao/login.
- Nao foram encontradas evidencias, nos arquivos analisados, de painel administrativo.
- Nao foram encontradas evidencias, nos arquivos analisados, de integracao com Supabase, Traccar ou API externa para persistencia/operacao.
- Nao foram encontradas evidencias, nos arquivos analisados, de pagamentos, reserva transacional ou conciliacao de vagas em tempo real.

### Interpretacoes
- O sistema atual nao deve ser tratado como plataforma operacional completa de despacho/gestao.

### Hipoteses
- Parte da arquitetura operacional pode estar planejada para ciclos futuros, mas permanece fora do estado encontrado.

### Nao decidido
- Nao e possivel afirmar priorizacao futura ou ordem de implementacao sem novas evidencias.

## O que nao deve ser presumido

### Observacoes
- A existencia de UI nao comprova existencia de servicos de dados persistentes.
- A mensagem "Viagem publicada" no frontend nao comprova gravacao real em banco.
- A presenca de rotas e componentes nao comprova governanca operacional (homologacao, moderacao, SLA).

### Interpretacoes
- O estado atual descreve capacidade de demonstracao e organizacao conceitual, nao operacao completa validada ponta a ponta.

### Hipoteses
- O prototipo foi concebido para clarificar proposta de valor antes de expansao funcional.

### Nao decidido
- Nao e possivel afirmar readiness de producao apenas com as evidencias deste microbloco.

Estado encontrado, sem expansao de escopo.
