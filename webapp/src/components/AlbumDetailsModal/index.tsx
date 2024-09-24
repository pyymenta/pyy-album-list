import { Album } from "@/types/Album";

type AlbumDetailsProps = {
  setIsModalOpened: (isOpen: boolean) => void;
  album?: Album;
};

const AlbumDetailsModal = (props: AlbumDetailsProps) => {
  const { setIsModalOpened, album } = props;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center backdrop-blur-md">
      <div className="w-1/2 bg-slate-100 p6 rounded-md p-4">
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
      </div>
    </div>
  )
};

export default AlbumDetailsModal;
