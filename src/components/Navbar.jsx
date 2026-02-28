"use client";

import Link from "next/link";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";

const Navbar = () => {
  const { data: session } = useSession();

  return (
    <nav className="navbar bg-white px-4 md:px-16 py-4 border-b border-gray/5">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            <li>
              <Link href="/find-jobs">Find Jobs</Link>
            </li>
            <li>
              <Link href="/browse-companies">Browse Companies</Link>
            </li>
            {session && (
              <li>
                <Link href="/my-applications">My Applications</Link>
              </li>
            )}
            {session?.user?.role === "admin" && (
              <li>
                <Link href="/admin">Admin</Link>
              </li>
            )}
          </ul>
        </div>
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/assets/logo.jpg"
            alt="QuickHire Logo"
            width={32}
            height={32}
            className="rounded-full"
          />
          <span className="text-xl font-bold text-[#202430]">QuickHire</span>
        </Link>
        <div className="hidden lg:flex ml-8 gap-6">
          <Link
            href="/find-jobs"
            className="text-[#7C8493] hover:text-primary font-medium"
          >
            Find Jobs
          </Link>
          <Link
            href="/browse-companies"
            className="text-[#7C8493] hover:text-primary font-medium"
          >
            Browse Companies
          </Link>
          {session && (
            <Link
              href="/my-applications"
              className="text-[#7C8493] hover:text-primary font-medium"
            >
              My Applications
            </Link>
          )}
          {session?.user?.role === "admin" && (
            <Link
              href="/admin"
              className="text-[#7C8493] hover:text-primary font-medium"
            >
              Admin
            </Link>
          )}
        </div>
      </div>
      <div className="navbar-end gap-2">
        {session ? (
          <div className="flex items-center gap-4">
            <div className="flex flex-col items-end">
              <span className="font-bold text-[#202430] text-sm hidden sm:inline">
                {session.user?.name || session.user?.email.split('@')[0]}
              </span>
              <span className="text-[10px] font-bold uppercase tracking-wider bg-primary/10 text-primary px-2 rounded-full hidden sm:inline">
                {session.user?.role}
              </span>
            </div>
            <div className="w-px h-8 bg-gray/10 hidden sm:block"></div>
            <button
              onClick={() => signOut()}
              className="btn btn-ghost text-primary font-bold"
            >
              Logout
            </button>
          </div>
        ) : (
          <>
            <Link href="/login" className="btn btn-ghost text-primary font-bold">
              Login
            </Link>
            <div className="w-px h-8 bg-gray/10 mx-1 hidden sm:block"></div>
            <Link
              href="/register"
              className="btn bg-primary text-white hover:bg-primary/90 font-bold px-6"
            >
              Sign Up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
