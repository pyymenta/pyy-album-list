import Image from "next/image";
import { Album } from "@/types/Album";
import Carousel from "../Carousel";

type AlbumDetailsProps = {
  setIsModalOpened: (isOpen: boolean) => void;
  album?: Album;
};

const AlbumDetailsModal = (props: AlbumDetailsProps) => {
  const { setIsModalOpened, album } = props;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center backdrop-blur-md">
      <div className="sm:w-full md:w-full lg:w-1/2 sm:m-3 md:m-3 max-h-[500px] box-border bg-slate-100 p6 rounded-xl p-4 overflow-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">
            Album details
          </h2>
          <button
            className="text-sm px-4 py-2 bg-green-600 text-white rounded md"
            onClick={() => setIsModalOpened(false)}
          >
            Close
          </button>
        </div>
        <div className="flex flex-col">
          { album?.frontImage && album?.backImage && <Carousel images={[album?.frontImage, album?.backImage]} /> }
        </div>

        <div className="flex flex-col mt-5">
          <h2 className="mb-2 text-2xl font-bold tracking-tight">{album?.name}</h2>
          <p className="text-lg font-light">
            {album?.annotations}
          </p>
          <p className="text-lg font-semibold mt-4">
            Review
          </p>
          <div className="flex gap-2 mt-3">
          {(Array.from({ length: Number(album?.review || 0)}, (_, i) => (<Image
            src="/star.svg"
            key={i}
            alt="Review"
            width={20}
            height={20}
          />
          )))}
          </div>
          <h3 className="mt-4 mb-4 text-xl font-semibold tracking-tight">Listen</h3>
          <iframe style={{ borderRadius: '12px'}} src="https://open.spotify.com/embed/album/7o4UsmV37Sg5It2Eb7vHzu?utm_source=generator" width="100%" height="352" frameBorder="0" allowFullScreen allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
        </div>
      </div>
    </div>
  )
};

export default AlbumDetailsModal;
