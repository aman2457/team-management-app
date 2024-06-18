import React from 'react';
import { TeamMember } from '../../types/TeamMember';
import {
  useReactTable,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  getPaginationRowModel,
} from '@tanstack/react-table';
import DeleteUserConfirmationModal from '../ConfirmationModal/DeleteUserConfirmationModal';
import UpdateUserModal from '../UpdateUserModal/UpdateUserModal';
import RolePills from '../Pills/RolePills/RolePills';
import StatusPills from '../Pills/StatusPills/StatusPills';
import ReactModal from 'react-modal';

interface TeamMemberListProps {
  members: TeamMember[];
  loading: boolean;
  deleteMember: (id: number | null) => Promise<boolean>;
  updateMember: (id: number, member: any) => Promise<boolean>;
  deleteMembersByIds: (ids: number[]) => Promise<boolean>;
  totalRecords: number;
}

export const TeamMemberList: React.FC<TeamMemberListProps> = (props) => {
  const [data, setData] = React.useState(() => [...props.members]);
  const [totalRecords, setTotalRecords] = React.useState<number>(
    props.totalRecords
  );
  const [sorting, setSorting] = React.useState<SortingState>([]);

  const pages = Array.from({ length: data.length / 10 }, (_, i) => i + 1);
  if (data.length % 10 != 0) pages.push(pages.length + 1);

  const [userToDelete, setUserToDelete] = React.useState<TeamMember | null>(
    null
  );
  const [userToUpdate, setUserToUpdate] = React.useState<TeamMember | null>(
    null
  );


  const [showModal, setShowModal] = React.useState(false);
  const [showEditModal, setShowEditModal] = React.useState(false);
  const [textToShow, setTextToShow] = React.useState('');
  const [showSuccess, setShowSuccess] = React.useState(false);
  const [selectedIds, setSelectedIds] = React.useState<number[]>([]);
  const [showMultipleDeleteModal, setShowMultipleDeleteModal] =
    React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const columnHelper = createColumnHelper<TeamMember>();

  const columns = [
    columnHelper.display({
      id: 'selection',
      header: ({ table }) => (
        <input
          type="checkbox"
          checked={table.getIsAllRowsSelected()}
          onChange={table.getToggleAllRowsSelectedHandler()}
        />
      ),
      cell: ({ row }) => (
        <input
          type="checkbox"
          checked={row.getIsSelected()}
          onChange={row.getToggleSelectedHandler()}
        />
      ),
    }),
    columnHelper.accessor('name', {
      header: 'Name',
      cell: (row) => {
        return (
          <div className="flex items-center">
            <img
              src={row.row.original.avatar}
              alt="avatar"
              className="w-8 h-8 rounded-full mr-2"
            />
            <div>
              <div>{row.row.original.name}</div>
              <div className="text-gray-500">{row.row.original.userName}</div>
            </div>
          </div>
        );
      },
    }),
    columnHelper.accessor('isActive', {
      cell: (info) => (
        <StatusPills text={info.getValue() ? 'Active' : 'Inactive'} />
      ),
      header: 'Status',
    }),
    columnHelper.accessor('role', {
      cell: (info) => info.getValue(),
      header: 'Role',
    }),
    columnHelper.accessor('email', {
      cell: (info) => info.getValue(),
      header: 'Email address',
    }),
    columnHelper.accessor('teams', {
      cell: (info) => {
        return (
          <div className="flex space-x-2">
            {info
              .getValue()
              .slice(0, 3)
              .map((team) => (
                <RolePills key={team} text={team} />
              ))}
            {info.getValue().length > 3 && (
              <div className="text-xs	rounded-full bg-gray-200 text-gray-800 p-1 cursor-pointer">
                +{info.getValue().length - 3}
              </div>
            )}
          </div>
        );
      },
      header: 'Teams',
    }),
    columnHelper.display({
      id: 'actions',
      header: () => <span></span>,
      cell: ({ row }) => (
        <div className="flex gap-2">
          <button
            className="px-1 py-1 rounded-lg"
            onClick={() => handleDeleteUser(row.original)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
              />
            </svg>
          </button>
          <button
            className="px-1 py-1 rounded-lg"
            onClick={() => handleEditUserChange(row.original)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
              />
            </svg>
          </button>
        </div>
      ),
    }),
  ];

  const handleShowEditModal = () => {
    setShowEditModal(true);
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
  };

  const handleEditUserChange = (row: TeamMember) => {
    handleShowEditModal();
    setUserToUpdate(row);
  };

  const handleEditUser = async (updatedUser: any) => {
    if (userToUpdate === null) return;
    const result = await props.updateMember(userToUpdate?.id, updatedUser);
    if (result) {
      const updatedData = data.map((user) =>
        user.id === userToUpdate.id ? updatedUser : user
      );
      setData(updatedData);
    }
    setShowEditModal(false);
    setShowSuccess(true);
    setUserToUpdate(null);
    setTextToShow('User Details changed!');
  };

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleShowMultipleDeleteModal = () => {
    setShowMultipleDeleteModal(true);
  };

  const handleCloseMultipleDeleteModal = () => {
    setShowMultipleDeleteModal(false);
  };

  const handleDeleteUser = (row: TeamMember) => {
    handleShowModal();
    setUserToDelete(row);
  };

  const renderActionSuccess = (actionText: string, loading: boolean) => {
    return (
      <ReactModal
        isOpen={true}
        className="fixed inset-0 flex items-center justify-center"
        overlayClassName="fixed inset-0 bg-gray-900 bg-opacity-50"
        ariaHideApp={false}
        onRequestClose={() => {
          setShowSuccess(false);
          setTextToShow('');
        }}
      >
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
          {loading ? (
            <div className="flex justify-center items-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
            </div>
          ) : (
            <>
              {' '}
              <svg
                width="64"
                height="64"
                viewBox="0 0 56 56"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  x="4"
                  y="4"
                  width="48"
                  height="48"
                  rx="24"
                  fill="#D1FADF"
                />
                <rect
                  x="4"
                  y="4"
                  width="48"
                  height="48"
                  rx="24"
                  stroke="#ECFDF3"
                  stroke-width="8"
                />
                <path
                  d="M38 27.08V28C37.9988 30.1564 37.3005 32.2547 36.0093 33.9818C34.7182 35.709 32.9033 36.9725 30.8354 37.5839C28.7674 38.1953 26.5573 38.1219 24.5345 37.3746C22.5117 36.6273 20.7847 35.2461 19.611 33.4371C18.4373 31.628 17.8798 29.4881 18.0217 27.3363C18.1636 25.1846 18.9972 23.1363 20.3983 21.4971C21.7994 19.8578 23.6928 18.7154 25.7962 18.2401C27.8996 17.7649 30.1003 17.9823 32.07 18.86M38 20L28 30.01L25 27.01"
                  stroke="#039855"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              <h2 className="text-lg font-semibold mb-4 mt-3">{actionText}</h2>
            </>
          )}
        </div>
      </ReactModal>
    );
  };

  const handleDeleteUserConfirmation = async () => {
    if (userToDelete === null) return;
    const result = await props.deleteMember(userToDelete?.id);
    if (result) {
      setData(data.filter((user) => user.id !== userToDelete.id));
      setTotalRecords(totalRecords - 1);
    }
    setShowModal(false);
    setTextToShow('User successfully deleted!');
    setShowSuccess(true);
    setUserToDelete(null);
  };

  const table = useReactTable({
    data,
    columns,
    state: { sorting },
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    initialState: {
      pagination: {
        pageSize: 10,
      },
    },
    enableRowSelection: true,
    getPaginationRowModel: getPaginationRowModel(),
  });

  const renderDeleteSelectedWithTableTitle = () => {
    return (
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">Team Members</h1>
        <div className="mr-auto ml-4 px-1 py-1 w-fit font-semibold text-sm rounded-full shadow-sm bg-purple-100 text-purple-900">
          {totalRecords} users
        </div>
        <div className="flex gap-2">
          <button
            className="bg-purple-500 text-white px-4 py-2 rounded-lg"
            onClick={handleDeleteSelectedChange}
          >
            Delete Selected
          </button>
        </div>
      </div>
    );
  };

  const renderDeleteMemberModal = () => {
    return (
      <>
        <DeleteUserConfirmationModal
          isOpen={showModal}
          onClose={handleCloseModal}
          onDelete={handleDeleteUserConfirmation}
          deleteMessage="Are you sure you want to delete this user?"
        />
      </>
    );
  };

  const renderDeleteSelectModal = () => {
    return (
      <>
        <DeleteUserConfirmationModal
          isOpen={showMultipleDeleteModal}
          onClose={handleCloseMultipleDeleteModal}
          onDelete={handleDeleteSelected}
          deleteMessage="Are you sure you want to delete selected users?"
        />
      </>
    );
  };

  const handleDeleteSelectedChange = async () => {
    handleShowMultipleDeleteModal();
    setSelectedIds(
      table.getSelectedRowModel().flatRows.map((row) => row.original.id)
    );
  };

  const handleDeleteSelected = async () => {
    if (selectedIds.length === 0) return;
    const result = await props.deleteMembersByIds(selectedIds);
    if (result) {
      setData(data.filter((user) => !selectedIds.includes(user.id)));
      setTotalRecords(totalRecords - selectedIds.length);
    }
    handleCloseMultipleDeleteModal();
    setTextToShow('Users successfully deleted!');
    setShowSuccess(true);
    setSelectedIds([]);
    table.resetRowSelection();
  };

  const renderEditUserModal = () => {
    return (
      <>
        <UpdateUserModal
          isOpen={showEditModal}
          onClose={handleCloseEditModal}
          onSave={handleEditUser}
          data={userToUpdate}
        />
      </>
    );
  };

  const renderPagination = () => (
    <div className="flex sm:flex-row flex-col w-98 m-2 items-center justify-between gap-2 text-xs">
      <button
        className={`${
          !table.getCanPreviousPage()
            ? 'bg-white-100 border border-black'
            : 'hover:bg-white-200 border hover:curstor-pointer bg-white-100 w-28 rounded-lg border-black'
        } rounded p-1`}
        onClick={() => table.previousPage()}
        disabled={!table.getCanPreviousPage()}
      >
        <div className="mr-1 text-lg font-medium flex justify-center gap-2 align-middle rounded-lg">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="size-6"
          >
            <path
              fillRule="evenodd"
              d="M11.03 3.97a.75.75 0 0 1 0 1.06l-6.22 6.22H21a.75.75 0 0 1 0 1.5H4.81l6.22 6.22a.75.75 0 1 1-1.06 1.06l-7.5-7.5a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 0 1 1.06 0Z"
              clipRule="evenodd"
            />
          </svg>
          Previous
        </div>
      </button>
      <span className="flex items-center gap-1">
        {pages.map((page) => (
          <button
            key={page}
            className={`${
              table.getState().pagination.pageIndex === page - 1
                ? 'w-6 bg-purple-100'
                : 'w-6 hover:bg-purple-100 hover:curstor-pointer bg-gray-100'
            } rounded p-1`}
            onClick={() => table.setPageIndex(page - 1)}
          >
            {page}
          </button>
        ))}
      </span>
      <button
        className={`${
          !table.getCanNextPage()
            ? 'bg-white-100 border border-black'
            : 'hover:bg-white-200 border hover:curstor-pointer bg-white-100 w-28 rounded-lg border-black'
        } rounded p-1`}
        onClick={() => table.nextPage()}
        disabled={!table.getCanNextPage()}
      >
        <div className="mr-1 text-lg font-medium flex justify-center gap-2 align-middle rounded-lg">
          Next
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="size-6"
          >
            <path
              fillRule="evenodd"
              d="M12.97 3.97a.75.75 0 0 1 1.06 0l7.5 7.5a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 1 1-1.06-1.06l6.22-6.22H3a.75.75 0 0 1 0-1.5h16.19l-6.22-6.22a.75.75 0 0 1 0-1.06Z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </button>
    </div>
  );

  return (
    <>
      {renderDeleteSelectedWithTableTitle()}
      <div className="mt-2 flex flex-col">
        <div className="-my-2 overflow-x-auto -mx-4 sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  {table.getHeaderGroups().map((headerGroup) => (
                    <tr
                      key={headerGroup.id}
                      className="border-b text-gray-800 uppercase"
                    >
                      {headerGroup.headers.map((header) => (
                        <th
                          key={header.id}
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          {header.isPlaceholder ? null : (
                            <div
                              {...{
                                className: header.column.getCanSort()
                                  ? 'cursor-pointer select-none flex min-w-[36px]'
                                  : '',
                                onClick:
                                  header.column.getToggleSortingHandler(),
                              }}
                            >
                              {flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                              {{
                                asc: <span className="pl-2">↑</span>,
                                desc: <span className="pl-2">↓</span>,
                              }[header.column.getIsSorted() as string] ?? null}
                            </div>
                          )}
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>
                <tbody>
                  {table.getRowModel().rows.map((row) => (
                    <tr key={row.id} className="border-b">
                      {row.getVisibleCells().map((cell) => (
                        <td key={cell.id} className="px-4 pt-[14px] pb-[18px]">
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
              {renderPagination()}
              {showModal && renderDeleteMemberModal()}
              {showEditModal && renderEditUserModal()}
              {showSuccess && renderActionSuccess(textToShow, loading)}
              {showMultipleDeleteModal && renderDeleteSelectModal()}
              <div />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
