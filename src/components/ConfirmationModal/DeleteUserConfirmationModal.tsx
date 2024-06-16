import React from 'react';
import Modal from 'react-modal';

interface DeleteUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
}

const DeleteUserModal: React.FC<DeleteUserModalProps> = ({ isOpen, onClose, onDelete }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="fixed inset-0 flex items-center justify-center"
      overlayClassName="fixed inset-0 bg-gray-900 bg-opacity-50"
      ariaHideApp={false} 
    >
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-lg font-semibold mb-4">Confirm Deletion</h2>
        <p className="text-gray-600 mb-4">Are you sure you want to delete this user?</p>
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
