import { GetStaticProps, InferGetStaticPropsType } from "next";
import Link from "next/link";
import Footer from "../components/Footer";
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
    <div className="h-screen flex flex-col justify-center items-center">
      <main>
        <h1 className="text-4xl md:text-5xl font-bold text-center">
          Weather Forecast
        </h1>

        <ul className="mt-8 flex flex-col justify-items-center items-center md:flex-row space-y-8 md:space-y-0 md:space-x-8">
          {cities.map((c) => (
            <li key={c.id}>
              <Link href={`/city/${c.id}`}>
                <a
                  data-cy="city"
                  className="px-4 py-2 font-mono md:text-xl uppercase font-bold bg-white rounded shadow hover:shadow-md transition-all duration-200"
                >
                  {c.name}
                </a>
              </Link>
            </li>
          ))}
        </ul>
      </main>

      <div className="mt-20">
        <Footer />
      </div>
    </div>
  );
}
