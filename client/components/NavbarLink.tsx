import { NavbarLinkProps } from "@/types";
import Link from "next/link";

const NavbarLink = ({
  id,
  reference,
  image,
  title,
  selected,
}: NavbarLinkProps) => {
  return (
    <Link key={id} href={reference} className={`w-[220px] h-[54px]`}>
      <div
        style={{ transition: "all ease-out .3s" }}
        className={`group w-full h-full flex items-center rounded-[15px] ${
          selected ? "shadow-sm hover:shadow-none" : "hover:shadow-sm"
        }  gap-[20px] pl-[15px]`}>
        <div
          style={{ transition: "all ease-out .3s" }}
          className={`size-[32px] rounded-[12px] flex justify-center items-center ${
            selected
              ? "bg-[#4FD1C5] group-hover:bg-[#FFFFFF]"
              : "bg-[#FFFFFF] group-hover:bg-[#4FD1C5]"
          } `}>
          {image(selected)}
        </div>
        <span className="capitalize font-bold text-[18px]">{title}</span>
      </div>
    </Link>
  );
};

export default NavbarLink;
