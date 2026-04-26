import { Link } from "react-router-dom";
import { Trip } from "@/data/trips";
import { formatBRL, getTripStatus, statusLabel, whatsappLink } from "@/lib/trip-utils";
import { Clock, MapPin, Users, Car } from "lucide-react";

export function TripCard({ trip }: { trip: Trip }) {
  const status = getTripStatus(trip);
  const statusStyles = {
    saindo: "bg-success text-success-foreground animate-pulse-soft",
    proxima: "bg-sky text-sky-foreground",
    lotado: "bg-muted text-muted-foreground",
  }[status];

  return (
    <article className="bg-gradient-card rounded-3xl p-5 shadow-card border border-border/60 transition-smooth hover:shadow-elevated animate-fade-up">
      <div className="flex items-start justify-between gap-3 mb-4">
        <div className="min-w-0">
          <div className="flex items-center gap-2 text-muted-foreground text-xs font-semibold uppercase tracking-wide mb-1">
            <Car size={14} />
            <span>{trip.vehicle} · {trip.vehicleModel}</span>
          </div>
          <h3 className="font-display font-bold text-lg text-foreground truncate">{trip.driver}</h3>
        </div>
        <span className={`shrink-0 text-xs font-bold px-3 py-1.5 rounded-full ${statusStyles}`}>
          {statusLabel(status)}
        </span>
      </div>

      <div className="flex items-center gap-3 mb-4">
        <div className="flex-1 min-w-0">
          <p className="text-xs text-muted-foreground font-semibold">DE</p>
          <p className="font-bold text-foreground truncate">{trip.origin}</p>
        </div>
        <div className="text-primary text-xl">→</div>
        <div className="flex-1 min-w-0 text-right">
          <p className="text-xs text-muted-foreground font-semibold">PARA</p>
          <p className="font-bold text-foreground truncate">{trip.destination}</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 mb-4 text-sm">
        <div className="flex flex-col items-center gap-1 bg-muted/60 rounded-xl py-2">
          <Clock size={16} className="text-primary" />
          <span className="font-bold">{trip.departureTime}</span>
        </div>
        <div className="flex flex-col items-center gap-1 bg-muted/60 rounded-xl py-2">
          <Users size={16} className="text-primary" />
          <span className="font-bold">{trip.seatsAvailable}/{trip.totalSeats}</span>
        </div>
        <div className="flex flex-col items-center gap-1 bg-muted/60 rounded-xl py-2">
          <MapPin size={16} className="text-primary" />
          <span className="font-bold">{formatBRL(trip.price)}</span>
        </div>
      </div>

      <div className="flex gap-2">
        <Link
          to={`/viagem/${trip.id}`}
          className="flex-1 text-center py-3 rounded-2xl border-2 border-border font-bold text-foreground hover:border-primary transition-smooth"
        >
          Detalhes
        </Link>
        <a
          href={whatsappLink(trip.whatsapp, `Olá ${trip.driver}, vi sua viagem ${trip.origin} → ${trip.destination} às ${trip.departureTime} no Conexão Ibicoara. Tem vaga?`)}
          target="_blank"
          rel="noreferrer"
          aria-disabled={status === "lotado"}
          className={`flex-1 text-center py-3 rounded-2xl font-bold transition-smooth ${
            status === "lotado"
              ? "bg-muted text-muted-foreground pointer-events-none"
              : "bg-success text-success-foreground hover:opacity-90 shadow-soft"
          }`}
        >
          WhatsApp
        </a>
      </div>
    </article>
  );
}
