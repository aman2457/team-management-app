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
import { memberList } from '../../data';

const columnHelper = createColumnHelper<TeamMember>();

const columns = [
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
    cell: (info) => (info.getValue() ? 'Active' : 'Inactive'),
    header: 'Active',
  }),
  columnHelper.accessor('role', {
    cell: (info) => info.getValue(),
    header: 'Role',
  }),
  columnHelper.accessor('email', {
    cell: (info) => info.getValue(),
    header: 'Email',
  }),
  columnHelper.accessor('teams', {
    cell: (info) => info.getValue().join(', '),
    header: 'Teams',
  }),
];

export default function TeamMemberList() {
  const [data] = React.useState(() => [...memberList]);
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const pages = Array.from({ length: data.length / 10 }, (_, i) => i + 1);

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
    getPaginationRowModel: getPaginationRowModel(),
  });


  return (
    <>
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
              <div className="flex sm:flex-row flex-col w-98 m-2 items-center justify-between gap-2 text-xs">
                <button
                  className={`${
                    !table.getCanPreviousPage()
                      ? 'bg-gray-100'
                      : 'hover:bg-gray-200 hover:curstor-pointer bg-gray-100'
                  } rounded p-1`}
                  onClick={() => table.previousPage()}
                  disabled={!table.getCanPreviousPage()}
                >
                  <span className="w-5 h-5">{'Previous'}</span>
                </button>
                <span className="flex items-center gap-1">
                  {
                      pages.map((page) => (
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
                      ))
                  }
                </span>
                <button
                  className={`${
                    !table.getCanNextPage()
                      ? 'bg-gray-100'
                      : 'hover:bg-gray-200 hover:curstor-pointer bg-gray-100'
                  } rounded p-1`}
                  onClick={() => table.nextPage()}
                  disabled={!table.getCanNextPage()}
                >
                  <span className="w-5 h-5">{'Next'}</span>
                </button>
              </div>
              <div />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
