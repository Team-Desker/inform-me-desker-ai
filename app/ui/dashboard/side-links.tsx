"use client";

import Link from "next/link";
import SideNavLinks from "./side-nav-links";

const SideLinks = () => {
  return (
    <div className="flex flex-col space-y-2">
      {SideNavLinks.map((link) => {
        return (
          <Link
            key={link.name}
            href={link.href}
            className="flex h-[45px] w-full items-center justify-center gap-2 rounded-md bg-brown-100 p-3 text-sm font-medium hover:bg-brown-800 hover:text-white"
          >
            <p className="block">{link.name}</p>
          </Link>
        );
      })}
    </div>
  );
};

export default SideLinks;
