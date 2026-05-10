interface NutrientArrowProps {
  isOpen: boolean;
}

export default function NutrientArrow({ isOpen }: NutrientArrowProps) {
  return (
    <span
      className={`transform transition-transform duration-300 ${
        isOpen ? "rotate-180" : "rotate-0"
      } text-xl font-bold dark:text-white`}
    >
      ▽
    </span>
  );
}