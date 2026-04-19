import { prisma } from "../../lib/prisma.js";
import {
  findAllVehiclesWithPricing,
  upsertVehiclePricing,
} from "./pricing.repository.js";

const DEFAULT_PER_HOUR = "120.00";
const DEFAULT_PER_KM = "2.50";

export type PublicTripType = "one-way" | "one_way" | "hourly";

export type VehiclePricingRow = {
  vehicle: {
    id: string;
    vehicleName: string;
    licensePlate: string;
    class: "Comfort" | "Business" | "Van";
  };
  perHour: string;
  perKm: string;
};

function toPublicClass(value: "COMFORT" | "BUSINESS" | "VAN") {
  if (value === "COMFORT") return "Comfort" as const;
  if (value === "BUSINESS") return "Business" as const;
  return "Van" as const;
}

export async function listVehiclePricing() {
  const rows = await findAllVehiclesWithPricing();
  return rows.map((row) => ({
    vehicle: {
      id: row.id,
      vehicleName: row.vehicleName,
      licensePlate: row.licensePlate,
      class: toPublicClass(row.class),
    },
    perHour: row.pricing?.perHour.toString() ?? DEFAULT_PER_HOUR,
    perKm: row.pricing?.perKm.toString() ?? DEFAULT_PER_KM,
  }));
}

export async function saveVehiclePricing(
  vehicleId: string,
  perHour: number,
  perKm: number,
) {
  const vehicle = await prisma.vehicles.findUnique({ where: { id: vehicleId } });
  if (!vehicle) return null;

  await upsertVehiclePricing(vehicleId, perHour, perKm);
  return true;
}

function roundMoney(v: number) {
  return Math.round(v * 100) / 100;
}

type LatLng = { lat: number; lng: number };
type MapboxDirectionsResponse = {
  routes?: Array<{ distance: number; duration: number }>;
};

async function getRoute(from: LatLng, to: LatLng) {
  const token = process.env.MAPBOX_TOKEN;
  if (!token) throw new Error("MAPBOX_TOKEN is missing");

  const url = `https://api.mapbox.com/directions/v5/mapbox/driving/${from.lng},${from.lat};${to.lng},${to.lat}?access_token=${token}&overview=false`;

  const res = await fetch(url);
  if (!res.ok) throw new Error("Route lookup failed");
  const data = (await res.json()) as MapboxDirectionsResponse;

  const route = data.routes?.[0];

  if (!route) throw new Error("Route not found");

  return {
    distanceKm: route.distance / 1000,
    durationMin: route.duration / 60,
  };
}

export type PublicPriceQuote = {
  price: number;
  totalPrice: number;
  distanceKm: number | null;
  durationMin: number | null;
};

export async function getPublicVehiclePriceQuote(input: {
  vehicleId: string;
  tripType: PublicTripType;
  distanceKm?: number;
  durationMin?: number;
  fromLat?: number;
  fromLon?: number;
  toLat?: number;
  toLon?: number;
}): Promise<PublicPriceQuote | null> {
  const vehicle = await prisma.vehicles.findUnique({
    where: { id: input.vehicleId },
    select: { id: true, pricing: { select: { perHour: true, perKm: true } } },
  });
  if (!vehicle) return null;

  const perHour = Number(vehicle.pricing?.perHour ?? DEFAULT_PER_HOUR);
  const perKm = Number(vehicle.pricing?.perKm ?? DEFAULT_PER_KM);

  let raw: number;
  let distanceKm: number | null = null;
  let durationMin: number | null = null;
  if (input.tripType === "hourly") {
    durationMin = input.durationMin ?? null;
    raw = (Number(durationMin ?? 0) / 60) * perHour;
  } else {
    const hasAllCoords =
      input.fromLat != null &&
      input.fromLon != null &&
      input.toLat != null &&
      input.toLon != null;

    if (hasAllCoords) {
      const route = await getRoute(
        { lat: input.fromLat!, lng: input.fromLon! },
        { lat: input.toLat!, lng: input.toLon! },
      );
      distanceKm = route.distanceKm;
      durationMin = route.durationMin;
    } else {
      distanceKm = input.distanceKm ?? null;
    }
    if (distanceKm == null) {
      throw new Error("distanceKm or coordinates are required for one-way trip");
    }

    raw = Number(distanceKm) * perKm;
  }

  const price = roundMoney(raw);
  return { price, totalPrice: price, distanceKm, durationMin };
}
