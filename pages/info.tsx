import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Link from "next/link";
import Footer from "../components/Footer";
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
    <div className="p-4">
      <main className="md:w-forecast mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-center">
          Cities information
        </h1>

        <ul className="mt-6 flex flex-col space-y-8">
          {cities.map((c) => (
            <li key={c.id} className="p-4 bg-white rounded shadow">
              <div className="flex justify-between items-center">
                <h2 className="text-3xl font-bold">{c.name}</h2>

                <Link href={`/city/${c.id}`}>
                  <a className="text-sm text-blue-500 hover:text-blue-700">
                    Weather forecast
                  </a>
                </Link>
              </div>

              <h3 className="text-sm uppercase font-mono">{c.country}</h3>

              <p className="mt-4">{c.info}</p>
            </li>
          ))}
        </ul>
      </main>

      <div className="mt-12">
        <Footer />
      </div>
    </div>
  );
}
