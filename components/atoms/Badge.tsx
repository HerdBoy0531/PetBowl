interface BadgeProps {
  children: React.ReactNode;
  color?: "black" | "gray";
}

export default function Badge({ children, color = "black" }: BadgeProps) {
  const colors = {
    black: "bg-black text-white dark:bg-white dark:text-black",
    gray: "bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300",
  };

  return (
    <span className={`px-2 py-0.5 text-xs font-bold rounded ${colors[color]}`}>
      {children}
    </span>
  );
}