import { useNavigate } from "react-router-dom";
import { ArrowRight, Search, PlusCircle, Sparkles } from "lucide-react";
import { useState } from "react";
import heroImg from "@/assets/hero-chapada.jpg";
import { DESTINOS_RAPIDOS, TRIPS } from "@/data/trips";
import { getTripStatus } from "@/lib/trip-utils";

const Home = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  const viagensHoje = TRIPS.length;
  const saindoAgora = TRIPS.filter((t) => getTripStatus(t) === "saindo").length;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/viagens${query ? `?destino=${encodeURIComponent(query)}` : ""}`);
  };

  return (
    <div className="space-y-6 animate-fade-up">
      {/* Hero */}
      <section className="relative overflow-hidden rounded-3xl shadow-elevated -mx-1">
        <img
          src={heroImg}
          alt="Serras da Chapada Diamantina"
          width={1536}
          height={896}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-hero opacity-85" />
        <div className="relative p-6 pt-8 pb-8 text-primary-foreground">
          <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-semibold mb-4">
            <Sparkles size={14} />
            Painel comunitário · Ibicoara e região
          </div>
          <h1 className="font-display text-3xl sm:text-4xl font-extrabold leading-tight mb-2">
            Para onde você<br />vai hoje?
          </h1>
          <p className="text-primary-foreground/85 text-sm mb-5 max-w-sm">
            Encontre vans, carros e motoristas que saem da sua região agora mesmo.
          </p>

          <form onSubmit={handleSearch} className="bg-card rounded-2xl p-2 flex items-center gap-2 shadow-soft">
            <Search size={20} className="text-muted-foreground ml-2 shrink-0" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Para onde você vai?"
              className="flex-1 bg-transparent outline-none text-foreground placeholder:text-muted-foreground py-2 text-base min-w-0"
            />
            <button
              type="submit"
              aria-label="Buscar"
              className="h-11 w-11 grid place-items-center bg-primary text-primary-foreground rounded-xl hover:bg-primary-glow transition-smooth shrink-0"
            >
              <ArrowRight size={20} />
            </button>
          </form>
        </div>
      </section>

      {/* Stats */}
      <section className="grid grid-cols-2 gap-3">
        <div className="bg-gradient-card rounded-2xl p-4 border border-border shadow-soft">
          <p className="text-3xl font-display font-extrabold text-primary">{viagensHoje}</p>
          <p className="text-sm text-muted-foreground font-semibold">viagens hoje</p>
        </div>
        <div className="bg-gradient-card rounded-2xl p-4 border border-border shadow-soft">
          <p className="text-3xl font-display font-extrabold text-success">{saindoAgora}</p>
          <p className="text-sm text-muted-foreground font-semibold">saindo agora</p>
        </div>
      </section>

      {/* Destinos rápidos */}
      <section>
        <h2 className="font-display font-bold text-lg mb-3 px-1">Destinos rápidos</h2>
        <div className="grid grid-cols-2 gap-3">
          {DESTINOS_RAPIDOS.map((destino, i) => (
            <button
              key={destino}
              onClick={() => navigate(`/viagens?destino=${encodeURIComponent(destino)}`)}
              className="group relative overflow-hidden bg-card rounded-2xl p-4 text-left border border-border shadow-soft hover:shadow-card transition-smooth hover:-translate-y-0.5"
            >
              <div
                className={`absolute -right-4 -bottom-4 w-20 h-20 rounded-full opacity-15 group-hover:opacity-25 transition-smooth ${
                  i % 2 === 0 ? "bg-gradient-hero" : "bg-gradient-earth"
                }`}
              />
              <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wide">Ir para</p>
              <p className="font-display font-bold text-foreground text-base mt-1 leading-tight">{destino}</p>
              <ArrowRight size={18} className="text-primary mt-3 group-hover:translate-x-1 transition-smooth" />
            </button>
          ))}
        </div>
      </section>

      {/* CTAs principais */}
      <section className="space-y-3 pt-2">
        <button
          onClick={() => navigate("/viagens")}
          className="w-full bg-gradient-hero text-primary-foreground font-display font-bold text-lg py-4 rounded-2xl shadow-card hover:shadow-glow transition-smooth flex items-center justify-center gap-2"
        >
          Ver viagens de hoje
          <ArrowRight size={20} />
        </button>
        <button
          onClick={() => navigate("/oferecer")}
          className="w-full bg-card border-2 border-primary text-primary font-display font-bold text-lg py-4 rounded-2xl hover:bg-primary hover:text-primary-foreground transition-smooth flex items-center justify-center gap-2"
        >
          <PlusCircle size={20} />
          Oferecer viagem
        </button>
      </section>

      <p className="text-center text-xs text-muted-foreground pt-4">
        Feito com 💚 pela comunidade de Ibicoara
      </p>
    </div>
  );
};

export default Home;
