"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, Shield } from "lucide-react";
import { ThemeToggle } from "../ui/ThemeToggle";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
];

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <nav className="sticky top-0 z-50 w-full border-b bg-white/80 dark:bg-zinc-950/80 border-gray-200 dark:border-zinc-800 shadow-sm backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">
            
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-9 h-9 bg-violet-600 rounded-xl">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <Link href="/" className="font-semibold text-2xl tracking-tight text-gray-900 dark:text-white">
                NIDS<span className="text-violet-600 dark:text-violet-500">AI</span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            
            <div className="flex items-center gap-4">
              <ThemeToggle />

              {/* Auth Buttons - Desktop */}
              <div className="hidden md:flex items-center gap-3">
                <Link href="/auth/signup">
                  <button className="px-5 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-zinc-900 rounded-lg transition-all cursor-pointer">
                    Sign Up
                  </button>
                </Link>
                <Link href="/auth/signin">
                  <button className="px-5 py-2 text-sm font-medium bg-violet-600 hover:bg-violet-700 text-white rounded-lg transition-all cursor-pointer">
                    Sign In
                  </button>
                </Link>
              </div>

              
              <button
                className="md:hidden p-2 text-gray-700 dark:text-gray-300 z-50 relative cursor-pointer"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Toggle Menu"
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      
      <div
        className={`fixed inset-0 z-40 bg-black/20 dark:bg-black/40 backdrop-blur-md transition-opacity duration-300 md:hidden ${
          isMobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsMobileMenuOpen(false)}
      />

      {/* Mobile Menu Drawer  */}
      <div
        className={`fixed top-0 right-0 bottom-0 z-40 w-70 sm:w-[320px] bg-white/90 dark:bg-zinc-950/90 backdrop-blur-xl border-l border-gray-200 dark:border-zinc-800 p-6 pt-20 shadow-2xl transition-transform duration-300 cubic-bezier(0.16, 1, 0.3, 1) md:hidden ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col space-y-5">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-lg font-medium py-1 text-gray-700 dark:text-gray-300 hover:text-violet-600 dark:hover:text-violet-400 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}

          <div className="pt-6 border-t border-gray-200 dark:border-zinc-800 flex flex-col gap-3">
            <Link href="/auth/signup" onClick={() => setIsMobileMenuOpen(false)}>
              <button className="w-full py-2.5 border border-gray-300 dark:border-zinc-700 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-zinc-900 transition-colors cursor-pointer">
                Sign Up
              </button>
            </Link>
            <Link href="/auth/signin" onClick={() => setIsMobileMenuOpen(false)}>
              <button className="w-full py-2.5 bg-violet-600 hover:bg-violet-700 text-white rounded-lg text-sm font-medium transition-colors cursor-pointer">
                Sign In
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}


//////////////////////////////////////////////////////////////

// "use client";

// import Link from "next/link";
// import { useState } from "react";
// import { Menu, X, Shield } from "lucide-react";
// import { ThemeToggle } from "../ui/ThemeToggle";

// const navLinks = [
//   { href: "/", label: "Home" },
//   { href: "/about", label: "About" },
// ];

// export default function Navbar() {
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

//   return (
//     <nav className="sticky top-0 z-50 w-full border-b bg-white dark:bg-zinc-950 border-gray-200 dark:border-zinc-800 shadow-sm">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6">
//         <div className="flex items-center justify-between h-16">
//           {/* Logo */}
//           <div className="flex items-center gap-3">
//             <div className="flex items-center justify-center w-9 h-9 bg-violet-600 rounded-xl">
//               <Shield className="w-5 h-5 text-white" />
//             </div>
//             <Link href="/" className="font-semibold text-2xl tracking-tight text-gray-900 dark:text-white">
//               NIDS<span className="text-violet-600 dark:text-violet-500">AI</span>
//             </Link>
//           </div>

//           {/* Desktop Navigation */}
//           <div className="hidden md:flex items-center gap-8">
//             {navLinks.map((link) => (
//               <Link
//                 key={link.href}
//                 href={link.href}
//                 className="text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
//               >
//                 {link.label}
//               </Link>
//             ))}
//           </div>

//           {/* Right Side */}
//           <div className="flex items-center gap-4">
//             <ThemeToggle />

