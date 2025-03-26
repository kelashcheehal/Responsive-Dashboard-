"use client";

import { DataTable } from "@/components/dataTable";
import PageTitle from "@/components/pageTitle";
import React from "react";

const Users = () => {
  return (
    <div className="flex flex-col w-full gap-5 overflow-hidden">
      <PageTitle title="Users" />
      <div className="overflow-hidden">
        <DataTable columns={columns} data={data} />
      </div>
    </div>
  );
};

export default Users;

// Function to generate avatar URL
const generateAvatar = (name) =>
  `https://api.dicebear.com/9.x/lorelei/svg?seed=${encodeURIComponent(name)}`;

// Define table columns
export const columns = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      const name = row.getValue("name");
      return (
        <div className="flex items-center gap-3">
          <img
            className="w-8 h-8 rounded-full object-cover"
            src={generateAvatar(name)}
            alt={name}
          />
          <p className="text-sm font-medium text-gray-700">{name}</p>
        </div>
      );
    },
  },
  {
    accessorKey: "email",
    header: "Email",
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

// Optimized user data with unique entries
export const data = [
  {
    name: "John Doe",
    email: "john.doe@example.com",
    lastOrder: "March 10, 2024",
    method: "Credit Card",
  },
  {
    name: "Alice Smith",
    email: "alice.smith@example.com",
    lastOrder: "March 8, 2024",
    method: "PayPal",
  },
  {
    name: "Robert Johnson",
    email: "robert.j@example.com",
    lastOrder: "March 12, 2024",
    method: "Bank Transfer",
  },
  {
    name: "Emma Williams",
    email: "emma.w@example.com",
    lastOrder: "March 5, 2024",
    method: "Apple Pay",
  },
  {
    name: "Michael Brown",
    email: "michael.b@example.com",
    lastOrder: "March 15, 2024",
    method: "Google Pay",
  },
  {
    name: "Sophia Davis",
    email: "sophia.d@example.com",
    lastOrder: "March 11, 2024",
    method: "Credit Card",
  },
  {
    name: "Daniel Martinez",
    email: "daniel.m@example.com",
    lastOrder: "March 14, 2024",
    method: "PayPal",
  },
  {
    name: "Olivia Garcia",
    email: "olivia.g@example.com",
    lastOrder: "March 9, 2024",
    method: "Debit Card",
  },
];
