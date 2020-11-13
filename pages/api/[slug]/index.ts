import { NextApiRequest, NextApiResponse } from "next";
import { getCityWeather } from "../../../firebase/firestore";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    query: { slug },
  } = req;

  try {
    const data = await getCityWeather(slug as string);

    if (data) {
      res.json(data);
    } else {
      res.status(404).json({ error: "This city can't be found" });
    }
  } catch {
    res.status(500).json({ error: "Internal error" });
  }
};