//             {/* Auth Buttons - Desktop */}
//             <div className="hidden md:flex items-center gap-3">
//               <Link href="/auth/signup">
//                 <button className="px-5 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-zinc-900 rounded-lg transition-all">
//                   Sign Up
//                 </button>
//               </Link>
//               <Link href="/auth/signin">
//                 <button className="px-5 py-2 text-sm font-medium bg-violet-600 hover:bg-violet-700 text-white rounded-lg transition-all">
//                   Sign In
//                 </button>
//               </Link>
//             </div>

//             {/* Mobile Menu Button */}
//             <button
//               className="md:hidden p-2 text-gray-700 dark:text-gray-300"
//               onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
//             >
//               {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
//             </button>
//           </div>
//         </div>

//         {/* Mobile Menu */}
//         {isMobileMenuOpen && (
//           <div className="md:hidden border-t border-gray-200 dark:border-zinc-800 py-6 bg-white dark:bg-zinc-950">
//             <div className="flex flex-col space-y-4 px-4">
//               {navLinks.map((link) => (
//                 <Link
//                   key={link.href}
//                   href={link.href}
//                   className="text-lg py-2 text-gray-700 dark:text-gray-300"
//                   onClick={() => setIsMobileMenuOpen(false)}
//                 >
//                   {link.label}
//                 </Link>
//               ))}

//               <div className="pt-4 border-t border-gray-200 dark:border-zinc-800 flex flex-col gap-3">
//                 <Link href="/auth/signup" onClick={() => setIsMobileMenuOpen(false)}>
//                   <button className="w-full py-3 border border-gray-300 dark:border-zinc-700 rounded-lg text-gray-700 dark:text-gray-300">
//                     Sign Up
//                   </button>
//                 </Link>
//                 <Link href="/auth/signin" onClick={() => setIsMobileMenuOpen(false)}>
//                   <button className="w-full py-3 bg-violet-600 hover:bg-violet-700 text-white rounded-lg">
//                     Sign In
//                   </button>
//                 </Link>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </nav>
//   );
// }

//////////////////////////////////////////////////////////////

// "use client";

// import Link from "next/link";
// import { useState } from "react";
// import { Menu, X, Shield } from "lucide-react";
// import {ThemeToggle} from "../ui/ThemeToggle";

// const navLinks = [
//   { href: "/", label: "Home" },
//   { href: "/about", label: "About" },
// ];

// export default function Navbar() {
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

//   return (
//     <nav className="sticky top-0 z-50 w-full border-b bg-white dark:bg-zinc-950 border-gray-200 dark:border-zinc-800 shadow-sm">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6">
//         <div className="flex items-center justify-between h-16">
//           {/* Logo */}
//           <div className="flex items-center gap-3">
//             <div className="flex items-center justify-center w-9 h-9 bg-blue-600 rounded-xl">
//               <Shield className="w-5 h-5 text-white" />
//             </div>
//             <Link href="/" className="font-semibold text-2xl tracking-tight text-gray-900 dark:text-white">
//               NIDS<span className="text-blue-600 dark:text-blue-500">AI</span>
//             </Link>
//           </div>

//           {/* Desktop Navigation */}
//           <div className="hidden md:flex items-center gap-8">
//             {navLinks.map((link) => (
//               <Link
//                 key={link.href}
//                 href={link.href}
//                 className="text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
//               >
//                 {link.label}
//               </Link>
//             ))}
//           </div>

//           {/* Right Side */}
//           <div className="flex items-center gap-4">
//             <ThemeToggle />

//             {/* Auth Buttons - Desktop */}
//             <div className="hidden md:flex items-center gap-3">
//               <Link href="/auth/signup">
//                 <button className="px-5 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-zinc-900 rounded-lg transition-all">
//                   Sign Up
//                 </button>
//               </Link>
//               <Link href="/auth/signin">
//                 <button className="px-5 py-2 text-sm font-medium bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all">
//                   Sign In
//                 </button>
//               </Link>
//             </div>

//             {/* Mobile Menu Button */}
//             <button
//               className="md:hidden p-2 text-gray-700 dark:text-gray-300"
//               onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
//             >
//               {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
//             </button>
//           </div>
//         </div>

