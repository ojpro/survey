import {useStateContext} from "../../contexts/ContextProvider.jsx";

export default function Toast() {
  const {toast} = useStateContext()
  return (
    <>
      {toast.show && (
        <div className="toast toast-end">
          <div className="alert alert-success text-white">
            <div>
              <span>{toast.message}</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
