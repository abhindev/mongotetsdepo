import { useState } from "react";
import Modal from "react-modal";
import getLoggedIn from "../../hooks/getLoggedIn";
import Login from "../../hooks/login"
import Form from "../form"

function Review({id}:any) {
  const [isOpen, setIsOpen] = useState(false);
  const log = getLoggedIn();
  console.log(id._id)
  const _id = id._id
  const customStyles = {
    overlay: { backgroundColor: "rgba(0, 0, 0, 0.6)" },
    content: {
      top: "100px",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };


  return (
    <div>
      <button onClick={() => setIsOpen(true)}>Open Modal</button>
      {log == true ? (
        <Modal
          isOpen={isOpen}
          onRequestClose={() => setIsOpen(false)}
          style={customStyles}
        >
          <h1>hay modeal</h1>
          <Form id={id} />
          <button onClick={() => setIsOpen(false)}>Close Modal</button>
        </Modal>
      ) : (
        <Modal
          isOpen={isOpen}
          onRequestClose={() => setIsOpen(false)}
          style={customStyles}
        >
          <h1>login model</h1>
          <Login setIsOpen />
          <button onClick={() => setIsOpen(false)}>x</button>
        </Modal>
      )}
    </div>
  );
}

export default Review;
