import Cors from "cors";
import { NextApiRequest, NextApiResponse } from "next";
import { getCities } from "../../firebase/firestore";
import { initAPIMiddleware } from "../../utils";

const cors = initAPIMiddleware(Cors());

export default async (req: NextApiRequest, res: NextApiResponse) => {
  await cors(req, res);

  const { method } = req;

  switch (method) {
    case "GET":
      try {
        const data = await getCities();
        res.json(data);
      } catch {
        res.status(500).json({ error: "Internal error" });
      }
      break;
    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};
