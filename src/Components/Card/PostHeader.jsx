import { useDisclosure } from "@heroui/react";
import userImage from "../../assets/download.jpg";
import {  Modal,  ModalContent, ModalBody } from "@heroui/modal";

   
export default function PostHeader({ photo, name, date }) {

const {isOpen, onOpen, onClose} = useDisclosure();

  return (
    <>
      {" "}
      <div className="flex">
        {" "}
       <img onClick={onOpen} onError={(e) => { e.target.src = userImage}} 
          src={photo}
          className="rounded-full w-10 h-10 mr-3 cursor-pointer object-cover"
          alt={name || "user"}
        />{" "}
        <Modal
  isOpen={isOpen}
  size="full"
  onClose={onClose}
  isDismissable={true}
  isKeyboardDismissDisabled={false}
  classNames={{
    base: "sm:max-w-3xl sm:max-h-[90vh] sm:mx-4 sm:my-8",
    wrapper: "p-0 m-0 sm:p-4",
    backdrop: "bg-black/80",
    closeButton:
      "top-4 right-4 bg-white/90 hover:bg-white text-black rounded-full p-2 ",
  }}
>
  <ModalContent
    className="[&>button]:cursor-pointer [&_.absolute]:cursor-pointer m-0 sm:m-auto sm:rounded-large rounded-none h-full sm:h-auto bg-transparent shadow-none"
    onClick={onClose}
  >
    <ModalBody
      className="w-full p-0 flex items-center justify-center h-full bg-transparent"
      onClick={onClose}
    >
      <img
        className="  w-full h-auto sm:w-[calc(100%-2rem)] object-cover max-h-[60vh] p-0 m-0 rounded-none sm:rounded-md sm:mx-4 "
        src={photo}
        alt={name || 'user'}
        onClick={(e) => e.stopPropagation()} // prevent closing when clicking image
      />
    </ModalBody>
  </ModalContent>
</Modal>

        <div>
          {" "}
          <h3 className="text-md font-semibold ">{name}</h3>{" "}
          <p className="text-xs text-gray-500">
            {date?.split(".", 1).join().replace("T", " ")}
          </p>{" "}
        </div>{" "}
      </div>{" "}
    </>
  );
}