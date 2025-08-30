import Link from "next/link";

const SideLinks = ({ user_id }: { user_id: number }) => {
  const NaVLink = [
    { name: "수신함", href: `/dashboard/${user_id}/invoices` },
    { name: "AI", href: `/dashboard/${user_id}/chatbot` },
  ];
  return (
    <div className="flex flex-col space-y-2">
      {NaVLink.map((link) => {
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
