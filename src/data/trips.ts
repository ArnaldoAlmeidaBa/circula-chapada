export type TripStatus = "saindo" | "proxima" | "lotado";
export type VehicleType = "Carro" | "Van" | "Hilux" | "Topic";

export interface Trip {
  id: string;
  driver: string;
  vehicle: VehicleType;
  vehicleModel: string;
  origin: string;
  destination: string;
  departureTime: string; // HH:mm
  date: string; // hoje
  price: number;
  seatsAvailable: number;
  totalSeats: number;
  whatsapp: string; // só dígitos com DDI
  meetingPoint: string;
  rules: string[];
  notes?: string;
}

export const DESTINOS_RAPIDOS = [
  "Barra da Estiva",
  "Cascavel",
  "Brejão",
  "Zona Rural",
] as const;

export const CIDADES = [
  "Ibicoara",
  "Barra da Estiva",
  "Cascavel",
  "Brejão",
  "Mucugê",
  "Capão",
  "Cristais",
  "Zona Rural",
];

const hoje = new Date().toISOString().slice(0, 10);

export const TRIPS: Trip[] = [
  {
    id: "1",
    driver: "Seu Damião",
    vehicle: "Van",
    vehicleModel: "Sprinter Branca",
    origin: "Ibicoara",
    destination: "Barra da Estiva",
    departureTime: "06:30",
    date: hoje,
    price: 20,
    seatsAvailable: 4,
    totalSeats: 15,
    whatsapp: "5577999990001",
    meetingPoint: "Praça da Matriz, em frente à padaria",
    rules: ["Sem fumar dentro do veículo", "Bagagem pequena gratuita", "Pagamento na entrada"],
    notes: "Viagem diária, exceto domingos.",
  },
  {
    id: "2",
    driver: "João Mototáxi",
    vehicle: "Carro",
    vehicleModel: "Gol Prata",
    origin: "Ibicoara",
    destination: "Cascavel",
    departureTime: "07:00",
    date: hoje,
    price: 15,
    seatsAvailable: 0,
    totalSeats: 4,
    whatsapp: "5577999990002",
    meetingPoint: "Posto Ipiranga, BR-242",
    rules: ["Pontualidade", "Aceita Pix"],
  },
  {
    id: "3",
    driver: "Dona Marlene",
    vehicle: "Hilux",
    vehicleModel: "Hilux Cabine Dupla",
    origin: "Cascavel",
    destination: "Brejão",
    departureTime: "08:15",
    date: hoje,
    price: 12,
    seatsAvailable: 3,
    totalSeats: 5,
    whatsapp: "5577999990003",
    meetingPoint: "Mercadinho do Tião",
    rules: ["Estrada de chão", "Bagagem na caçamba"],
    notes: "Volta às 16h.",
  },
  {
    id: "4",
    driver: "Carlinhos da Topic",
    vehicle: "Topic",
    vehicleModel: "Kombi Verde",
    origin: "Ibicoara",
    destination: "Mucugê",
    departureTime: "09:00",
    date: hoje,
    price: 25,
    seatsAvailable: 6,
    totalSeats: 12,
    whatsapp: "5577999990004",
    meetingPoint: "Rodoviária de Ibicoara",
    rules: ["Crianças no colo não pagam", "Aceita Pix e dinheiro"],
  },
  {
    id: "5",
    driver: "Zé do Capão",
    vehicle: "Van",
    vehicleModel: "Master Branca",
    origin: "Ibicoara",
    destination: "Capão",
    departureTime: "13:30",
    date: hoje,
    price: 30,
    seatsAvailable: 8,
    totalSeats: 14,
    whatsapp: "5577999990005",
    meetingPoint: "Praça do Coreto",
    rules: ["Reservar com 2h de antecedência", "Parada para água em Mucugê"],
  },
  {
    id: "6",
    driver: "Antônio Rural",
    vehicle: "Hilux",
    vehicleModel: "Hilux Bege",
    origin: "Ibicoara",
    destination: "Zona Rural",
    departureTime: "14:00",
    date: hoje,
    price: 8,
    seatsAvailable: 2,
    totalSeats: 6,
    whatsapp: "5577999990006",
    meetingPoint: "Mercado Municipal",
    rules: ["Atende comunidades: Cristais, Brejão, Pé de Serra"],
    notes: "Roteiro confirmado por WhatsApp.",
  },
  {
    id: "7",
    driver: "Pedro Express",
    vehicle: "Carro",
    vehicleModel: "Onix Branco",
    origin: "Barra da Estiva",
    destination: "Ibicoara",
    departureTime: "17:30",
    date: hoje,
    price: 20,
    seatsAvailable: 3,
    totalSeats: 4,
    whatsapp: "5577999990007",
    meetingPoint: "Praça Central de Barra da Estiva",
    rules: ["Ar-condicionado", "Pagamento Pix preferencial"],
  },
];
