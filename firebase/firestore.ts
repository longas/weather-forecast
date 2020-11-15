import { City, CityBasic, Day, Hour } from "../types";
import { DAYS } from "../utils";
import { getFirestore } from "./utils";

const db = getFirestore();

// GET

export async function getCities() {
  const citiesRef = db.collection("cities");
  const snapshot = await citiesRef.get();
  const docs = <CityBasic[]>snapshot.docs.map((d) => ({
    id: d.id,
    ...d.data(),
  }));
  return docs;
}

export async function getCity(city: string) {
  const citySlug = city.toLowerCase();

  const cityRef = db.collection("cities").doc(citySlug);
  const cityDoc = await cityRef.get();

  if (!cityDoc.exists) return null;

  const daysRef = db.collection("cities").doc(citySlug).collection("days");
  const daysSnapshot = await daysRef.get();
  const daysDocs = <Day[]>daysSnapshot.docs.map((d) => ({
    id: d.id,
    ...d.data(),
  }));

  const cityData = <CityBasic>cityDoc.data();
  const mergedData: City = {
    id: cityDoc.id,
    ...cityData,
    days: daysDocs,
  };

  return mergedData;
}

export async function getCityDay(city: string, day: string) {
  const daySlug = day.toLowerCase();
  const citySlug = city.toLowerCase();
  const days = db.collection("hours").doc(`${citySlug}_${daySlug}`);
  const doc = await days.get();

  return doc.exists ? <Hour[]>doc.data().temperatures : null;
}

// POST

export async function updateDayTemperatures(
  city: string,
  day: string,
  data: any
) {
  const citySlug = city.toLowerCase();
  const daySlug = day.toLowerCase();
  const batch = db.batch();

  const cityRef = db.collection("cities").doc(citySlug);
  const cityDoc = await cityRef.get();

  if (!cityDoc.exists) return null;

  const hourRef = db.collection("hours").doc(`${citySlug}_${daySlug}`);
  batch.set(hourRef, { temperatures: data });

  const dayRef = cityRef.collection("days").doc(daySlug);
  const forecast = data[0].forecast;
  const averageTemp = Math.round(
    data.reduce((a: number, b: any) => a + b.temperature, 0) / data.length
  );
  const minTemp = Math.min(...data.map((d: any) => d.temperature));
  const maxTemp = Math.max(...data.map((d: any) => d.temperature));
  batch.set(dayRef, {
    forecast,
    average_temperature: averageTemp,
    min_temperature: minTemp,
    max_temperature: maxTemp,
  });

  return batch.commit();
}

// DELETE

export async function deleteCityTemperatures(city: string) {
  const citySlug = city.toLowerCase();
  const batch = db.batch();

  for (const day of DAYS) {
    const hoursRef = db.collection("hours").doc(`${citySlug}_${day}`);
    batch.delete(hoursRef);

    const daysRef = db
      .collection("cities")
      .doc(citySlug)
      .collection("days")
      .doc(day);
    batch.delete(daysRef);
  }

  return batch.commit();
}

export async function deleteCityDayTemperatures(city: string, day: string) {
  const citySlug = city.toLowerCase();
  const daySlug = day.toLowerCase();
  const batch = db.batch();

  const hourRef = db.collection("hours").doc(`${citySlug}_${daySlug}`);
  batch.delete(hourRef);

  const dayRef = db
    .collection("cities")
    .doc(citySlug)
    .collection("days")
    .doc(daySlug);
  batch.delete(dayRef);

  return batch.commit();
}
