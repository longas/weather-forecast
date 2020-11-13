import { NextApiRequest, NextApiResponse } from "next";
import { getDay } from "../../../firebase/firestore";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    query: { slug: citySlug, day },
  } = req;

  try {
    const data = await getDay(day as string, citySlug as string);

    if (data) {
      res.json(data);
    } else {
      res.status(404).json({ error: "This city can't be found" });
    }
  } catch {
    res.status(500).json({ error: "Internal error" });
  }
};
