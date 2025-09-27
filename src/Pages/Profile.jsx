import UploadPhoto from "../Components/UploadPhoto";
import { useContext } from "react";
import { AuthContext } from "../Components/AuthContext";
import { Modal, ModalBody, ModalContent, useDisclosure } from "@heroui/react";

export default function Profile() {
  const { userData } = useContext(AuthContext);
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <div className="flex justify-center items-center min-h-screen dark:bg-gray-950">
      <div className="bg-white dark:bg-gray-900 shadow-lg  rounded-2xl w-full max-w-md p-6 flex flex-col items-center">
        {/* Profile Picture */}
        <div className="relative">
          <img
            onClick={onOpen}
            src={userData?.photo || "/default-avatar.png"}
            alt="Profile"
            className="w-32 h-32 cursor-pointer rounded-full object-cover shadow-md"
          />
          <Modal
            isOpen={isOpen}
            size="full"
            onClose={onClose}
            isDismissable={true}
            isKeyboardDismissDisabled={false}
            classNames={{
              base: "sm:max-w-4xl sm:max-h-[90vh] sm:mx-4 sm:my-8",
              wrapper: "p-0 sm:p-4",
              backdrop: "bg-black/80",
              closeButton:
                "top-4 right-4 bg-white/90 dark:bg-gray-800 hover:bg-white dark:hover:bg-gray-700 text-black dark:text-white rounded-full p-2 z-50",
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
                  className="w-auto max-w-lg h-auto max-h-[80vh] object-contain rounded-none sm:rounded-md sm:mx-4"
                  src={userData?.photo || "/default-avatar.png"}
                  alt={userData?.name || "user"}
                  onClick={(e) => e.stopPropagation()} // prevent closing when clicking image
                />
              </ModalBody>
            </ModalContent>
          </Modal>
        </div>

        {/* User Info */}
        <h2 className="mt-4 text-2xl font-semibold text-gray-800 dark:text-gray-100">
          {userData?.name || "User"}
        </h2>
        <p className="text-gray-500 dark:text-gray-400">{userData?.email}</p>

        {/* Upload Section */}
        <div className="mt-6 w-full">
          <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">
            Change Profile Picture
          </h3>
          <UploadPhoto />
        </div>
      </div>
    </div>
  );
}
