import { useMemo, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { CIDADES } from "@/data/trips";
import { TripCard } from "@/components/TripCard";
import { getTripStatus } from "@/lib/trip-utils";
import { listTrips } from "@/lib/local-trip-store";
import { Filter, X } from "lucide-react";

const HORARIOS = [
  { id: "all", label: "Todos" },
  { id: "manha", label: "Manhã (até 12h)" },
  { id: "tarde", label: "Tarde (12h–18h)" },
  { id: "noite", label: "Noite (após 18h)" },
];

const Trips = () => {
  const [params, setParams] = useSearchParams();
  const destino = params.get("destino") ?? "";
  const [horario, setHorario] = useState("all");
  const [showFilter, setShowFilter] = useState(false);
  const trips = useMemo(() => listTrips(), []);

  const filtered = useMemo(() => {
    return trips.filter((t) => {
      const matchDest = !destino || t.destination.toLowerCase().includes(destino.toLowerCase());
      const h = parseInt(t.departureTime.split(":")[0], 10);
      const matchHora =
        horario === "all" ||
        (horario === "manha" && h < 12) ||
        (horario === "tarde" && h >= 12 && h < 18) ||
        (horario === "noite" && h >= 18);
      return matchDest && matchHora;
    }).sort((a, b) => {
      // saindo agora primeiro
      const sa = getTripStatus(a);
      const sb = getTripStatus(b);
      const order = { saindo: 0, proxima: 1, lotado: 2 };
      if (order[sa] !== order[sb]) return order[sa] - order[sb];
      return a.departureTime.localeCompare(b.departureTime);
    });
  }, [destino, horario, trips]);

  const setDestino = (v: string) => {
    const p = new URLSearchParams(params);
    if (v) p.set("destino", v);
    else p.delete("destino");
    setParams(p);
  };

  return (
    <div className="space-y-4 animate-fade-up">
      <div className="pt-2">
        <h1 className="font-display text-3xl font-extrabold">Viagens de hoje</h1>
        <p className="text-muted-foreground font-medium">
          {filtered.length} {filtered.length === 1 ? "viagem encontrada" : "viagens encontradas"}
        </p>
      </div>

      {/* Filtro toggle */}
      <div className="flex items-center gap-2 flex-wrap">
        <button
          onClick={() => setShowFilter((s) => !s)}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-card border border-border font-semibold text-sm hover:border-primary transition-smooth"
        >
          <Filter size={16} />
          Filtros
        </button>
        {destino && (
          <span className="inline-flex items-center gap-1 bg-primary/10 text-primary px-3 py-2 rounded-full text-sm font-semibold">
            {destino}
            <button onClick={() => setDestino("")} aria-label="Remover filtro">
              <X size={14} />
            </button>
          </span>
        )}
        {horario !== "all" && (
          <span className="inline-flex items-center gap-1 bg-primary/10 text-primary px-3 py-2 rounded-full text-sm font-semibold">
            {HORARIOS.find((h) => h.id === horario)?.label}
            <button onClick={() => setHorario("all")} aria-label="Remover filtro">
              <X size={14} />
            </button>
          </span>
        )}
      </div>

      {showFilter && (
        <div className="bg-card border border-border rounded-2xl p-4 space-y-4 animate-fade-up">
          <div>
            <label className="text-sm font-bold mb-2 block">Destino</label>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setDestino("")}
                className={`px-3 py-1.5 rounded-full text-sm font-semibold border transition-smooth ${
                  !destino ? "bg-primary text-primary-foreground border-primary" : "border-border"
                }`}
              >
                Todos
              </button>
              {CIDADES.map((c) => (
                <button
                  key={c}
                  onClick={() => setDestino(c)}
                  className={`px-3 py-1.5 rounded-full text-sm font-semibold border transition-smooth ${
                    destino === c ? "bg-primary text-primary-foreground border-primary" : "border-border"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="text-sm font-bold mb-2 block">Horário</label>
            <div className="flex flex-wrap gap-2">
              {HORARIOS.map((h) => (
                <button
                  key={h.id}
                  onClick={() => setHorario(h.id)}
                  className={`px-3 py-1.5 rounded-full text-sm font-semibold border transition-smooth ${
                    horario === h.id ? "bg-primary text-primary-foreground border-primary" : "border-border"
                  }`}
                >
                  {h.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="space-y-3">
        {filtered.length === 0 ? (
          <div className="text-center py-16 bg-card rounded-3xl border border-border">
            <p className="font-display font-bold text-xl mb-2">Nenhuma viagem encontrada</p>
            <p className="text-muted-foreground mb-6">Tente outro destino ou horário.</p>
            <Link to="/oferecer" className="inline-block bg-primary text-primary-foreground font-bold px-6 py-3 rounded-2xl">
              Oferecer uma viagem
            </Link>
          </div>
        ) : (
          filtered.map((t) => <TripCard key={t.id} trip={t} />)
        )}
      </div>
    </div>
  );
};

export default Trips;
