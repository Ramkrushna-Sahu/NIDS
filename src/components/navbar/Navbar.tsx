"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { Menu, X, Shield, User, LogOut, LayoutDashboard, House, BookOpenCheck } from "lucide-react";
import { ThemeToggle } from "../ui/ThemeToggle";
import { useSession, signOut } from "next-auth/react";

const navLinks = [
  { href: "/", label: "Home", icon: House },
  { href: "/about", label: "About", icon: BookOpenCheck },
];

const protectedLinks = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
];

export default function Navbar() {
  const { data: session, status } = useSession();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const isLoggedIn = status === "authenticated";

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowProfileDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <nav className="sticky top-0 z-50 w-full border-b bg-white/80 dark:bg-zinc-950/80 border-gray-200 dark:border-zinc-800 shadow-sm backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">
            
            {/* Logo */}
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
                  className="ext-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  {link.icon && <link.icon size={17} />}
                  {link.label}
                </Link>
              ))}
              {/* Protected Route - Dashboard */}
              {isLoggedIn && protectedLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  {link.icon && <link.icon size={17} />}
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Right Side */}
            <div className="flex items-center gap-4">
              <ThemeToggle />

              {/* Desktop Auth Section */}
              <div className="hidden md:flex items-center gap-3">
                {isLoggedIn && session?.user ? (
                  <div className="relative" ref={dropdownRef}>
                    <button
                      onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                      className="cursor-pointer flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors"
                    >
                      <div className="w-8 h-8 bg-violet-100 dark:bg-violet-900 rounded-full flex items-center justify-center">
                        <User className="w-5 h-5 text-violet-600 dark:text-violet-400" />
                      </div>
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300 max-w-35 truncate">
                        {session.user.name || session.user.email?.split("@")[0]}
                      </span>
                    </button>

                    {/* Profile Dropdown */}
                    {showProfileDropdown && (
                      <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-zinc-900 rounded-2xl shadow-xl border border-gray-200 dark:border-zinc-700 py-2 z-50">
                        <div className="px-4 py-3 border-b border-gray-100 dark:border-zinc-700">
                          <p className="font-medium text-gray-900 dark:text-white">
                            {session.user.name}
                          </p>
                          <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                            {session.user.email}
                          </p>
                        </div>

                        <Link
                          href="/profile"
                          className="cursor-pointer flex items-center gap-3 px-4 py-3 hover:bg-gray-100 dark:hover:bg-zinc-800 text-gray-700 dark:text-gray-300"
                          onClick={() => setShowProfileDropdown(false)}
                        >
                          <User size={18} />
                          View Profile
                        </Link>

                        <button
                          onClick={() => {
                            signOut({ callbackUrl: "/" });
                            setShowProfileDropdown(false);
                          }}
                          className="cursor-pointer w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 dark:hover:bg-red-950/50"
                        >
                          <LogOut size={18} />
                          Logout
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <>
                    <Link href="/sign-up">
                      <button className="cursor-pointer px-5 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-zinc-900 rounded-lg transition-all">
                        Sign Up
                      </button>
                    </Link>
                    <Link href="/sign-in">
                      <button className="cursor-pointer px-5 py-2 text-sm font-medium bg-violet-600 hover:bg-violet-700 text-white rounded-lg transition-all">
                        Sign In
                      </button>
                    </Link>
                  </>
                )}
              </div>

              {/* Mobile Menu Button */}
              <button
                className="md:hidden p-2 text-gray-700 dark:text-gray-300 cursor-pointer"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-black/50 dark:bg-black/70 backdrop-blur-md md:hidden" onClick={() => setIsMobileMenuOpen(false)}>
          <div
            className="fixed top-0 right-0 h-full w-80 bg-white dark:bg-zinc-900 shadow-2xl p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-end mb-8">
              <button onClick={() => setIsMobileMenuOpen(false)} className="cursor-pointer">
                <X size={28} />
              </button>
            </div>

            <div className="flex flex-col space-y-6">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-lg font-medium py-2 text-gray-700 dark:text-gray-300 cursor-pointer flex items-center gap-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.icon && <link.icon size={17} />}
                  {link.label}
                </Link>
              ))}

              {/* Protected Link in Mobile */}
              {isLoggedIn && protectedLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-lg font-medium py-2 text-gray-700 dark:text-gray-300 cursor-pointer flex items-center gap-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.icon && <link.icon size={20} />}
                  {link.label}
                </Link>
              ))}

              <div className="pt-6 border-t border-gray-400 dark:border-zinc-300">
                {isLoggedIn ? (
                  <div className="space-y-4">
                    <Link href="/profile" onClick={() => setIsMobileMenuOpen(false)}>
                      <button className="cursor-pointer w-full py-3 flex items-center justify-center gap-2 border-2 border-gray-600 dark:border-zinc-400 rounded-2xl text-gray-700 dark:text-gray-300">
                        <User size={20} />
                        View Profile
                      </button>
                    </Link>
                    <button
                      onClick={() => {
                        signOut({ callbackUrl: "/" });
                        setIsMobileMenuOpen(false);
                      }}
                      className="cursor-pointer w-full py-3 text-red-600 hover:bg-red-50 dark:hover:bg-red-950 rounded-2xl flex items-center justify-center gap-2 border-2 my-2"
                    >
                      <LogOut size={20} />
                      Logout
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col gap-3">
                    <Link href="/sign-up" onClick={() => setIsMobileMenuOpen(false)}>
                      <button className="cursor-pointer w-full py-3 border-2 border-gray-600 dark:border-zinc-700 rounded-xl dark:text-gray-300">Sign Up</button>
                    </Link>
                    <Link href="/sign-in" onClick={() => setIsMobileMenuOpen(false)}>
                      <button className="cursor-pointer w-full py-3 bg-violet-600 text-white rounded-xl">Sign In</button>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}




///////////////////////////////////////////////////////////////////////

// "use client";

// import Link from "next/link";
// import { useState } from "react";
// import { Menu, X, Shield, User, LogOut } from "lucide-react";
// import { ThemeToggle } from "../ui/ThemeToggle";
// import { useSession, signOut } from "next-auth/react";

// const navLinks = [
//   { href: "/", label: "Home" },
//   { href: "/about", label: "About" },
// ];

// export default function Navbar() {
//   const { data: session, status } = useSession();
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const [showProfileDropdown, setShowProfileDropdown] = useState(false);

//   const isLoggedIn = status === "authenticated";

//   return (
//     <>
//       <nav className="sticky top-0 z-50 w-full border-b bg-white/80 dark:bg-zinc-950/80 border-gray-200 dark:border-zinc-800 shadow-sm backdrop-blur-md">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6">
//           <div className="flex items-center justify-between h-16">
            
//             {/* Logo */}
//             <div className="flex items-center gap-3">
//               <div className="flex items-center justify-center w-9 h-9 bg-violet-600 rounded-xl">
//                 <Shield className="w-5 h-5 text-white" />
//               </div>
//               <Link href="/" className="font-semibold text-2xl tracking-tight text-gray-900 dark:text-white">
//                 NIDS<span className="text-violet-600 dark:text-violet-500">AI</span>
//               </Link>
//             </div>

//             {/* Desktop Navigation */}
//             <div className="hidden md:flex items-center gap-8">
//               {navLinks.map((link) => (
//                 <Link
//                   key={link.href}
//                   href={link.href}
//                   className="text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
//                 >
//                   {link.label}
//                 </Link>
//               ))}
//             </div>

//             {/* Right Side */}
//             <div className="flex items-center gap-4">
//               <ThemeToggle />

//               {/* Desktop Auth Section */}
//               <div className="hidden md:flex items-center gap-3">
//                 {isLoggedIn && session?.user ? (
//                   <div className="relative">
//                     <button
//                       onClick={() => setShowProfileDropdown(!showProfileDropdown)}
//                       className="cursor-pointer flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors"
//                     >
//                       <div className="w-8 h-8 bg-violet-100 dark:bg-violet-900 rounded-full flex items-center justify-center">
//                         <User className="w-5 h-5 text-violet-600 dark:text-violet-400" />
//                       </div>
//                       <span className="text-sm font-medium text-gray-700 dark:text-gray-300 max-w-35 truncate">
//                         {session.user.name || session.user.email?.split("@")[0]}
//                       </span>
//                     </button>

//                     {/* Profile Dropdown */}
//                     {showProfileDropdown && (
//                       <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-zinc-900 rounded-2xl shadow-xl border border-gray-200 dark:border-zinc-700 py-2 z-50">
//                         <div className="px-4 py-3 border-b border-gray-100 dark:border-zinc-700">
//                           <p className="font-medium text-gray-900 dark:text-white">
//                             {session.user.name}
//                           </p>
//                           <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
//                             {session.user.email}
//                           </p>
//                         </div>

//                         <Link
//                           href="/profile"
//                           className="cursor-pointer flex items-center gap-3 px-4 py-3 hover:bg-gray-100 dark:hover:bg-zinc-800 text-gray-700 dark:text-gray-300"
//                           onClick={() => setShowProfileDropdown(false)}
//                         >
//                           <User size={18} />
//                           View Profile
//                         </Link>

//                         <button
//                           onClick={() => {
//                             signOut({ callbackUrl: "/" });
//                             setShowProfileDropdown(false);
//                           }}
//                           className="cursor-pointer w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 dark:hover:bg-red-950/50"
//                         >
//                           <LogOut size={18} />
//                           Logout
//                         </button>
//                       </div>
//                     )}
//                   </div>
//                 ) : (
//                   <>
//                     <Link href="/sign-up">
//                       <button className="px-5 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-zinc-900 rounded-lg transition-all">
//                         Sign Up
//                       </button>
//                     </Link>
//                     <Link href="/sign-in">
//                       <button className="px-5 py-2 text-sm font-medium bg-violet-600 hover:bg-violet-700 text-white rounded-lg transition-all">
//                         Sign In
//                       </button>
//                     </Link>
//                   </>
//                 )}
//               </div>

//               {/* Mobile Menu Button */}
//               <button
//                 className="md:hidden p-2 text-gray-700 dark:text-gray-300"
//                 onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
//               >
//                 {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
//               </button>
//             </div>
//           </div>
//         </div>
//       </nav>

//       {/* Mobile Menu */}
//       {isMobileMenuOpen && (
//         <div className="fixed inset-0 z-40 bg-black/50 dark:bg-black/70 backdrop-blur-md md:hidden" onClick={() => setIsMobileMenuOpen(false)}>
//           <div
//             className="fixed top-0 right-0 h-full w-80 bg-white dark:bg-zinc-900 shadow-2xl p-6"
//             onClick={(e) => e.stopPropagation()}
//           >
//             <div className="flex justify-end mb-8">
//               <button onClick={() => setIsMobileMenuOpen(false)}>
//                 <X size={28} />
//               </button>
//             </div>

//             <div className="flex flex-col space-y-6">
//               {navLinks.map((link) => (
//                 <Link
//                   key={link.href}
//                   href={link.href}
//                   className="text-lg font-medium py-2 text-gray-700 dark:text-gray-300"
//                   onClick={() => setIsMobileMenuOpen(false)}
//                 >
//                   {link.label}
//                 </Link>
//               ))}

//               <div className="pt-6 border-t border-gray-200 dark:border-zinc-700">
//                 {isLoggedIn ? (
//                   <div className="space-y-3">
//                     <Link href="/profile" onClick={() => setIsMobileMenuOpen(false)}>
//                       <button className="w-full py-3 flex items-center justify-center gap-2 border-2 border-gray-300 dark:border-zinc-700  dark:text-gray-300 rounded-xl">
//                         <User size={20} />
//                         View Profile
//                       </button>
//                     </Link>
//                     <button
//                       onClick={() => signOut({ callbackUrl: "/" })}
//                       className="w-full my-2 py-3 text-red-600 hover:bg-red-50 dark:hover:bg-red-950 rounded-xl flex items-center justify-center gap-2 border-2"
//                     >
//                       <LogOut size={20} />
//                       Logout
//                     </button>
//                   </div>
//                 ) : (
//                   <div className="flex flex-col gap-3">
//                     <Link href="/sign-up" onClick={() => setIsMobileMenuOpen(false)}>
//                       <button className="w-full py-3 border border-gray-300 dark:border-zinc-700 rounded-xl">Sign Up</button>
//                     </Link>
//                     <Link href="/sign-in" onClick={() => setIsMobileMenuOpen(false)}>
//                       <button className="w-full py-3 bg-violet-600 text-white rounded-xl">Sign In</button>
//                     </Link>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }



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