import { GetStaticProps, InferGetStaticPropsType } from "next";
import Head from "next/head";
import Link from "next/link";
import { getCities } from "../firebase/firestore";
import { CityBasic } from "../types";

export const getStaticProps: GetStaticProps<{
  cities: CityBasic[];
}> = async () => {
  const cities = await getCities();

  return {
    props: { cities },
  };
};

export default function Home({
  cities,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="w-screen h-screen flex justify-center items-center">
        <ul className="flex space-x-8">
          {cities.map((c) => (
            <li key={c.id}>
              <Link href={`/city/${c.id}`}>
                <a className="px-4 py-2 uppercase font-bold bg-white rounded shadow hover:shadow-md transition-all duration-200">
                  {c.name}
                </a>
              </Link>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
