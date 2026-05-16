// "use client";

// import { useRouter, useParams } from "next/navigation";
// import RequestForm from "@organisms/RequestForm";

// export default function RequestUpdatePage() {
//   const router = useRouter();
//   const { id } = useParams();

//   return (
//     <main className="min-h-screen pt-32 pb-20 bg-gray-50 dark:bg-gray-950">
//       <RequestForm 
//         id={id as string}
//         onSuccess={() => router.push(`/request/${id}`)}
//         // ✅ 에러 해결: onCancel 프롭을 추가합니다.
//         onCancel={() => router.back()} 
//       />
//     </main>
//   );
// }


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