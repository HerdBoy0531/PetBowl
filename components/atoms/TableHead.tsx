export default function TableHead({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <th className={`py-4 px-5 text-zinc-700 font-semibold text-xs md:text-sm tracking-tight ${className}`}>
      {children}
    </th>
  );
}