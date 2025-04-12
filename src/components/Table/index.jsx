"use client"
import React from 'react';
import UpIcon from '../Icons/UpIcon.svg';
import DownIcon from '../Icons/DownIcon.svg';

export default function DynamicTable({ columns, data }) {
  return (
    <div className="overflow-x-auto rounded-3xl shad mt-6">
      <table className="min-w-full table-auto border-separate border-spacing-0">
        <thead className="bg-bggreen">
          <tr>
            {columns.map((col, idx) => (
              <th
                key={col.accessor}
                className={`p-3 text-left text-sm text-nowrap font-medium text-[#191919] border-b border-dcd ${
                  idx === 0 ? 'static lg:sticky left-0 min-w-[270px] border-r border-dcd bg-bggreen z-10' : 'min-w-[170px]'
                }`}
              >
                <div className="flex items-center text-sm justify-between gap-6">
                  {col.header}
                  <span className=" flex flex-col ">
                    <UpIcon w0dth={14} height={12} color={"#C9C9C9"} />
                    <DownIcon w0dth={14} height={12} color={"#C9C9C9"} />
                  </span>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex} className="hover:bg-gray-50">
              {columns.map((col, idx) => (
                <td
                  key={col.accessor}
                  className={`px-3 py-6 text-xs  text-[#666666] border-b border-dcd ${
                    idx === 0 ? 'static lg:sticky left-0 border-r  bg-white z-0' : ''
                  }`}
                >
                  {row[col.accessor]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
