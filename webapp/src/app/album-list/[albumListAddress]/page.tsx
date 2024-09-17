"use client";

import { useParams } from "next/navigation";
import { polygonAmoy } from "thirdweb/chains";
import { client } from "../../client";
import { useReadContract } from "thirdweb/react";
import { getContract } from "thirdweb";

export default function AlbumListPage() {
  const { albumListAddress } = useParams();

  const contract = getContract({
    client,
    chain: polygonAmoy,
    address: albumListAddress as string,
  });

  const { data: name, isLoading: isLoadingName } = useReadContract({
    contract,
    method: "function name() view returns (string)",
    params: []
  });

  const { data: description, isLoading: isLoadingDescrition } = useReadContract({
    contract,
    method: "function description() view returns (string)",
    params: []
  });

  const { data: deadline, isLoading: isLoadingDeadline } = useReadContract({
    contract,
    method: "function deadline() view returns (uint256)",
    params: []
  });

  const deadlineDate = new Date(parseInt(deadline?.toString() as string) * 1000);
  const deadlineFinished = deadlineDate < new Date();

  const { data: albums, isLoading: isLoadingAlbums } = useReadContract({
    contract,
    method: "function getAlbums() view returns (string name, string annotations, uint256 review, string frontImage, string backImage, string albumUrl)",
    params: []
  });

  const { data: owner, isLoading: isLoadingOwner } = useReadContract({
    contract,
    method: "function owner() view returns (address)",
    params: []
  });

  return (
    <div className="mx-auto max-w-7xl px-2 mt-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center">
        {!isLoadingName && (
          <h5 className="mb-2 text-2xl font-bold tracking-tight">{name}</h5>
        )}
      </div>
      <div className="my-4">
        <p className="text-lg font-semibold">
          {description}
        </p>
      </div>
      <div className="mb-4">
        {!isLoadingDeadline && (
          <p>
            It finishes in {deadlineDate.toDateString()}
          </p>
        )}
      </div>
    </div>
  )
}
