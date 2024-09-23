import Image from "next/image";

interface Props {
  album: {
    name: string;
    annotations: string;
    review: bigint;
    frontImage: string;
    backImage: string;
    albumUrl: string;
  }
}

const AlbumCard = (props: Props) => {
  const { album } = props;
  const { 
    name,
    annotations,
    frontImage,
    review,
  } = album;
  console.log({ review: Number(review) })

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
    </div>
  );
};

export default AlbumCard;