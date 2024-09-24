import Image from "next/image";
import { prepareContractCall, ThirdwebContract } from "thirdweb";
import { TransactionButton } from "thirdweb/react";

interface Props {
  album: {
    name: string;
    annotations: string;
    review: bigint;
    frontImage: string;
    backImage: string;
    albumUrl: string;
  }
  editMode: boolean;
  contract: ThirdwebContract;
  index: number;
}

const AlbumCard = (props: Props) => {
  const { album, editMode, contract, index } = props;
  const {
    name,
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
          <h5 className="mb-2 text-2xl font-bold tracking-tight">{name}</h5>
          <Image
            src={frontImage}
            width={48}
            height={48}
            alt="Album avatar"
            className="rounded-full"
          />
        </div>

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
