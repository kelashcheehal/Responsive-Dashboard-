import React from "react";
import { cn } from "@/lib/utils";

export default function Card({ label, icon: Icon, amount, description }) {
  return (
    <CardContent>
      <section className="flex justify-between gap-2">
        <p className="text-sm">{label}</p>
        {Icon && <Icon className="h-4 w-4 text-gray-400" />}{" "}
      </section>

      <section className="flex-col gap-1">
        <h2 className="text-2xl font-semibold">{amount}</h2>
        <p className="text-xs text-gray-500">{description}</p>
      </section>
    </CardContent>
  );
}

export function CardContent(props) {
  return (
    <div
      {...props}
      className={cn(
        "flex w-full flex-col gap-3 rounded-xl border p-5 shadow",
        props.className
      )}
    />
  );
}
