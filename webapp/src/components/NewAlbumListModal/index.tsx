import { client } from "@/app/client";
import { useState } from "react";
import { polygonAmoy } from "thirdweb/chains";
import { deployPublishedContract } from "thirdweb/deploys";
import { useActiveAccount } from "thirdweb/react";

const INITIAL_STATE = {
  name: '',
  description: '',
  durationDays: 1,
}

type NewListModalProps = {
  setIsModalOpened: (isOpen: boolean) => void;
};

const NewAlbumListModal = (props: NewListModalProps) => {
  const account = useActiveAccount();
  const { setIsModalOpened } = props;
  const [fields, setFields] = useState(INITIAL_STATE);
  const [isDeployingContract, setIsDeployingContract] = useState(false);

  function onChangeField(e: { target: { id: any; value: any; }; }) {
    setFields(prevState => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }))
  }

  const handleContractDeploy = async () => {
    setIsDeployingContract(true);

    try {
      const contractAddress = await deployPublishedContract({
        client,
        chain: polygonAmoy,
        account: account!,
        contractId: "PyyAlbumList",
        contractParams: [
          fields.name,
          fields.description,
          fields.durationDays,
        ],
        publisher: '0xF274f591186C0254B725Ae56c3030d752F5D8FCA',
        version: "1.0.1",
      });

      alert('Album list created successfully!');
    } catch (error) {
      console.error(error);
    } finally {
      setIsDeployingContract(false);
      setIsModalOpened(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center backdrop-blur-md">
      <div className="w-1/2 bg-slate-100 p6 rounded-md p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">
            New album list
          </h2>
          <button 
            className="text-sm px-4 py-2 bg-green-600 text-white rounded md"
            onClick={() => setIsModalOpened(false)}
          >
            Close
          </button>
        </div>
        <div className="flex flex-col">
          <label htmlFor="name">Name</label>
          <input
            id="name"
            name="name" 
            type="text"
            value={fields.name}
            onChange={onChangeField}
            placeholder="Album list name"
            className="mb-4 px-4 py-2 bg-slate-200 rounded-md"
          />
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description" 
            value={fields.description}
            onChange={onChangeField}
            placeholder="list description"
            className="mb-4 px-4 py-2 bg-slate-200 rounded-md"
          />
          <label htmlFor="durationDays">Duration days</label>
          <input
            id="durationDays"
            name="durationDays" 
            type="number"
            min={1}
            value={fields.durationDays}
            onChange={onChangeField}
            placeholder=""
            className="mb-4 px-4 py-2 bg-slate-200 rounded-md"
          />

          <button 
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md"
            onClick={handleContractDeploy}
            disabled={isDeployingContract}  
          >
            {isDeployingContract ? "Creating album list..." : "Create album list"}
          </button>
        </div>
      </div>
    </div>
  )
};

export default NewAlbumListModal;