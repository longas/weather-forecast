import Cors from "cors";
import { NextApiRequest, NextApiResponse } from "next";
import { deleteCityTemperatures, getCity } from "../../../firebase/firestore";
import { initAPIMiddleware } from "../../../utils";

const cors = initAPIMiddleware(Cors());

export default async (req: NextApiRequest, res: NextApiResponse) => {
  await cors(req, res);

  const {
    query: { slug },
    method,
  } = req;

  const citySlug = <string>slug;

  switch (method) {
    case "GET":
      try {
        const data = await getCity(citySlug);

        if (data) {
          res.json(data);
        } else {
          res.status(404).json({ error: "This city can't be found" });
        }
      } catch {
        res.status(500).json({ error: "Internal error" });
      }
      break;

    case "DELETE":
      try {
        await deleteCityTemperatures(citySlug);
        res.json({ deleted: true });
      } catch {
        res.status(500).json({ error: "Internal error" });
      }
      break;

    default:
      res.setHeader("Allow", ["GET", "DELETE"]);
      res.status(405).json({ error: `Method ${method} not allowed` });
  }
};
