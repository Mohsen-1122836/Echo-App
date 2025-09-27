import { Modal, ModalContent, ModalBody } from "@heroui/modal";
import { useDisclosure } from "@heroui/react";

export default function PostBody({ body, image, name }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      {body && <p className="mb-3">{body}</p>}

      {image && (
        <img
          onClick={onOpen}
          className="w-full h-96 cursor-pointer object-cover rounded-md my-3"
          src={image}
          alt={name}
        />
      )}

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
              className="w-full h-auto sm:w-[calc(100%-2rem)] m-0 sm:m-auto object-cover max-h-[60vh] p-0 rounded-none sm:rounded-md sm:mx-4"
              src={image}
              alt={name}
              onClick={(e) => e.stopPropagation()} // prevent closing when clicking image
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
