import React, { useState } from 'react';
import Modal from 'react-modal';
import { TeamMember } from '../../types/TeamMember';

interface UpdateUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedUser: TeamMember | null) => void;
  data: any;
}


const UpdateUserModal: React.FC<UpdateUserModalProps> = ({ isOpen, onClose, onSave, data }) => {
  console.log(data)
    const[name, setName] = useState(data?.name || '');
    const [role, setRole] = useState(data?.role || '');
    const [email, setEmail] = useState(data?.email || '');
    const roles = [
        'Frontend Developer',
        'UX Researcher',
        'Backend Developer',
        'Data Scientist',
        'Marketing Manager',
        'Product Manager',
        'Product Designer'
      ]


  const handleSave = () => {

    console.log({ name, role, email });
    const updatedUser = {
        ...data,
        name,
        role,
        email,
        };
    console.log(updatedUser);
    onSave(updatedUser); 
    onClose(); 
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="fixed inset-0 flex items-center justify-center"
      overlayClassName="fixed inset-0 bg-gray-900 bg-opacity-50"
      ariaHideApp={false}
    >
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-lg font-semibold mb-4">Edit User Details</h2>
        <form onSubmit={handleSave}>
          <div className="mb-4">
            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              id="firstName"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          {/* a select group for roles */}
            <div className="mb-4">
                <label htmlFor="role" className="block text-sm font-medium text-gray-700">User Role</label>
                <select
                id="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
                >{
                    roles.map((role) => (
                        <option className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm' key={role} value={role}>{role}</option>
                    ))
                }
                </select>
            </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div className="flex justify-end">
            <button type="button" onClick={onClose} className="border border-black bg-white-500 w-6/12 text-black px-4 hover:bg-stone-200 py-2 rounded-lg mr-2 focus:outline-none">
              Cancel
            </button>
            <button type="submit" className="bg-purple-500 w-6/12 text-white px-4 py-2 rounded-lg hover:bg-purple-900 focus:outline-none">
              Save
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default UpdateUserModal;
