// "use client";

// import RequestForm from "@organisms/RequestForm";
// import { useRouter } from "next/navigation";

// export default function NewRequestPage() {
//   const router = useRouter();

//   const handleCreateSuccess = () => {
//     // ✅ 새 글 작성 후 리스트로 이동
//     router.push("/request");
//   };

//   return (
//     <main className="min-h-screen pt-32 pb-20 bg-gray-50 dark:bg-gray-950">
//       <div className="container mx-auto px-4">
//         <RequestForm         
//         onSuccess={() => router.push(`/request/`)}
//         // ✅ 에러 해결: onCancel 프롭을 추가합니다.
//         onCancel={() => router.back()} 
//         />
//       </div>
//     </main>
//   );
// }


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