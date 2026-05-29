# Marco Local Real 0.1

## Escopo concluido
- O app agora aceita criacao local de viagens via `Oferecer viagem`.
- Os dados persistem no navegador por `localStorage`.
- Lista (`/viagens`) e detalhe (`/viagem/:id`) leem do store local.
- O seed mock e usado apenas quando nao ha dados locais.
- Nao ha merge permanente entre mock e runtime.

## Limites explicitados
- Nao ha sincronizacao entre aparelhos.
- Nao ha backend.
- Nao ha autenticacao/login.
- Nao ha validacao comunitaria.
- WhatsApp segue como canal humano de combinacao.
- Nao usar Supabase neste ciclo.
- Nao iniciar Firebase neste ciclo.

## Contrato local adotado
- `listTrips()`
- `getTripById(id)`
- `createTrip(input)`
- `updateTrip(id, input)`

Modelo persistido inclui `createdAt` e `updatedAt` como memoria minima do registro.

## Validacao obrigatoria

### Cenario A
1. Criar viagem.
2. Fechar navegador.
3. Abrir novamente.
4. Confirmar persistencia da viagem.

Resultado esperado: viagem permanece disponivel (persistencia local).

### Cenario B
1. Limpar `localStorage` do dominio.
2. Recarregar app.
3. Confirmar retorno ao seed.

Resultado esperado: lista volta ao seed mock inicial.

## Estado deste marco
- Fluxo local real minimo implementado sem expansao de escopo.
- Sem introducao de backend, login, admin, edicao/exclusao de viagens, Supabase/Firebase, integracoes externas ou Traccar.
- Local Real 0.1 encerrado com sucesso antes de qualquer discussao sobre backend.

## Decisao arquitetural deste encerramento
- A persistencia em `localStorage` permanece como base operacional deste ciclo.
- O contrato simples do store local foi mantido para facilitar futura substituicao por Firestore, sem implementacao nesta etapa.
- Firebase fica apenas registrado como alternativa futura, motivada por limitacoes de cota/custo observadas no Supabase em cenarios de evolucao.
