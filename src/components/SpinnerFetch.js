import { useContext } from "react";

import Spinner from "react-bootstrap/Spinner";
import { LoadContext } from "../context/LoadContext";

const SpinnerFetch = () => {
  const { loadSpinner } = useContext(LoadContext);

  if (loadSpinner)
    return (
      <div className="flex items-center justify-center h-screen w-screen fixed z-[5000] bg-[#00000029]">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
};

export default SpinnerFetch;
