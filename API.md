# API endpoints

**Base URL**: https://weather-forecast-navy.vercel.app/api

## Cities

**GET** `/`

Returns a list of all cities.

```json
Response:

[
  {
    "id": "zaragoza",
    "name": "Zaragoza",
    "country": "Spain",
    "info": "Zaragoza is the capital city o"
  },
  { },
  { }
]
```

**GET** `/:id`

Retrieves the details of a city.

- id:
  - zaragoza
  - berlin
  - new-york

```json
Response:

{
  "id": "zaragoza",
  "name": "Zaragoza",
  "country": "Spain",
  "info": "Zaragoza is the capital city o",
  "days": [
    {
      "id": "monday",
      "min_temperature": 3,
      "max_temperature": 30,
      "average_temperature": 18,
      "forecast": "rain"
    },
    { },
    { }
  ]
}
```

---

## Days

**GET** `/:id/:day`

Retrieves the weather data of that day in the city.

- id:

  - zaragoza
  - berlin
  - new-york

- day:
  - monday
  - tuesday
  - wednesday
  - thursday
  - friday
  - saturday
  - sunday

```json
Response:

[
  {
    "temperature": 9,
    "forecast": "clear"
  },
  {
    "temperature": 10,
    "forecast": "partly-cloudy"
  },
  {
    "temperature": 10,
    "forecast": "rain"
  },
  { },
  { }
]
```

**POST** `/:id/:day`

Updates the hourly temperatures for that day and city.

- id:

  - zaragoza
  - berlin
  - new-york

- day:
  - monday
  - tuesday
  - wednesday
  - thursday
  - friday
  - saturday
  - sunday

```json
Payload example:

[
  {
    "forecast": "clear",
    "temperature": 9
  },
  {
    "forecast": "partly-cloudy",
    "temperature": 10
  },
  {
    "forecast": "partly-cloudy",
    "temperature": 10
  },
  { },
  { }
]

* Allowed forecasts: "clear", "cloudy", "partly-cloudy", "rain", "wind".
```

```json
Response:

[
  {
    "forecast": "clear",
    "temperature": 9
  },
  {
    "forecast": "partly-cloudy",
    "temperature": 10
  },
  {
    "forecast": "partly-cloudy",
    "temperature": 10
  },
  { },
  { }
]
```

**DELETE** `/:id`

Deletes all weather data of a city.

- id:
  - zaragoza
  - berlin
  - new-york

```json
Response:

{
  "deleted": true
}
```

**DELETE** `/:id/:day`

Deletes all weather data for a day and city.

- id:

  - zaragoza
  - berlin
  - new-york

- day:

  - monday
  - tuesday
  - wednesday
  - thursday
  - friday
  - saturday
  - sunday

```json
Response:

{
  "deleted": true
}
```
