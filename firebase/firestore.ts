import { initFirestore } from "./utils";

const db = initFirestore();

export async function getCities() {
  try {
    const citiesRef = db.collection("cities");
    const snapshot = await citiesRef.get();
    const data = snapshot.docs.map((d) => ({ id: d.id, data: d.data() }));
    return data;
  } catch {
    throw new Error();
  }
}

export async function getCityWeather(city: string) {
  try {
    const citySlug = city.toLowerCase();
    const cityRef = db.collection("cities").doc(citySlug);
    const doc = await cityRef.get();
    return doc.exists ? doc.data() : null;
  } catch {
    throw new Error();
  }
}

export async function getDay(day: string, city: string) {
  try {
    const citySlug = city.toLowerCase();
    const daySlug = day.toLowerCase();
    const days = db.collection("days").doc(`${daySlug}_${citySlug}`);
    const doc = await days.get();
    return doc.exists ? doc.data() : null;
  } catch {
    throw new Error();
  }
}
