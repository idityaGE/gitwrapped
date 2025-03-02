import { formatNumber } from "../../../utils/calc";
import { StarsIcon } from "lucide-react";
import React from "react";
import images from '../../../images'

const Stars = ({ classname, stars }: { classname: string; stars: number }) => {
  return (
    <div
      className={`${classname} flex items-start flex-col gap-3 relative rounded-3xl overflow-hidden p-5  bg-black/90  z-[90]  group cursor-pointer`}
    >
      {/* <HalfCircleGradient  /> */}
      <img
        src={images.assets.grain}
        alt=""
        width={500}
        height={500}
        className="size-full object-cover absolute inset-0 -z-10 rounded-2xl opacity-70 group-hover:opacity-90"
      />
      <div className="absolute top-5 left-5">
        <StarsIcon className="size-14  " />
        <p className=" font-modernbold text-lg ">Stars Earned</p>
      </div>
      <p className="font-modernbold max-lg:text-6xl text-7xl absolute bottom-5 right-5">
        {formatNumber(stars)}
      </p>
    </div>
  );
};

export default Stars;
