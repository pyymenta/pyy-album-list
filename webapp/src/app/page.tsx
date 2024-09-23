"use client";

import { getContract } from "thirdweb";
import { polygonAmoy } from "thirdweb/chains";
import { client } from "./client";
import { useReadContract } from "thirdweb/react";
import Link from "next/link";
import AlbumListCard from "@/components/AlbumListCard";

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
              <AlbumListCard 
                albumList={albumList}
                key={index}
              />
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
