import { NextApiRequest, NextApiResponse } from "next";
import {
  deleteDayTemperatures,
  getDay,
  updateDayTemperatures,
} from "../../../firebase/firestore";

import Joi from "joi";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    query: { slug: citySlug, day },
    method,
  } = req;

  switch (method) {
    case "GET":
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
      break;

    case "POST":
      const schema = Joi.array().items({
        forecast: Joi.string().required(),
        temperature: Joi.number().required(),
      });

      const { error } = schema.validate(req.body);

      if (error) {
        return res.status(427).json({ error: "Invalid payload" });
      }

      try {
        await updateDayTemperatures(
          day as string,
          citySlug as string,
          req.body
        );
        const data = await getDay(day as string, citySlug as string);
        res.json(data);
      } catch {
        res.status(500).json({ error: "Internal error" });
      }
      break;

    case "DELETE":
      try {
        await deleteDayTemperatures(day as string, citySlug as string);
        const data = await getDay(day as string, citySlug as string);
        res.json(data);
      } catch {
        res.status(500).json({ error: "Internal error" });
      }
      break;

    default:
      res.setHeader("Allow", ["GET", "PUT"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};
