"use client";

import RequestForm from "@/components/organisms/RequestForm";
import { useRouter } from "next/navigation";

export default function NewRequestPage() {
  const router = useRouter();

  return (
    <div className="animate-fade-in max-w-3xl mx-auto w-full">
      <RequestForm      
        onSuccess={() => router.push(`/request`)}
        onCancel={() => router.back()} 
      />
    </div>
  );
}