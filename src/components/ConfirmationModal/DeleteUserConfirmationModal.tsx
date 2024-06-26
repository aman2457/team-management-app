import React from 'react';
import Modal from 'react-modal';

interface DeleteUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
  deleteMessage: string;
}

const DeleteUserModal: React.FC<DeleteUserModalProps> = ({ isOpen, onClose, onDelete, deleteMessage }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="fixed inset-0 flex items-center justify-center"
      overlayClassName="fixed inset-0 bg-gray-900 bg-opacity-50"
      ariaHideApp={false} 
    >
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <p className="text-lg mb-6 font-medium">{deleteMessage}</p>
        <div className="flex justify-end">
          <button onClick={onClose} className="border border-black bg-white-500 w-6/12 text-black px-4 hover:bg-stone-200 py-2 rounded-lg mr-2 focus:outline-none">
            Cancel
          </button>
          <button onClick={onDelete} className="bg-purple-500 w-6/12 text-white px-4 py-2 rounded-lg hover:bg-purple-900 focus:outline-none">
            Confirm
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteUserModal;
