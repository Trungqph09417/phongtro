import React, { useEffect, useState } from "react";
import icons from "../ultils/icons";
const Modal = ({ setisShowModal, content, name }) => {
  const { GrLinkPrevious } = icons;
  const [persent1, setpersent1] = useState(0);
  const [persent2, setpersent2] = useState(100);
  useEffect(() => {
    const activeTrackEl = document.getElementById("track-active");
    if (persent1 <= persent2) {
      activeTrackEl.style.left = `${persent1}%`;
      activeTrackEl.style.right = `${100 - +persent2}%`;
    } else {
      activeTrackEl.style.left = `${persent2}%`;
      activeTrackEl.style.right = `${100 - +persent1}%`;
    }
  }, [persent1, persent2]);
  const handleOnclickTrack = (e, value) => {
    e.stopPropagation();
    const stackEl = document.getElementById("track");
    const stackReact = stackEl.getBoundingClientRect();
    console.log("log value e ....", e.clientX);

    let percent = value
      ? value
      : Math.round(((e.clientX - stackReact.left) * 100) / stackReact.width, 0);
    if (Math.abs(percent - persent1) <= Math.abs(percent - persent2)) {
      setpersent1(percent);
    } else {
      setpersent2(percent);
    }
  };
  const convert100to15 = (percent) =>
    (Math.ceil(Math.round(percent * 1.5) / 5) * 5) / 10;

  return (
    <div
      onClick={() => {
        setisShowModal(false);
      }}
      className="fixed top-0 bottom-0 left-0 right-0 bg-overlay-70 z-10 flex justify-center items-center "
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
          setisShowModal(true);
        }}
        className="w-1/3 bg-white rounded-md"
      >
        <div className="h-[45px] px-4 flex items-center border-b border-gray-100">
          <span>
            <GrLinkPrevious
              className="cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                setisShowModal(false);
              }}
              size={24}
            />
          </span>
          <header className="w-[90%] text-center">Chọn tỉnh thành</header>
        </div>
        {(name === "category" || name === "province") && (
          <div className="p-4 flex flex-col ">
            {content?.map((item) => {
              return (
                <span
                  key={item.code}
                  className="flex py-2 gap-2 items-center border-b border-gray-200"
                >
                  <input
                    type="radio"
                    name={name}
                    id={item.code}
                    value={item.code}
                  />
                  <label htmlFor={item.code}>{item.value}</label>
                </span>
              );
            })}
          </div>
        )}

        {(name === "price" || name === "area") && (
          <div>
            <div className="p-32 py-20 ">
              <div className="flex flex-col justify-center items-center relative">
                <div className="z-30 absolute top-[-49px] font-semibold text-lg text-orange-600">
                  {`Từ ${
                    persent1 <= persent2
                      ? convert100to15(persent1)
                      : convert100to15(persent2)
                  } - ${
                    persent2 >= persent1
                      ? convert100to15(persent2)
                      : convert100to15(persent1)
                  } Triệu`}
                </div>
                <div
                  onClick={handleOnclickTrack}
                  id="track"
                  className="slider-track w-full cursor-pointer absolute top-0 bottom-0 h-[5px] bg-gray-300 rounded-full"
                ></div>
                <div
                  id="track-active"
                  onClick={handleOnclickTrack}
                  className="slider-track-active cursor-pointer absolute top-0 bottom-0 h-[8px] bg-orange-500 rounded-full"
                ></div>
                <input
                  type="range"
                  max="100"
                  min="0"
                  value={persent1}
                  step="1"
                  className="w-full appearance-none pointer-events-none absolute top-0 bottom-0 "
                  onChange={(e) => setpersent1(+e.target.value)}
                />
                <input
                  type="range"
                  max="100"
                  min="0"
                  step="1"
                  value={persent2}
                  className="w-full appearance-none pointer-events-none absolute top-0 bottom-0  "
                  onChange={(e) => setpersent2(+e.target.value)}
                />
                <div className="absolute top-6 left-0 right-0 flex items-center  justify-between ">
                  <span
                    className="cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleOnclickTrack(e, 0);
                    }}
                  >
                    0
                  </span>
                  <span
                    className="cursor-pointer"
                    // onClick={(e) => {
                    //   e.stopPropagation();
                    //   handleOnclickTrack(e, 100);
                    // }}
                  >
                    15 Triệu +
                  </span>
                </div>
              </div>
            </div>
            {/* <div className="flex gap-1 items-center flex-wrap w-full">
              {content?.map((item) => {
                return (
                  <span key={item?.code} className="px-4 bg-gray-400">
                    {item?.value}
                  </span>
                );
              })}
            </div> */}
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;
