// export default function Footer() {
//   const currentYear = new Date().getFullYear();

//   return (
//     <footer className="w-full py-12 border-t bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 transition-colors">
//       <div className="max-w-6xl mx-auto px-6 text-center">
//         {/* 이메일 정보 */}
//         <div className="mb-6">
//           <p className="text-sm font-semibold text-black dark:text-white mb-1">
//             E-mail : herdboy0531@gmail.com
//           </p>
//         </div>

//         {/* 저작권 문구 (와이어프레임과 동일) */}
//         <p className="text-xs tracking-widest text-gray-500 dark:text-gray-400 font-medium uppercase">
//           COPYRIGHT {currentYear} BY PETBOWL ALL RIGHTS RESERVED.
//         </p>
//       </div>
//     </footer>
//   );
// }

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
          {/* <a href="#" className="hover:text-black transition-colors">이용약관</a>
          <a href="#" className="hover:text-black transition-colors">개인정보처리방침</a> */}
        </div>
      </div>
    </footer>
  );
}