# API endpoints

Base URL: _[final vercel deployment URL]_/api

## Cities

**GET** `/`

Returns a list of all cities.

```json
Response:

[
  {
    "id": "zaragoza",
    "data": {
      "name": "Zaragoza",
      "country": "Spain"
    }
  },
  { ... },
  { ... }
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
  "name": "Zaragoza",
  "country": "Spain"
}
```

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

{
  "forecast": "clear",
  "average_temperature": 13,
  "hourly_temperatures": [
    {
      "temperature": 9,
      "forecast": "clear"
    },
    {
      "temperature": 10,
      "forecast": "partly-cloudy"
    },
    {
      "forecast": "partly-cloudy",
      "temperature": 10
    },
    { ... },
    { ... }
  ]
}
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
  { ... },
  { ... }
]
```

```json
Response:

{
  "forecast": "clear",
  "average_temperature": 13,
  "hourly_temperatures": [
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
    { ... },
    { ... }
  ]
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
  "forecast": "",
  "average_temperature": 0,
  "hourly_temperatures": []
}
```
