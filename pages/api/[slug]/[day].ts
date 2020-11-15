import Cors from "cors";
import Joi from "joi";
import { NextApiRequest, NextApiResponse } from "next";
import {
  deleteCityDayTemperatures,
  getCityDay,
  updateDayTemperatures,
} from "../../../firebase/firestore";
import { initAPIMiddleware, isValidDay } from "../../../utils";

const cors = initAPIMiddleware(Cors());

async function get(res: NextApiResponse, city: string, day: string) {
  try {
    const data = await getCityDay(city, day);

    if (data) {
      res.json(data);
    } else {
      res.status(404).json({ error: "This city/day can't be found" });
    }
  } catch {
    res.status(500).json({ error: "Internal error" });
  }
}

async function post(
  req: NextApiRequest,
  res: NextApiResponse,
  city: string,
  day: string
) {
  // Check if its a valid day
  if (!isValidDay(day)) {
    return res.status(400).json({ error: `${day} is not a valid day` });
  }

  // Check if the payload is correct
  const schema = Joi.array().min(1).items({
    forecast: Joi.string().required(),
    temperature: Joi.number().required(),
  });

  const { error } = schema.validate(req.body);

  if (error) {
    return res.status(400).json({ error: "Invalid payload" });
  }

  try {
    const result = await updateDayTemperatures(city, day, req.body);

    if (result) {
      res.json(req.body);
    } else {
      res.status(404).json({ error: `${city} is not a valid city` });
    }
  } catch {
    res.status(500).json({ error: "Internal error" });
  }
}

async function remove(res: NextApiResponse, city: string, day: string) {
  // Check if its a valid day
  if (!isValidDay(day)) {
    return res.status(400).json({ error: `${day} is not a valid day` });
  }

  try {
    await deleteCityDayTemperatures(city, day);
    res.json({ deleted: true });
  } catch {
    res.status(500).json({ error: "Internal error" });
  }
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  await cors(req, res);

  const {
    query: { slug, day },
    method,
  } = req;

  const citySlug = <string>slug;
  const daySlug = <string>day;

  switch (method) {
    case "GET":
      get(res, citySlug, daySlug);
      break;

    case "POST":
      post(req, res, citySlug, daySlug);
      break;

    case "DELETE":
      remove(res, citySlug, daySlug);
      break;

    default:
      res.setHeader("Allow", ["GET", "POST", "DELETE"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};
