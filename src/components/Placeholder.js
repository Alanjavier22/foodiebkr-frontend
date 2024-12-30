import Placeholder from "react-bootstrap/Placeholder";

function PlaceholderCustom() {
  return (
    <>
      <Placeholder className="flex justify-start pl-4 ml-4" animation="glow">
        <Placeholder md={6} className="m-3 h-10" />
      </Placeholder>
      <Placeholder className="flex justify-around" animation="glow">
        <Placeholder md={11} className="m-3 h-10" />
      </Placeholder>
      <Placeholder className="flex justify-start pl-4 ml-4" animation="glow">
        <Placeholder md={6} className="m-3 h-10" />
        <Placeholder md={5} className="m-3 h-10" />
      </Placeholder>
      <Placeholder className="flex justify-around" animation="glow">
        <Placeholder md={11} className="m-3 h-52" />
      </Placeholder>
    </>
  );
}

export default PlaceholderCustom;
