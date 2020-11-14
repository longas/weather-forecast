import { NextApiRequest, NextApiResponse } from "next";
import { deleteCityTemperatures, getCity } from "../../../firebase/firestore";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    query: { slug },
    method,
  } = req;

  switch (method) {
    case "GET":
      try {
        const data = await getCity(slug as string);

        if (data) {
          res.json(data);
        } else {
          res.status(404).json({ error: "This city can't be found" });
        }
      } catch {
        res.status(500).json({ error: "Internal error" });
      }
      break;

    // case "DELETE":
    //   try {
    //     await deleteCityTemperatures(slug as string);
    //     res.json({ message: "Data removed" });
    //   } catch {
    //     res.status(500).json({ error: "Internal error" });
    //   }
    //   break;

    default:
      res.setHeader("Allow", ["GET", "PUT"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};
