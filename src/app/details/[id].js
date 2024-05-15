import React from "react";
import DetailsCard from "@/components/DetailsCard";

export default function DetailsPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <br />
        <h1>This is the Details Page</h1>
        <DetailsCard />
      </div>
    </main>
  );
}
