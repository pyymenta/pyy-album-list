import Image from "next/image";
import { prepareContractCall, ThirdwebContract } from "thirdweb";
import { TransactionButton } from "thirdweb/react";
import { Album } from "@/types/Album";

interface Props {
  album: Album;
  editMode: boolean;
  contract: ThirdwebContract;
  index: number;
  handleAlbumDetails: () => void;
}

const AlbumCard = (props: Props) => {
  const { album, editMode, contract, index, handleAlbumDetails } = props;
  const {
    name,
    artist,
    annotations,
    frontImage,
    review,
  } = album;

  return (
    <div
      className="flex flex-col justify-between max-w-sm p-6 bg-white border border-slate-200 rounded-lg shadow"
    >
      <div>
        <div className="flex justify-between">
          <h5 className="mb-1 text-2xl font-bold tracking-tight">{name}</h5>
          <Image
            src={frontImage}
            width={48}
            height={48}
            alt="Album avatar"
            className="rounded-full"
          />
        </div>

        <span className="mb-4 text-base font-medium inline-block tracking-tight">By: {artist}</span>

        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{annotations}</p>
        <div className="flex gap-2">
          {(Array.from({ length: Number(review)}, (_, i) => (<Image
            src="/star.svg"
            key={i}
            alt="Review"
            width={20}
            height={20}
          />
          )))}
        </div>
      </div>
      <button
        className="text-sm px-4 py-2 bg-blue-500 text-white rounded md mt-4"
        onClick={handleAlbumDetails}
      >
        Details
      </button>
      {editMode && (
        <TransactionButton
            transaction={() => prepareContractCall({
              contract,
              method: "function removeAlbum(uint256 _index)",
              params: [BigInt(index)]
            })}
            onError={(error) => alert(`Error: ${error.message}`)}
            onTransactionConfirmed={async () => alert("Removed successfully!")}
            style={{
                marginTop: "1rem",
                backgroundColor: "red",
                color: "white",
                padding: "0.5rem 1rem",
                borderRadius: "0.375rem",
                cursor: "pointer",
            }}
        >Remove</TransactionButton>
      )}
    </div>
  );
};

export default AlbumCard;
