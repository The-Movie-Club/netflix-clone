//Components are like normal react components

//Imports
import useCurrentUser from "@/hooks/useCurrentUser";
import { signOut } from "next-auth/react";
import React from "react";

//Component props, export if necessary
interface AccountMenuProps {
  visible?: boolean;
}

//SEE Method for declaring the type for the component
const AccountMenu: React.FC<AccountMenuProps> = ({ visible }) => {
  //most components will need to know who the current user for global state management
  const { data } = useCurrentUser();
  if (!visible) {
    return null;
  }

  return (
    <div className="bg-black w-56 absolute top-14 right-0 py-5 flex-col border-2 border-gray-800 flex">
      <div
        className="
flex
flex-col
gap-3"
      >
        <div className="px-3 group/item flex flex-row gap-3 items-center w-full">
          <img
            src="/images/default-slate.png"
            className="w-8 rounded-md"
            alt="Default logo"
          />
          <p
            className="text-white
          text-sm
          group-hover/item:underline"
          >
            {data?.name}
          </p>
        </div>
        <hr className="bg-gray-600 border-0 h-px my-4" />
        <div
          className="
        px-3 text-center text-white
        text-sm
        hover:underline
        "
          onClick={() => signOut()}
        >
          Sign out of Netflix
        </div>
      </div>
    </div>
  );
};
export default AccountMenu;
