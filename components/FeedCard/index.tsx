import Image from "next/image";
import React from "react";
import { AiOutlineHeart } from "react-icons/ai";
import { BiMessageRounded, BiUpload } from "react-icons/bi";
import { FaRetweet } from "react-icons/fa";

const FeedCard: React.FC = () => {
  return (
    <div className="border border-x-0 border-b-0 border-gray-600 p-5 hover:bg-slate-950 gap-2 transition-all cursor-pointer">
      <div className="grid grid-cols-12 gap-3">
        <div className="col-span-2">
            <Image className="rounded-full" src="https://avatars.githubusercontent.com/u/112997632?v=4" width={50} height={50} alt="userImg"/>
        </div>
        <div className="col-span-10">
            <h5>Pranjal Barnwal</h5>
            <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum repudiandae vel soluta molestias aliquam. Ea?
            </p>
            <div className="flex justify-between mt-3 text-xl items-center p-1 w-[90%]">
                <div>
                    <BiMessageRounded/>
                </div>
                <div>
                    <FaRetweet/>
                </div>
                <div>
                    <AiOutlineHeart/>
                </div>
                <div>
                    <BiUpload/>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default FeedCard;
