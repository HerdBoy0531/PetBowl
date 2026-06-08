import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-zinc-100 py-8">
      <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-zinc-400">
        <div>
          <p className="font-bold text-zinc-800">PetBowl</p>
          <p className="text-sm font-semibold text-black dark:text-white mb-1">E-mail : herdboy0531@gmail.com</p>
          <p className="mt-1 text-zinc-500">© {new Date().getFullYear()} PetBowl. All rights reserved.</p>
        </div>
        <div className="flex gap-6 text-zinc-500 font-medium">
          <Link href="/terms" className="hover:text-black hover:underline transition-all">이용약관</Link>
          <Link href="/privacy" className="hover:text-black hover:underline font-semibold transition-all">개인정보처리방침</Link>
        </div>
      </div>
    </footer>
  );
}