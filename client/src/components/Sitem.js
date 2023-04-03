import React from "react";
import moment from "moment";
import "moment/locale/vi";
const Sitem = ({ title, price, img, createdAt }) => {
  const formatTime = (createdAt) => {
    return moment(createdAt).fromNow();
  };
  return (
    <div className="w-full flex items-center gap-2 py-2 border-b border-gray-300">
      <img
        src={img[0]}
        alt="anh"
        className="w-[65px] h-[65px] object-cover flex-none rounded-sm"
      />
      <div className="flex-auto flex flex-col w-full gap-1 ">
        <h4 className="text-blue-600 text-[15px]">
          {" "}
          {`${title?.slice(0, 45)}...`}
        </h4>
        <div className="flex gap-2 items-center justify-between w-full">
          <span className="text-sm font-medium text-green-500">{price}</span>
          <span className="text-sm text-gray-300">{formatTime(createdAt)}</span>
        </div>
      </div>
    </div>
  );
};

export default Sitem;
