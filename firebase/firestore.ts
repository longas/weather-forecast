import { City, Day } from "../types";
import { DAYS, getFirestore } from "./utils";

const db = getFirestore();

// GET

export async function getCities() {
  try {
    const citiesRef = db.collection("cities");
    const snapshot = await citiesRef.get();
    const data = <City[]>snapshot.docs.map((d) => ({
      id: d.id,
      data: d.data(),
    }));
    return data;
  } catch {
    throw new Error();
  }
}

export async function getCity(city: string) {
  try {
    const citySlug = city.toLowerCase();
    const cityRef = db.collection("cities").doc(citySlug);
    const doc = await cityRef.get();
    return doc.exists ? <City>doc.data() : null;
  } catch {
    throw new Error();
  }
}

export async function getDay(day: string, city: string) {
  try {
    const daySlug = day.toLowerCase();
    const citySlug = city.toLowerCase();
    const days = db.collection("days").doc(`${daySlug}_${citySlug}`);
    const doc = await days.get();
    return doc.exists ? <Day>doc.data() : null;
  } catch {
    throw new Error();
  }
}

// POST

export async function updateDayTemperatures(
  day: string,
  city: string,
  data: any
) {
  const daySlug = day.toLowerCase();
  const citySlug = city.toLowerCase();
  const ref = db.collection("days").doc(`${daySlug}_${citySlug}`);
  const forecast = data[0].forecast;
  const averageTemp = Math.round(
    data.reduce((a: number, b: any) => a + b.temperature, 0) / data.length
  );

  return ref.update({
    forecast,
    average_temperature: averageTemp,
    hourly_temperatures: data,
  });
}

// DELETE

export async function deleteCityTemperatures(city: string) {
  const citySlug = city.toLowerCase();
  const batch = db.batch();

  for (const day of DAYS) {
    const ref = db.collection("days").doc(`${day}_${citySlug}`);
    batch.update(ref, { hourly_temperatures: [] });
  }

  return batch.commit();
}

export async function deleteDayTemperatures(day: string, city: string) {
  const daySlug = day.toLowerCase();
  const citySlug = city.toLowerCase();
  const ref = db.collection("days").doc(`${daySlug}_${citySlug}`);

  return ref.update({
    hourly_temperatures: [],
  });
}
