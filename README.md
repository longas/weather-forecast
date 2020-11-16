# How to use

## Run locally

### Web app

- Clone this repository
- `npm install`
- Place `.env.local` in the root folder (_file sent in the email_)
- `npm run build`
- `npm start`
- Go to [localhost:3000](http://localhost:3000)

### Tests

- Clone this repository
- `npm install`
- `npm run cy:open`

## Live version

Visit the [deployed website](https://weather-forecast-navy.vercel.app/).

### API

See the [API documentation](API.md) for more information.

# Tech documentation

This web application was developed with **TypeScript**, **React** and **Next.js**. It has been deployed to **Vercel** while Cloud Firestore (Firebase) is used as database.

After reading the requeriments document, Next.js was chosen for the following reasons:

- It gives you a complete solution to **build sites with React**.
- It has many features production ready such as static & server rendering, TypeScript support, smart bundling and route pre-fetching.
- It provides a [straightforward solution](https://nextjs.org/docs/api-routes/introduction) to **build APIs**.
- It can be easily deployed to platforms such as **Netlify or Vercel**.
- Zero-config client-server **code and typings sharing**.

## Frontend

**Responsive web application** built with React, React Router, Redux and TailwindCSS among other libraries.

### Home page

**Static page** that shows a list of links that take you to the cities' weather forecast page, links are **prefetched** in the background client-side to speed up future navigation. Data shown here is **fetched at build time** so it can be cached in Vercel's CDN ensuring fast loading times.

### City page

When users visit this page they are presented with the city's daily weather forecast for the current week. They can select a day and the page will display the hourly forecast for that day. This page is a **SPA**, meaning all data fetching, rendering and routing is handled by the client.

A naive solution was implemented to have **data polling**, every 10 seconds the client fetches the API to get updated data.

### Info page

Basic page where you can find additional information about the cities. This is used as an example of **server-side rendering** and how it could be used to make some pages less JavaScript-heavy for the client, improving SEO and perfomance on low-end devices.

## Backend / API

The API has been developed with [**API routes**](https://nextjs.org/docs/api-routes/introduction), a solution provided by Next.js and based in Node.js. It has express-like syntax and lets you use express middleware in a similar manner. This can be seen [when **CORS** is enabled](https://github.com/longas/weather-forecast/blob/6df6898dd22886136f050d9437a3e6bd725b4d8e/pages/api/index.ts#L9) at the API route level. Endpoints have been deployed as Serverless Functions to Vercel's network.

Firestore is used as database, some of the techniques used to model the data are:

- Data duplication to eliminate unnecessary document reads.
- Composite keys to get related data.
- Batch writes to improve perfomance and ensure atomic operations.
- Aggregation to store computed values.

## Quality assurance

These tools have been used to ensure QA while coding the solution:

- TypeScript: Static type checker, it can be seen as to be a form of inline automated testing.
- ESLint: Tool to analyze code for potential errors without actually running the code.
- Prettier: To format the code in a way that's consistent and legible every time.

Also [a few tests](/cypress/integration) have been written, these tests run under **Cypress** and check the navigation of the site.
