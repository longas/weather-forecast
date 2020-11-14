export type City = {
  id: string;
  data: {
    name: string;
    country: string;
    info: string;
  };
};

export type Day = {
  average_temperature: number;
  forecast: string;
  hourly_temperatures: {
    forecast: string;
    temperature: number;
  }[];
};
