import { TRIPS, Trip, VehicleType } from "@/data/trips";

const STORAGE_KEY = "circula_chapada_local_trips_v1";

export type LocalTripRecord = {
  id: string;
  driver: string;
  vehicle: VehicleType;
  vehicleModel: string;
  origin: string;
  destination: string;
  departureDate: string;
  departureTime: string;
  totalSeats: number;
  seatsAvailable: number;
  price: number;
  whatsapp: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
};

export type CreateTripInput = {
  driver: string;
  vehicle: VehicleType;
  vehicleModel?: string;
  origin: string;
  destination: string;
  departureDate?: string;
  departureTime: string;
  totalSeats: number;
  price: number;
  whatsapp: string;
  notes?: string;
};

type UpdateTripInput = Partial<Omit<LocalTripRecord, "id" | "createdAt">>;

type LegacyOfferInput = {
  name: string;
  phone: string;
  vehicle: VehicleType;
  origin: string;
  destination: string;
  time: string;
  price: number;
  seats: number;
  notes?: string;
};

function getTodayISODate() {
  return new Date().toISOString().slice(0, 10);
}

function normalizePhone(phone: string) {
  const digits = phone.replace(/\D/g, "");
  return digits.startsWith("55") ? digits : `55${digits}`;
}

function toRecord(trip: Trip): LocalTripRecord {
  const now = new Date().toISOString();
  return {
    id: trip.id,
    driver: trip.driver,
    vehicle: trip.vehicle,
    vehicleModel: trip.vehicleModel,
    origin: trip.origin,
    destination: trip.destination,
    departureDate: trip.date || getTodayISODate(),
    departureTime: trip.departureTime,
    totalSeats: trip.totalSeats,
    seatsAvailable: trip.seatsAvailable,
    price: trip.price,
    whatsapp: normalizePhone(trip.whatsapp),
    notes: trip.notes,
    createdAt: now,
    updatedAt: now,
  };
}

function toViewTrip(record: LocalTripRecord): Trip {
  return {
    id: record.id,
    driver: record.driver,
    vehicle: record.vehicle,
    vehicleModel: record.vehicleModel,
    origin: record.origin,
    destination: record.destination,
    date: record.departureDate,
    departureTime: record.departureTime,
    totalSeats: record.totalSeats,
    seatsAvailable: record.seatsAvailable,
    price: record.price,
    whatsapp: normalizePhone(record.whatsapp),
    meetingPoint: "A combinar no WhatsApp",
    rules: ["Confirmar detalhes da viagem no WhatsApp"],
    notes: record.notes,
  };
}

function seedTrips(): LocalTripRecord[] {
  return TRIPS.map(toRecord);
}

function readRecords(): LocalTripRecord[] {
  if (typeof window === "undefined") return [];
  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    const seeded = seedTrips();
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(seeded));
    return seeded;
  }
  try {
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) {
      const seeded = seedTrips();
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(seeded));
      return seeded;
    }
    return parsed as LocalTripRecord[];
  } catch {
    const seeded = seedTrips();
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(seeded));
    return seeded;
  }
}

function writeRecords(records: LocalTripRecord[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
}

export function listTrips(): Trip[] {
  return readRecords().map(toViewTrip);
}

export function getTripById(id: string): Trip | undefined {
  const record = readRecords().find((trip) => trip.id === id);
  return record ? toViewTrip(record) : undefined;
}

export function createTrip(input: CreateTripInput): Trip {
  const now = new Date().toISOString();
  const newRecord: LocalTripRecord = {
    id: `local-${Date.now()}`,
    driver: input.driver.trim(),
    vehicle: input.vehicle,
    vehicleModel: input.vehicleModel?.trim() || `${input.vehicle} cadastrado`,
    origin: input.origin,
    destination: input.destination,
    departureDate: input.departureDate || getTodayISODate(),
    departureTime: input.departureTime,
    totalSeats: input.totalSeats,
    seatsAvailable: input.totalSeats,
    price: input.price,
    whatsapp: normalizePhone(input.whatsapp),
    notes: input.notes?.trim() || undefined,
    createdAt: now,
    updatedAt: now,
  };
  const records = readRecords();
  writeRecords([newRecord, ...records]);
  return toViewTrip(newRecord);
}

export function updateTrip(id: string, input: UpdateTripInput): Trip | undefined {
  const records = readRecords();
  const idx = records.findIndex((r) => r.id === id);
  if (idx === -1) return undefined;
  const updated: LocalTripRecord = {
    ...records[idx],
    ...input,
    updatedAt: new Date().toISOString(),
  };
  records[idx] = updated;
  writeRecords(records);
  return toViewTrip(updated);
}

// Compatibilidade temporaria com a tela atual de oferta.
export function createTripFromOffer(input: LegacyOfferInput) {
  if (typeof window === "undefined") return;
  createTrip({
    driver: input.name,
    vehicle: input.vehicle,
    origin: input.origin,
    destination: input.destination,
    departureTime: input.time,
    totalSeats: input.seats,
    price: input.price,
    whatsapp: input.phone,
    notes: input.notes,
  });
}
