import { useParams, Link, useNavigate } from "react-router-dom";
import { TRIPS } from "@/data/trips";
import { ArrowLeft, Clock, MapPin, Users, Car, Phone, CheckCircle2, AlertCircle } from "lucide-react";
import { formatBRL, getTripStatus, statusLabel, whatsappLink } from "@/lib/trip-utils";

const TripDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const trip = TRIPS.find((t) => t.id === id);

  if (!trip) {
    return (
      <div className="text-center py-20">
        <p className="font-display font-bold text-xl mb-4">Viagem não encontrada</p>
        <Link to="/viagens" className="text-primary font-bold underline">Voltar para viagens</Link>
      </div>
    );
  }

  const status = getTripStatus(trip);
  const statusStyles = {
    saindo: "bg-success text-success-foreground",
    proxima: "bg-sky text-sky-foreground",
    lotado: "bg-muted text-muted-foreground",
  }[status];

  return (
    <div className="space-y-5 animate-fade-up">
      <button onClick={() => navigate(-1)} className="flex items-center gap-1 text-muted-foreground hover:text-foreground font-semibold pt-2">
        <ArrowLeft size={18} /> Voltar
      </button>

      {/* Header card */}
      <section className="relative overflow-hidden bg-gradient-hero text-primary-foreground rounded-3xl p-6 shadow-elevated">
        <span className={`inline-block text-xs font-bold px-3 py-1.5 rounded-full mb-4 ${statusStyles}`}>
          {statusLabel(status)}
        </span>
        <div className="flex items-center gap-3 text-primary-foreground/90 text-sm mb-2">
          <Car size={16} /> {trip.vehicle} · {trip.vehicleModel}
        </div>
        <h1 className="font-display text-2xl font-extrabold mb-4">{trip.driver}</h1>

        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 flex items-center gap-3">
          <div className="flex-1 min-w-0">
            <p className="text-xs text-primary-foreground/70 font-bold uppercase">De</p>
            <p className="font-bold truncate">{trip.origin}</p>
          </div>
          <div className="text-2xl">→</div>
          <div className="flex-1 min-w-0 text-right">
            <p className="text-xs text-primary-foreground/70 font-bold uppercase">Para</p>
            <p className="font-bold truncate">{trip.destination}</p>
          </div>
        </div>
      </section>

      {/* Info grid */}
      <section className="grid grid-cols-3 gap-3">
        <InfoTile icon={Clock} label="Saída" value={trip.departureTime} />
        <InfoTile icon={Users} label="Vagas" value={`${trip.seatsAvailable}/${trip.totalSeats}`} />
        <InfoTile icon={MapPin} label="Por pessoa" value={formatBRL(trip.price)} />
      </section>

      {/* Local de encontro */}
      <section className="bg-card rounded-2xl p-5 border border-border shadow-soft">
        <h2 className="font-display font-bold text-lg mb-2 flex items-center gap-2">
          <MapPin size={20} className="text-primary" /> Local de encontro
        </h2>
        <p className="text-foreground">{trip.meetingPoint}</p>
      </section>

      {/* Regras */}
      <section className="bg-card rounded-2xl p-5 border border-border shadow-soft">
        <h2 className="font-display font-bold text-lg mb-3 flex items-center gap-2">
          <CheckCircle2 size={20} className="text-primary" /> Regras rápidas
        </h2>
        <ul className="space-y-2">
          {trip.rules.map((r, i) => (
            <li key={i} className="flex items-start gap-2 text-foreground">
              <CheckCircle2 size={18} className="text-success mt-0.5 shrink-0" /> {r}
            </li>
          ))}
        </ul>
      </section>

      {trip.notes && (
        <section className="bg-sand/60 dark:bg-sand rounded-2xl p-4 border border-border flex gap-3">
          <AlertCircle size={20} className="text-accent shrink-0 mt-0.5" />
          <p className="text-sm text-foreground"><strong>Observação:</strong> {trip.notes}</p>
        </section>
      )}

      {/* WhatsApp CTA fixo na parte inferior do conteúdo */}
      <a
        href={whatsappLink(trip.whatsapp, `Olá ${trip.driver}, vi sua viagem ${trip.origin} → ${trip.destination} às ${trip.departureTime} no Conexão Ibicoara. Tem vaga?`)}
        target="_blank"
        rel="noreferrer"
        aria-disabled={status === "lotado"}
        className={`w-full flex items-center justify-center gap-2 py-4 rounded-2xl font-display font-bold text-lg transition-smooth ${
          status === "lotado"
            ? "bg-muted text-muted-foreground pointer-events-none"
            : "bg-success text-success-foreground hover:opacity-90 shadow-card"
        }`}
      >
        <Phone size={20} />
        {status === "lotado" ? "Viagem lotada" : "Falar no WhatsApp"}
      </a>
    </div>
  );
};

function InfoTile({ icon: Icon, label, value }: { icon: typeof Clock; label: string; value: string }) {
  return (
    <div className="bg-card rounded-2xl p-3 text-center border border-border shadow-soft">
      <Icon size={20} className="text-primary mx-auto mb-1" />
      <p className="text-xs text-muted-foreground font-semibold">{label}</p>
      <p className="font-display font-bold text-foreground">{value}</p>
    </div>
  );
}

export default TripDetails;
