import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { CIDADES } from "@/data/trips";
import { CheckCircle2, ArrowLeft } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { createTripFromOffer } from "@/lib/local-trip-store";

const schema = z.object({
  name: z.string().trim().min(2, "Informe seu nome").max(60),
  phone: z.string().trim().min(10, "Telefone inválido").max(15),
  vehicle: z.enum(["Carro", "Van", "Hilux", "Topic"]),
  origin: z.string().min(1, "Escolha a origem"),
  destination: z.string().min(1, "Escolha o destino"),
  time: z.string().min(1, "Informe o horário"),
  price: z.coerce.number().min(0, "Valor inválido").max(1000),
  seats: z.coerce.number().int().min(1, "Mínimo 1 vaga").max(50),
  notes: z.string().max(300).optional(),
});

const Offer = () => {
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (!submitted) return;
    const timer = window.setTimeout(() => navigate("/viagens"), 1200);
    return () => window.clearTimeout(timer);
  }, [submitted, navigate]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    const result = schema.safeParse(data);
    if (!result.success) {
      const errs: Record<string, string> = {};
      result.error.issues.forEach((i) => (errs[String(i.path[0])] = i.message));
      setErrors(errs);
      toast({ title: "Verifique os campos", description: "Alguns dados precisam de atenção." });
      return;
    }
    setErrors({});
    createTripFromOffer(result.data);
    setSubmitted(true);
    toast({ title: "Viagem publicada!", description: "Sua viagem aparece no painel da comunidade." });
  };

  if (submitted) {
    return (
      <div className="pt-10 text-center animate-fade-up">
        <div className="w-20 h-20 bg-success/15 rounded-full grid place-items-center mx-auto mb-5">
          <CheckCircle2 size={44} className="text-success" />
        </div>
        <h1 className="font-display text-2xl font-extrabold mb-2">Viagem publicada!</h1>
        <p className="text-muted-foreground mb-6 max-w-sm mx-auto">
          Os passageiros já podem ver sua viagem e falar com você pelo WhatsApp.
        </p>
        <div className="flex flex-col gap-3 max-w-xs mx-auto">
          <button
            onClick={() => navigate("/viagens")}
            className="bg-primary text-primary-foreground font-bold py-3 rounded-2xl shadow-soft"
          >
            Ver painel de viagens
          </button>
          <button onClick={() => setSubmitted(false)} className="text-primary font-bold py-2">
            Publicar outra viagem
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-5 animate-fade-up">
      <button onClick={() => navigate(-1)} className="flex items-center gap-1 text-muted-foreground hover:text-foreground font-semibold pt-2">
        <ArrowLeft size={18} /> Voltar
      </button>

      <div>
        <h1 className="font-display text-3xl font-extrabold">Oferecer viagem</h1>
        <p className="text-muted-foreground font-medium">Preencha os dados — leva menos de 1 minuto.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 bg-card rounded-3xl p-5 border border-border shadow-soft" noValidate>
        <Field label="Seu nome" name="name" placeholder="Ex: João da Van" error={errors.name} required />
        <Field label="Telefone (WhatsApp)" name="phone" type="tel" placeholder="77 99999-0000" error={errors.phone} required />

        <div>
          <Label>Tipo de veículo</Label>
          <div className="grid grid-cols-4 gap-2">
            {(["Carro", "Van", "Hilux", "Topic"] as const).map((v, i) => (
              <label key={v} className="cursor-pointer">
                <input type="radio" name="vehicle" value={v} defaultChecked={i === 0} className="peer sr-only" />
                <div className="text-center py-3 rounded-xl border-2 border-border peer-checked:border-primary peer-checked:bg-primary/10 peer-checked:text-primary font-semibold text-sm transition-smooth">
                  {v}
                </div>
              </label>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <SelectField label="Origem" name="origin" options={CIDADES} error={errors.origin} />
          <SelectField label="Destino" name="destination" options={CIDADES} error={errors.destination} />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Field label="Horário de saída" name="time" type="time" error={errors.time} required />
          <Field label="Valor por pessoa (R$)" name="price" type="number" placeholder="20" error={errors.price} required />
        </div>

        <Field label="Número de vagas" name="seats" type="number" placeholder="4" error={errors.seats} required />

        <div>
          <Label>Observações (opcional)</Label>
          <textarea
            name="notes"
            rows={3}
            placeholder="Local de encontro, regras, parada, etc."
            className="w-full px-4 py-3 rounded-xl border-2 border-input bg-background focus:border-primary outline-none transition-smooth resize-none"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-hero text-primary-foreground font-display font-bold text-lg py-4 rounded-2xl shadow-card hover:shadow-glow transition-smooth"
        >
          Publicar viagem
        </button>
      </form>
    </div>
  );
};

function Label({ children }: { children: React.ReactNode }) {
  return <label className="text-sm font-bold mb-1.5 block text-foreground">{children}</label>;
}

function Field({
  label, name, type = "text", placeholder, error, required,
}: {
  label: string; name: string; type?: string; placeholder?: string; error?: string; required?: boolean;
}) {
  return (
    <div>
      <Label>{label}</Label>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        required={required}
        className={`w-full px-4 py-3 rounded-xl border-2 bg-background outline-none transition-smooth ${
          error ? "border-destructive" : "border-input focus:border-primary"
        }`}
      />
      {error && <p className="text-destructive text-xs mt-1 font-semibold">{error}</p>}
    </div>
  );
}

function SelectField({
  label, name, options, error,
}: { label: string; name: string; options: readonly string[]; error?: string }) {
  return (
    <div>
      <Label>{label}</Label>
      <select
        name={name}
        defaultValue=""
        className={`w-full px-3 py-3 rounded-xl border-2 bg-background outline-none transition-smooth ${
          error ? "border-destructive" : "border-input focus:border-primary"
        }`}
      >
        <option value="" disabled>Escolher…</option>
        {options.map((o) => (
          <option key={o} value={o}>{o}</option>
        ))}
      </select>
      {error && <p className="text-destructive text-xs mt-1 font-semibold">{error}</p>}
    </div>
  );
}

export default Offer;
