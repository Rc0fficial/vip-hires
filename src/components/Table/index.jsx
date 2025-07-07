"use client"
import React, { useState } from 'react';
import UpIcon from '../Icons/UpIcon.svg';
import DownIcon from '../Icons/DownIcon.svg';

const DynamicTable = ({ columns, data, filters, onFilterChange }) => {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const sortedData = [...data].sort((a, b) => {
    if (!sortConfig.key) return 0;

    const aValue = a[sortConfig.key];
    const bValue = b[sortConfig.key];

    if (aValue < bValue) {
      return sortConfig.direction === 'asc' ? -1 : 1;
    }
    if (aValue > bValue) {
      return sortConfig.direction === 'asc' ? 1 : -1;
    }
    return 0;
  });

  const getUniqueValues = (accessor) => {
    const values = new Set();
    data.forEach(item => {
      if (item[accessor] !== undefined) {
        values.add(item[accessor]);
      }
    });
    return Array.from(values).sort();
  };

  return (
    <div className="overflow-x-auto rounded-xl shadow-sm border border-[#e0e0e0]">
      <table className="min-w-full divide-y divide-[#e0e0e0]">
        <thead className="bg-[#f8f8f8]">
          <tr>
            {columns.map((col) => (
              <th
                key={col.accessor}
                className="px-4 py-3 text-left text-xs text-nowrap font-medium text-[#191919] uppercase tracking-wider relative"
                onClick={() => {
                  if (col.filter) {
                    const dropdown = document.getElementById(`dropdown-${col.accessor}`);
                    dropdown.classList.toggle('hidden');
                    // Close other open dropdowns
                    document.querySelectorAll('.filter-dropdown').forEach(d => {
                      if (d.id !== `dropdown-${col.accessor}`) d.classList.add('hidden');
                    });
                  }
                }}
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center cursor-pointer">
                    <span>{col.header}</span>
                    {col.accessor !== 'actions' && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSort(col.accessor);
                        }}
                        className="ml-2 flex flex-col items-center justify-center"
                        aria-label={`Sort by ${col.header}`}
                      >
                        <UpIcon
                          width={10}
                          height={10}
                          color={sortConfig.key === col.accessor && sortConfig.direction === 'asc' ? "#555" : "#C9C9C9"}
                        />
                        <DownIcon
                          width={10}
                          height={10}
                          color={sortConfig.key === col.accessor && sortConfig.direction === 'desc' ? "#555" : "#C9C9C9"}
                        />
                      </button>
                    )}
                  </div>
                </div>

                {col.filter && (
                  <div
                    id={`dropdown-${col.accessor}`}
                    className="filter-dropdown hidden absolute left-0 right-0 top-full mt-1 z-10 bg-white shadow-lg rounded border border-[#e0e0e0]"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {getUniqueValues(col.accessor).map((value, index) => (
                      <div
                        key={index}
                        className="px-3 py-2 text-xs hover:bg-gray-100 cursor-pointer"
                        onClick={() => {
                          onFilterChange(col.accessor, value === filters[col.accessor] ? '' : value);
                          document.getElementById(`dropdown-${col.accessor}`).classList.add('hidden');
                        }}
                      >
                        {value}
                      </div>
                    ))}
                    <div
                      className="px-3 py-2 text-xs hover:bg-gray-100 cursor-pointer border-t border-[#e0e0e0]"
                      onClick={() => {
                        onFilterChange(col.accessor, '');
                        document.getElementById(`dropdown-${col.accessor}`).classList.add('hidden');
                      }}
                    >
                      Clear Filter
                    </div>
                  </div>
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-[#e0e0e0]">
          {sortedData.length > 0 ? (
            sortedData.map((row, rowIndex) => (
              <tr key={rowIndex} className="hover:bg-[#f9f9f9]">
                {columns.map((col) => (
                  <td
                    key={col.accessor}
                    className="px-4 py-4 whitespace-nowrap text-sm text-[#666666]"
                  >
                    {col.render ? col.render(row) : row[col.accessor]}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length} className="px-4 py-4 text-center text-sm text-gray-500">
                No applications found matching your filters
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
export default DynamicTable