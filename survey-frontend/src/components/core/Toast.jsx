import {useStateContext} from "../../contexts/ContextProvider.jsx";

export default function Toast() {
  const {toast} = useStateContext()
  return (
    <>
      {toast.show && (
        // add fade animation
        <div className='min-w-[400px] text-white bg-green-400 rounded shadow-md fixed bottom-4 right-4 py-3 px-4 z-10'>
          {toast.message}
        </div>
      )}
    </>
  );
}
