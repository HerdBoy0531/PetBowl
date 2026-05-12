export default function TableHead({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <th className={`border-b-2 border-r-2 border-black bg-gray-100 dark:bg-gray-800 dark:border-gray-700 p-3 text-center font-bold ${className}`}>
      {children}
    </th>
  );
}