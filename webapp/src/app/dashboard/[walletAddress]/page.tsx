"use client";

import { getContract } from "thirdweb";
import { useState } from "react";
import { polygonAmoy } from "thirdweb/chains";
import { useActiveAccount, useReadContract } from "thirdweb/react";
import { client } from "../../client";
import AlbumListCard from "@/components/AlbumListCard";
import NewAlbumListModal from "@/components/NewAlbumListModal";

const ALBUNS_LIST_FACTORY_ADDRESS = "0x009986155E8b9b0e78120C426Eb7B8f87E0EE3D5";

export default function Dashboard() {
  const account = useActiveAccount();
  const [createListModalOpened, setCreateListModalOpened] = useState(false);

  const contract = getContract({
    client,
    chain: polygonAmoy,
    address: ALBUNS_LIST_FACTORY_ADDRESS,
  });

  const { data: albunsLists, isPending } = useReadContract({
    contract,
    method: "function getAlbumListsByUser(address _userAddress) view returns ((address albumListAddress, address owner, string name, string description, uint256 createAt)[])",
    params: [account?.address as string]
  });

  return (
    <main className="mx-auto max-w-7xl px-4 mt-4 sm:px-6 lg:px-8">
      <div className="py-10">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-4xl font-bold">Dashboard</h1>
          <div className="flex flex-row">
            <button
              onClick={() => setCreateListModalOpened(true)}
              className="px-4 py-2 bg-green-500 text-white rounded-md cursor-pointer"
            >
              New album list
            </button>
          </div>
        </div>
        <h2 className="text-2xl font-semibold mb-4">
          My albuns lists
        </h2>
        {isPending && (<p>Loading Albuns Lists..</p>)}
        <div className="grid grid-cols-3 gap-4">
          {!isPending && albunsLists && (albunsLists.length > 0 ? albunsLists.map((albumList, index) => (
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

      {createListModalOpened && (
        <NewAlbumListModal 
          setIsModalOpened={setCreateListModalOpened}
        />
      )}
    </main>
  )
}