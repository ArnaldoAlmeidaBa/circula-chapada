# Plano Local Real

## Diagnostico do mock atual

### O que hoje e fixo/mockado
- `src/data/trips.ts` concentra seed estatico de viagens (`TRIPS`) e listas fixas (`CIDADES`, `DESTINOS_RAPIDOS`).
- Tipagem principal de viagem vive em `Trip` (com `date`, `meetingPoint`, `rules`) e nao separa claramente registro persistido de projeção de interface.
- `src/lib/trip-utils.ts` opera sobre dados em memoria para status, moeda e link de WhatsApp.

### O que precisa virar dado editavel
- Cadastro de nova viagem precisa persistir fora do estado React local.
- Lista e detalhe precisam ler do armazenamento local de runtime.
- Seed mock precisa existir apenas para bootstrap inicial quando storage estiver vazio.

## Contrato local minimo (sem backend)
- Store local em `localStorage` com API:
  - `listTrips()`
  - `getTripById(id)`
  - `createTrip(input)`
  - `updateTrip(id, input)`
- Modelo persistido minimo inclui:
  - `id`, `driver`, `vehicle`, `vehicleModel`, `origin`, `destination`, `departureDate`, `departureTime`, `totalSeats`, `seatsAvailable`, `price`, `whatsapp`, `notes`, `createdAt`, `updatedAt`.

## Politica de seed
- Se `localStorage` nao tiver dados: inicializa com seed mock.
- Se houver dados locais: runtime usa apenas dados locais.
- Nao ha merge permanente entre mock e runtime.

## Limites deste microbloco
- Sem backend.
- Sem autenticacao/login.
- Sem admin/homologacao.
- Sem sync entre aparelhos.
- WhatsApp permanece como canal humano.
- Sem Supabase neste ciclo.
- Sem Firebase neste ciclo.

## Nota de evolucao futura (nao implementada)
- Firebase/Firestore pode ser avaliado em microbloco futuro como alternativa de backend, motivado por restricoes de cota/custo no Supabase.
- Nenhuma integracao de backend foi iniciada neste marco.
