import Link from "next/link";

interface Props {
  albumList: {
    name: string
    description: string
    albumListAddress: string
  }
}

const AlbumListCard = (props: Props) => {
  const { albumList } = props;

  return (
    <div
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
  );
};

export default AlbumListCard;