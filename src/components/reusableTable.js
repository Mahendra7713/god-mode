"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState, useEffect } from "react";
import { Card } from "./ui/card";

export default function ReusableTable({
  serverSide = false,
  triggerChange,
  data,
  columns,
  totalItems,
  pageSize,
  setPageSize,
  currentPage,
  rowId,
  showSelectAll = false, // Optional, defaults to false
  onCheckboxChange, // Optional callback for checkbox changes
}) {
  const [pagination, setPagination] = useState(() => ({
    current: serverSide ? currentPage || 1 : 1,
    pageSize: serverSide ? pageSize || 10 : 10,
    total: serverSide ? totalItems || 0 : data ? data.length : 0,
  }));

  const [selectedRows, setSelectedRows] = useState([]); // State for selected row IDs

  useEffect(() => {
    if (serverSide) {
      setPagination((prev) => ({
        ...prev,
        total: totalItems || 0,
      }));
    } else {
      setPagination((prev) => ({
        ...prev,
        total: data ? data.length : 0,
      }));
    }
  }, [totalItems, data, serverSide]);

  const handlePageChange = (page, updatedPageSize) => {
    setPagination((prev) => ({
      ...prev,
      current: page,
      pageSize: updatedPageSize,
    }));
    if (setPageSize) setPageSize(updatedPageSize);
    if (serverSide && triggerChange) triggerChange(page, updatedPageSize);
  };

  const getPaginatedData = () => {
    if (!Array.isArray(data)) return [];
    if (serverSide) return data;
    const startIndex = (pagination.current - 1) * pagination.pageSize;
    return [...data].slice(startIndex, startIndex + pagination.pageSize);
  };

  // Handle checkbox changes only if showSelectAll is true
  const handleCheckboxAllChange = (e) => {
    if (!showSelectAll) return; // Exit if checkboxes are not enabled

    const currentData = getPaginatedData();
    const allRowIds = currentData.map((row) => row[rowId]);

    const updatedRows = e.target.checked ? allRowIds : [];

    setSelectedRows(updatedRows);
    if (onCheckboxChange) onCheckboxChange(updatedRows);
  };

  const handleCheckboxRowChange = (rowIdValue) => {
    if (!showSelectAll) return; // Exit if checkboxes are not enabled

    const updatedRows = selectedRows.includes(rowIdValue)
      ? selectedRows.filter((id) => id !== rowIdValue)
      : [...selectedRows, rowIdValue];

    setSelectedRows(updatedRows);
    if (onCheckboxChange) onCheckboxChange(updatedRows);
  };

  return (
    <Card className="w-full">
      <Table className="w-full bg-white text-black border-gray-200 shadow-md">
        <TableHeader>
          <TableRow className="text-left">
            {showSelectAll && (
              <TableHead className="w-[50px] bg-gray-100">
                <input
                  type="checkbox"
                  checked={getPaginatedData().every((row) =>
                    selectedRows.includes(row[rowId])
                  )}
                  onChange={handleCheckboxAllChange}
                  className="h-4 w-4 rounded border-gray-300 bg-white text-black"
                />
              </TableHead>
            )}
            {columns.map((column, index) => (
              <TableHead
                key={index}
                className={`text-left bg-gray-100 ${column.width || ""}`}
              >
                {column.name}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {getPaginatedData().map((row) => (
            <TableRow key={row[rowId]} className="hover:bg-gray-100">
              {showSelectAll && (
                <TableCell className="p-2">
                  <input
                    type="checkbox"
                    checked={selectedRows.includes(row[rowId])}
                    onChange={() => handleCheckboxRowChange(row[rowId])}
                    className="h-4 w-4 rounded border-gray-300 bg-white text-black"
                  />
                </TableCell>
              )}
              {columns.map((column, colIndex) => (
                <TableCell
                  key={colIndex}
                  className={`text-left font-medium p-2 ${column.width || ""}`}
                >
                  {row[column.key] || "N/A"}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="mt-4 flex items-center justify-between bg-white text-black p-2 rounded-md shadow-md border-t border-gray-200">
        <span className="text-sm text-gray-500">
          {`${(pagination.current - 1) * pagination.pageSize + 1}–${Math.min(
            pagination.current * pagination.pageSize,
            pagination.total
          )} of ${pagination.total} items`}
        </span>

        <div className="flex items-center space-x-2">
          <button
            onClick={() =>
              handlePageChange(
                Math.max(pagination.current - 1, 1),
                pagination.pageSize
              )
            }
            disabled={pagination.current === 1}
            className="px-3 py-1 rounded-md bg-gray-200 text-black hover:bg-gray-300 disabled:bg-gray-200"
          >
            Previous
          </button>
          {Array.from(
            { length: Math.ceil(pagination.total / pagination.pageSize) },
            (_, i) => (
              <button
                key={i + 1}
                onClick={() => handlePageChange(i + 1, pagination.pageSize)}
                className={`px-3 py-1 rounded-md ${
                  pagination.current === i + 1
                    ? "bg-black text-white"
                    : "bg-gray-200 text-black hover:bg-gray-300"
                }`}
              >
                {i + 1}
              </button>
            )
          )}
          <button
            onClick={() =>
              handlePageChange(
                Math.min(
                  pagination.current + 1,
                  Math.ceil(pagination.total / pagination.pageSize)
                ),
                pagination.pageSize
              )
            }
            disabled={
              pagination.current ===
              Math.ceil(pagination.total / pagination.pageSize)
            }
            className="px-3 py-1 rounded-md bg-gray-200 text-black hover:bg-gray-300 disabled:bg-gray-200"
          >
            Next
          </button>
        </div>

        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-500">Items / Page</span>
          <select
            value={pagination.pageSize}
            onChange={(e) => handlePageChange(1, Number(e.target.value))}
            className="p-1 rounded-md bg-white text-black border border-gray-300"
          >
            {[10, 20, 50, 100].map((size) => (
              <option key={size} value={size} className="bg-white text-black">
                {size}
              </option>
            ))}
          </select>
        </div>
      </div>
    </Card>
  );
}
