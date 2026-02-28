"use client";

import Link from "next/link";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";

const Navbar = () => {
  const { data: session } = useSession();

  return (
    <nav className="navbar bg-base-100 px-4 md:px-16 py-4">
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
          <span className="text-xl font-bold text-dark-blue">QuickHire</span>
        </Link>
        <div className="hidden lg:flex ml-8 gap-6">
          <Link
            href="/find-jobs"
            className="text-gray hover:text-primary font-medium"
          >
            Find Jobs
          </Link>
          <Link
            href="/browse-companies"
            className="text-gray hover:text-primary font-medium"
          >
            Browse Companies
          </Link>
        </div>
      </div>
      <div className="navbar-end gap-2">
        {session ? (
          <div className="flex items-center gap-4">
            <span className="font-medium text-gray">
              Hi, {session.user?.name || session.user?.email}
            </span>
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
