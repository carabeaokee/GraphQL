"use client";
import { useQuery } from "@apollo/client";
import { useParams } from "next/navigation";
import { MEDIA_DETAILS_QUERY } from "@/graphql/queries";
import React from "react";
import DetailsCard from "@/components/DetailsCard";

export default function DetailsPage() {
  //   const { id } = useParams();

  const params = useParams<{ id: string }>();
  const id = Number(params.id);
  console.log(id);

  const { loading, error, data } = useQuery(MEDIA_DETAILS_QUERY, {
    variables: {
      mediaId: id,
    },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <br />
        <DetailsCard data={data} />
      </div>
    </main>
  );
}
