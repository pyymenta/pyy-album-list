"use client";

import { getContract } from "thirdweb";
import { polygonAmoy } from "thirdweb/chains";
import { client } from "./client";
import { useReadContract } from "thirdweb/react";
import Link from "next/link";

const ALBUNS_LIST_FACTORY_ADDRESS = "0x009986155E8b9b0e78120C426Eb7B8f87E0EE3D5";

export default function Home() {
  const contract = getContract({
    client,
    chain: polygonAmoy,
    address: ALBUNS_LIST_FACTORY_ADDRESS,
  });

  const { data: albunsLists, isLoading } = useReadContract({
    contract,
    method: "function getAllAlbumLists() view returns ((address albumListAddress, address owner, string name, string description, uint256 createAt)[])",
    params: []
  });

  return (
    <main className="mx-auto max-w-7xl px-4 mt-4 sm:px-6 lg:px-8">
      <div className="py-10">
        <h1 className="text-4xl font-bold mb-4">Album Lists</h1>
        {isLoading && (<p>Loading Albuns Lists..</p>)}
          <div className="grid grid-cols-3 gap-4">
            {!isLoading && albunsLists && (albunsLists.length > 0 ? albunsLists.map((albumList, index) => (
              <div
                key={index}
                className="flex flex-col justify-between max-w-sm p-6 bg-white border border-slate-200 rounded-lg shadow"
              >
                <div>
                  <h5 className="mb-2 text-2xl font-bold tracking-tight">{albumList.name}</h5>

                  <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{albumList.description}</p>

                  <Link
                    href={`/album-list/${albumList.albumListAddress}`}
                    passHref={true}
                  >
                    <p className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-green-700 rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                      Show List
                      <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                      </svg>
                    </p>
                  </Link>
                </div>
              </div>
            )) : (
              <p>
                No albuns lists for now
              </p>
            ))}
          </div>
      </div>
    </main>
  );
}

function useReadContracteadContract(arg0: unknown): { data: any; isLoading: any; } | PromiseLike<{ data: any; isLoading: any; }> {
  throw new Error("Function not implemented.");
}
