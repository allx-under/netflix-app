import { useRouter } from "next/router";
import React from "react";

interface NavbarItemProps {
  label: string;
  link?: string;
}

const NavbarItem: React.FC<NavbarItemProps> = ({ label, link }) => {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push(`${link}`)}
      className="text-white cursor-pointer hover:text-gray-300 transition"
    >
      {label}
    </div>
  );
};

export default NavbarItem;
