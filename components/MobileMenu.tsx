import Link from "next/link";
import React from "react";

interface MobileMenuProps {
  visible?: boolean;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ visible }) => {
  if (!visible) {
    return null;
  }
  return (
    <div className="bg-black w-56 absolute top-8 left-0 py-5 flex-col border-2 border-gray-800 flex">
      <div className="flex flex-col gap-4">
        <Link
          href={"/"}
          className="px-3 text-center text-white hover:underline"
        >
          Home
        </Link>
        <Link
          href={"/"}
          className="px-3 text-center text-white hover:underline"
        >
          Series
        </Link>
        <Link
          href={"/"}
          className="px-3 text-center text-white hover:underline"
        >
          Films
        </Link>
        <Link
          href={"/"}
          className="px-3 text-center text-white hover:underline"
        >
          New & Popular
        </Link>
        <Link
          href={"/my-list"}
          className="px-3 text-center text-white hover:underline"
        >
          My list
        </Link>
        <Link
          href={"/"}
          className="px-3 text-center text-white hover:underline"
        >
          Browse by Languages
        </Link>
      </div>
    </div>
  );
};

export default MobileMenu;
