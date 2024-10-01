"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { polygonAmoy } from "thirdweb/chains";
import { client } from "../../client";
import { useActiveAccount, useReadContract } from "thirdweb/react";
import { getContract } from "thirdweb";
import AlbumCard from '@/components/AlbumCard';
import AddAlbumModal from "@/components/AddAlbumModal";
import AlbumDetailsModal from "@/components/AlbumDetailsModal";
import { Album } from "@/types/Album";

export default function AlbumListPage() {
  const { albumListAddress } = useParams();
  const account = useActiveAccount();
  const [editMode, setEditMode] = useState(false);
  const [editModalOpened, setEditModalOpened] = useState(false);
  const [albumDetailsOpened, setAlbumDetailsOpened] = useState(false);
  const [selectedAlbum, setSelectedAlbum] = useState<Album>()

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
    method: "function getAlbums() view returns ((string name, string artist, string annotations, uint256 review, string frontImage, string backImage, string albumUrl)[])",
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
          <>
            <h5 className="mb-2 text-2xl font-bold tracking-tight">{name}</h5>
            {owner === account?.address && (
              <div className="flex flex-row">
                <button
                  onClick={() => setEditMode((prevState) => !prevState)}
                  className="px-4 py-2 bg-green-500 text-white rounded-md"
                >
                  {editMode ? "Done" : "Edit List"}
                </button>
              </div>
            )}
          </>
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
      <div>
        <p className="text-lg font-semibold mb-4">Albuns</p>
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4">
          {isLoadingAlbums ? (
            <p>Loading...</p>
          ) : (
            albums && albums.length > 0 ? (
              albums.map((album, i) => (
                <AlbumCard
                  album={album}
                  key={i}
                  editMode={editMode}
                  contract={contract}
                  index={i}
                  handleAlbumDetails={() => {
                    setSelectedAlbum(album);
                    setAlbumDetailsOpened(true);
                  }}
                />
              ))
            ) : (
              <p>No albums in this list</p>
            )
          )}
          {
            editMode && (
              <button className="max-w-sm flex flex-col text-center justify-center items-center font-semibold p-6 bg-green-500 text-white border border-green-200 rounded-lg shadow"
                onClick={() => setEditModalOpened(prevState => !prevState)}
              >
                + Add new album to the list
              </button>
            )
          }
        </div>
      </div>
      {
        editModalOpened && (<AddAlbumModal
          contract={contract}
          setIsModalOpened={setEditModalOpened}
        />)
      }
      {
        albumDetailsOpened && (<AlbumDetailsModal
          album={selectedAlbum}
          setIsModalOpened={setAlbumDetailsOpened}
        />)
      }
    </div>
  )
}
