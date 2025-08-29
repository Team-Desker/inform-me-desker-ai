import Link from "next/link";
import LogoImage from "./logo-image";

const SideBar = () => {
  return (
    <div className="flex h-full flex-col px-3 py-4">
      <Link
        className="mb-4 flex items-start justify-center rounded-md p-2"
        href="/"
      >
        <div className="w-24">
          <LogoImage />
        </div>
      </Link>
    </div>
  );
};

export default SideBar;
