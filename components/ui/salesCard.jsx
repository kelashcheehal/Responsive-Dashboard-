import React from "react";

export default function SalesCard({ name, email, saleAmount }) {
  return (
    <div className="flex flex-wrap justify-between gap-3">
      <section className="flex justify-between gap-3">
        <div className="h-12 w-12 rounded-full bg-gray-100 p-1">
          <img
            width={200}
            height={200}
            src={`https://api.dicebear.com/9.x/lorelei/svg?seed=${name}`}
            alt="avatar"
          />
        </div>

        <div className="text-sm">
          <p>{name}</p>
          <div className="text-ellipsis overflow-hidden whitespace-nowrap w-[120px] sm:w-auto text-gray-400 ">
            {email}
          </div>
        </div>
      </section>
      <p>{saleAmount}</p>
    </div>
  );
}
