import { useState } from "react";
import { prepareContractCall, ThirdwebContract } from "thirdweb";
import { lightTheme, TransactionButton } from "thirdweb/react";

const INITIAL_STATE = {
  name: '',
  annotations: '',
  review: 0,
  frontImage: '',
  backImage: '',
  albumUrl: '',
}

type AddModalProps = {
  setIsModalOpened: (isOpen: boolean) => void;
  contract: ThirdwebContract;
};

const AddAlbumModal = (props: AddModalProps) => {
  const { setIsModalOpened, contract } = props;
  const [fields, setFields] = useState(INITIAL_STATE);

  function onChangeField(e: { target: { id: any; value: any; }; }) {
    setFields(prevState => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }))
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center backdrop-blur-md">
      <div className="w-1/2 bg-slate-100 p6 rounded-md p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">
            Add album
          </h2>
          <button 
            className="text-sm px-4 py-2 bg-green-600 text-white rounded md"
            onClick={() => setIsModalOpened(false)}
          >
            Close
          </button>
        </div>
        <div className="flex flex-col">
          <label htmlFor="name">Album</label>
          <input
            id="name"
            name="name" 
            type="text"
            value={fields.name}
            onChange={onChangeField}
            placeholder="Album name"
            className="mb-4 px-4 py-2 bg-slate-200 rounded-md"
          />
          <label htmlFor="annotations">Album</label>
          <textarea
            id="annotations"
            name="annotations" 
            value={fields.annotations}
            onChange={onChangeField}
            placeholder="Your impressions about this album"
            className="mb-4 px-4 py-2 bg-slate-200 rounded-md"
          />
          <label htmlFor="review">Review</label>
          <input
            id="review"
            name="review" 
            type="number"
            min={0}
            max={10}
            value={fields.review}
            onChange={onChangeField}
            placeholder="Your review"
            className="mb-4 px-4 py-2 bg-slate-200 rounded-md"
          />
          <label htmlFor="frontImage">Front image</label>
          <input
            id="frontImage"
            name="frontImage" 
            type="text"
            value={fields.frontImage}
            onChange={onChangeField}
            placeholder="Front image URL"
            className="mb-4 px-4 py-2 bg-slate-200 rounded-md"
          />
          <label htmlFor="backImage">Back image</label>
          <input
            id="backImage"
            name="backImage" 
            type="text"
            value={fields.backImage}
            onChange={onChangeField}
            placeholder="Back image URL"
            className="mb-4 px-4 py-2 bg-slate-200 rounded-md"
          />
          <label htmlFor="albumUrl">Album URL</label>
          <input
            id="albumUrl"
            name="albumUrl" 
            type="text"
            value={fields.albumUrl}
            onChange={onChangeField}
            placeholder="Album URL(spotify, deezer, youtube etc)"
            className="mb-4 px-4 py-2 bg-slate-200 rounded-md"
          />

          <TransactionButton
            transaction={() => prepareContractCall({
              contract,
              method: "function addAlbum(string _name, string _annotations, uint256 _review, string _frontImage, string _backImage, string _albumUrl)",
              params: [fields.name,
                fields.annotations,
                BigInt(fields.review),
                fields.frontImage,
                fields.backImage,
                fields.albumUrl
              ]
            })}
            onTransactionConfirmed={async () => {
              alert("Album added successfully");
              setIsModalOpened(false);
            }}
            theme={lightTheme()}
          >
            Add album
          </TransactionButton>
        </div>
      </div>
    </div>
  )
};

export default AddAlbumModal;