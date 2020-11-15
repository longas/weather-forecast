import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Head from "next/head";
import { getCities } from "../firebase/firestore";
import { CityBasic } from "../types";

export const getServerSideProps: GetServerSideProps<{
  cities: CityBasic[];
}> = async () => {
  const cities = await getCities();

  return {
    props: { cities },
  };
};

export default function Home({
  cities,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="w-screen h-screen flex justify-center items-center">
        <ul className="flex space-x-8">
          {cities.map((c) => (
            <div key={c.id}>
              <h2>{c.name}</h2>
              <h3>{c.country}</h3>
              <p>{c.info}</p>
            </div>
          ))}
        </ul>
      </main>
    </div>
  );
}
