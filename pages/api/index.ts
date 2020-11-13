import { NextApiRequest, NextApiResponse } from "next";
import { getCities } from "../../firebase/firestore";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const data = await getCities();
    res.json(data);
  } catch {
    res.status(500).json({ error: "Internal error" });
  }
};
