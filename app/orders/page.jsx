"use client";

import { DataTable } from "@/components/dataTable";
import PageTitle from "@/components/pageTitle";
import { cn } from "@/lib/utils";
import React from "react";

const Orders = () => {
  return (
    <div className="flex flex-col w-full gap-5 overflow-hidden">
      <PageTitle title="Orders" />
      <div className="overflow-hidden">
        <DataTable columns={columns} data={data} />
      </div>
    </div>
  );
};

export default Orders;

// Function to handle status styling
const getStatusClass = (status) => {
  return cn("font-medium w-fit px-4 py-2 rounded-lg", {
    "bg-orange-200": status === "Pending",
    "bg-yellow-200": status === "Processing",
    "bg-green-200": status === "Completed",
    "bg-gray-200": status === "Cancelled",
    "bg-red-200": status === "Failed",
  });
};

// Define table columns
export const columns = [
  {
    accessorKey: "order",
    header: "Order ID",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <div className={getStatusClass(row.getValue("status"))}>
        {row.getValue("status")}
      </div>
    ),
  },
  {
    accessorKey: "lastOrder",
    header: "Last Order",
  },
  {
    accessorKey: "method",
    header: "Payment Method",
  },
];

// Optimized sample order data with unique entries
export const data = [
  {
    order: "1",
    status: "Completed",
    lastOrder: "March 10, 2024",
    method: "Credit Card",
  },
  {
    order: "2",
    status: "Pending",
    lastOrder: "March 8, 2024",
    method: "PayPal",
  },
  {
    order: "3",
    status: "Processing",
    lastOrder: "March 12, 2024",
    method: "Bank Transfer",
  },
  {
    order: "4",
    status: "Cancelled",
    lastOrder: "March 5, 2024",
    method: "Apple Pay",
  },
  {
    order: "5",
    status: "Completed",
    lastOrder: "March 15, 2024",
    method: "Google Pay",
  },
  {
    order: "6",
    status: "Processing",
    lastOrder: "March 11, 2024",
    method: "Credit Card",
  },
  {
    order: "7",
    status: "Completed",
    lastOrder: "March 14, 2024",
    method: "PayPal",
  },
  {
    order: "8",
    status: "Failed",
    lastOrder: "March 9, 2024",
    method: "Debit Card",
  },
  {
    order: "9",
    status: "Completed",
    lastOrder: "March 11, 2024",
    method: "Credit Card",
  },
  {
    order: "10",
    status: "Pending",
    lastOrder: "March 14, 2024",
    method: "PayPal",
  },
];
