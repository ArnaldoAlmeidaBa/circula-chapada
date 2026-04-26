import { Trip, TripStatus } from "@/data/trips";

export function getTripStatus(trip: Trip): TripStatus {
  if (trip.seatsAvailable === 0) return "lotado";
  const now = new Date();
  const [h, m] = trip.departureTime.split(":").map(Number);
  const dep = new Date();
  dep.setHours(h, m, 0, 0);
  const diffMin = (dep.getTime() - now.getTime()) / 60000;
  if (diffMin >= -15 && diffMin <= 60) return "saindo";
  return "proxima";
}

export function statusLabel(s: TripStatus) {
  return s === "saindo" ? "Saindo agora" : s === "lotado" ? "Lotado" : "Próxima";
}

export function whatsappLink(phone: string, message: string) {
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

export function formatBRL(v: number) {
  return v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}
