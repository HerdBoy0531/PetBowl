"use client";

import { useRouter, useParams } from "next/navigation";
import RequestForm from "@/components/organisms/RequestForm";

export default function RequestUpdatePage() {
  const router = useRouter();
  const { id } = useParams();

  return (
    <div className="animate-fade-in max-w-3xl mx-auto w-full">
      <RequestForm 
        id={id as string}
        onSuccess={() => router.push(`/request/${id}`)}
        onCancel={() => router.back()} 
      />
    </div>
  );
}