//         {/* Mobile Menu */}
//         {isMobileMenuOpen && (
//           <div className="md:hidden border-t border-gray-200 dark:border-zinc-800 py-6 bg-white dark:bg-zinc-950">
//             <div className="flex flex-col space-y-4 px-4">
//               {navLinks.map((link) => (
//                 <Link
//                   key={link.href}
//                   href={link.href}
//                   className="text-lg py-2 text-gray-700 dark:text-gray-300"
//                   onClick={() => setIsMobileMenuOpen(false)}
//                 >
//                   {link.label}
//                 </Link>
//               ))}

//               <div className="pt-4 border-t border-gray-200 dark:border-zinc-800 flex flex-col gap-3">
//                 <Link href="/auth/signup" onClick={() => setIsMobileMenuOpen(false)}>
//                   <button className="w-full py-3 border border-gray-300 dark:border-zinc-700 rounded-lg text-gray-700 dark:text-gray-300">
//                     Sign Up
//                   </button>
//                 </Link>
//                 <Link href="/auth/signin" onClick={() => setIsMobileMenuOpen(false)}>
//                   <button className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg">
//                     Sign In
//                   </button>
//                 </Link>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </nav>
//   );
// }



/////////////////////////////////////////////////////////////


// "use client";

// import Link from "next/link";
// import { useState } from "react";
// import { Menu, X, Shield } from "lucide-react";
// import { ThemeToggle } from "../ui/ThemeToggle";

// const navLinks = [
//   { href: "/", label: "Home" },
//   { href: "/about", label: "About" },
// ];

// export default function Navbar() {
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

//   return (
//     <nav className="sticky top-0 z-50 w-full border-b bg-white dark:bg-gray-950 border-gray-200 dark:border-gray-800">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6">
//         <div className="flex items-center justify-between h-16">
//           {/* Logo */}
//           <div className="flex items-center gap-3">
//             <div className="flex items-center justify-center w-9 h-9 bg-blue-600 rounded-xl">
//               <Shield className="w-5 h-5 text-white" />
//             </div>
//             <Link href="/" className="font-semibold text-2xl tracking-tight text-gray-900 dark:text-white">
//               NIDS<span className="text-blue-600">AI</span>
//             </Link>
//           </div>

//           {/* Desktop Navigation */}
//           <div className="hidden md:flex items-center gap-8">
//             {navLinks.map((link) => (
//               <Link
//                 key={link.href}
//                 href={link.href}
//                 className="text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
//               >
//                 {link.label}
//               </Link>
//             ))}
//           </div>

//           {/* Right Side: Theme + Auth Buttons + Mobile Menu */}
//           <div className="flex items-center gap-3">
//             {/* Theme Toggle */}
//             <ThemeToggle />

//             {/* Auth Buttons (Desktop) */}
//             <div className="hidden md:flex items-center gap-3">
//               <Link href="/auth/signup">
//                 <button className="px-5 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors">
//                   Sign Up
//                 </button>
//               </Link>
//               <Link href="/auth/signin">
//                 <button className="px-5 py-2 text-sm font-medium bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
//                   Sign In
//                 </button>
//               </Link>
//             </div>

//             {/* Mobile Menu Button */}
//             <button
//               className="md:hidden p-2 text-gray-700 dark:text-gray-300"
//               onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
//               aria-label="Toggle menu"
//             >
//               {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
//             </button>
//           </div>
//         </div>

//         {/* Mobile Menu */}
//         {isMobileMenuOpen && (
//           <div className="md:hidden border-t py-6 bg-white dark:bg-gray-950">
//             <div className="flex flex-col space-y-4 px-4">
//               {navLinks.map((link) => (
//                 <Link
//                   key={link.href}
//                   href={link.href}
//                   className="text-lg font-medium text-gray-700 dark:text-gray-300 py-2"
//                   onClick={() => setIsMobileMenuOpen(false)}
//                 >
//                   {link.label}
//                 </Link>
//               ))}

//               <div className="pt-4 border-t flex flex-col gap-3">
//                 <Link href="/auth/signup" onClick={() => setIsMobileMenuOpen(false)}>
//                   <button className="w-full py-3 text-center text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-700 rounded-lg">
//                     Sign Up
//                   </button>
//                 </Link>
//                 <Link href="/auth/signin" onClick={() => setIsMobileMenuOpen(false)}>
//                   <button className="w-full py-3 text-center bg-blue-600 hover:bg-blue-700 text-white rounded-lg">
//                     Sign In
//                   </button>
//                 </Link>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </nav>
//   );
// }