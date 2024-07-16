"use client";
import FeedCard from "@/components/FeedCard";
import { Key, useCallback } from "react";
import { BiHash, BiHomeCircle, BiUser } from "react-icons/bi";
import { BsBell, BsBookmark, BsEnvelope, BsTwitter } from "react-icons/bs";
import { Quicksand } from "next/font/google";
import {
  GoogleOAuthProvider,
  GoogleLogin,
  CredentialResponse,
} from "@react-oauth/google";
import { Toaster, toast } from "react-hot-toast";
import { graphqlClient } from "@/clients/api";
import { verifyUserGoogleTokenQuery } from "@/graphql/query/user";

interface TwitterSidebarButton {
  id: Key;
  title: String;
  icon: React.ReactNode;
}

const quicksand = Quicksand({ subsets: ["latin"] });

const sidebarMenuItems: TwitterSidebarButton[] = [
  {
    id: 1,
    title: "Home",
    icon: <BiHomeCircle />,
  },
  {
    id: 2,
    title: "Explore",
    icon: <BiHash />,
  },
  {
    id: 3,
    title: "Notifications",
    icon: <BsBell />,
  },
  {
    id: 4,
    title: "Messages",
    icon: <BsEnvelope />,
  },
  {
    id: 5,
    title: "Bookmarks",
    icon: <BsBookmark />,
  },
  {
    id: 6,
    title: "Profile",
    icon: <BiUser />,
  },
];

export default function Home() {
  const handleLoginWithGoogle = useCallback(
    async (cred: CredentialResponse) => {
      const googleToken = cred.credential;

      if (!googleToken) return toast.error(`Google token not found`);
      
      const { verifyGoogleToken } = await graphqlClient.request(
        verifyUserGoogleTokenQuery,
        { token: googleToken }
      );

      toast.success("Verified Success")
      console.log(verifyGoogleToken);
      if(verifyGoogleToken) window.localStorage.setItem("__twitter_token",verifyGoogleToken);
    },
    []
  );

  return (
    <GoogleOAuthProvider clientId="795096051681-695buqsmq9hmbdi1vgp6182042v28j8s.apps.googleusercontent.com">
      <div className={`${quicksand.className} overflow-x-hidden`}>
        <div className="grid grid-cols-12 h-screen w-screen px-56">
          <div className="col-span-3 pt-1 ml-[5rem] ">
            <div className="text-2xl hover:bg-gray-800 p-4 rounded-full h-fit w-fit  transition-all ">
              <BsTwitter />
            </div>
            <div className="mt-1 text-md font-semibold pr-4">
              <ul>
                {sidebarMenuItems.map((item) => (
                  <li
                    className="flex justify-start mt-2 items-center gap-4 hover:bg-gray-800 w-fit rounded-full px-4 py-2 cursor-pointer"
                    key={item.id}
                  >
                    <span className="text-2xl">{item.icon}</span>
                    <span>{item.title}</span>
                  </li>
                ))}
              </ul>
              <button className="bg-sky-600 text-lg px-4 py-2 rounded-full w-full mt-4 ">
                Tweet
              </button>
            </div>
          </div>
          <div className="col-span-6  border-r-2 border-l-2 h-screen overflow-scroll border-gray-500 border-opacity-50  hide-scrollbar ">
            <FeedCard />
            <FeedCard />
            <FeedCard />
            <FeedCard />
            <FeedCard />
            <FeedCard />
            <FeedCard />
            <FeedCard />
          </div>
          <div className="col-span-3 p-5">
            <div className="bg-slate-700 rounded-lg p-5">
              <h1 className="my-2 text-2xl">New to Twitter?</h1>
              <GoogleLogin onSuccess={handleLoginWithGoogle} />
            </div>
          </div>
        </div>
      </div>
      <Toaster />
    </GoogleOAuthProvider>
  );
}
