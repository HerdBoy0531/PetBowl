// export default function TableHead({ children, className = "" }: { children: React.ReactNode; className?: string }) {
//   return (
//     <th className={`border-b-2 border-r-2 border-black bg-gray-100 dark:bg-gray-800 dark:border-gray-700 p-3 text-center font-bold ${className}`}>
//       {children}
//     </th>
//   );
// }

export default function TableHead({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    // 미니멀 오가닉 포인트: border-black 및 bg-gray-100 제거, 부드러운 텍스트 자간 조율
    <th className={`py-4 px-5 text-zinc-700 font-semibold text-xs md:text-sm tracking-tight ${className}`}>
      {children}
    </th>
  );
}