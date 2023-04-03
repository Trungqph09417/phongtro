import React, { useState } from "react";
import SearchItem from "../../components/SearchItem";
import icons from "../../ultils/icons";
import { Modal } from "../../components";
import { useSelector } from "react-redux";

const {
  BiMap,
  TbReportMoney,
  AiOutlineBorderlessTable,
  IoIosArrowForward,
  SlCrop,
  BsHouseDoor,
  CiSearch,
} = icons;

const Search = () => {
  const [isShowModal, setisShowModal] = useState(false);
  const [name, setname] = useState("");
  const [content, setcontent] = useState([]);
  const { provinces, areas, prices, categories } = useSelector(
    (state) => state.app
  );

  const handleShowModal = (content, name) => {
    setcontent(content);
    setname(name);
    setisShowModal(true);
  };

  return (
    <>
      <div className="w-3/5 mt-3 p-[10px] bg-[#febb02] rounded-lg flex-col lg:flex-row flex items-center gap-4 justify-around ">
        <span
          onClick={() => handleShowModal(categories, "category")}
          className="cursor-pointer flex-1"
        >
          <SearchItem
            text="Phòng trọ, nhà trọ"
            fontWeight
            IconBefore={<BsHouseDoor />}
            IconAfter={<IoIosArrowForward />}
          />
        </span>
        <span
          onClick={() => handleShowModal(provinces, "province")}
          className="cursor-pointer flex-1"
        >
          <SearchItem
            IconBefore={<BiMap />}
            text="Toàn quốc"
            IconAfter={<IoIosArrowForward />}
          />
        </span>
        <span
          onClick={() => handleShowModal(prices, "price")}
          className="cursor-pointer flex-1"
        >
          <SearchItem
            IconBefore={<TbReportMoney />}
            text="Chọn giá"
            IconAfter={<IoIosArrowForward />}
          />
        </span>
        <span
          onClick={() => handleShowModal(areas, "area")}
          className="cursor-pointer flex-1"
        >
          <SearchItem
            IconBefore={<SlCrop />}
            text="Chọn diện tích"
            IconAfter={<IoIosArrowForward />}
          />
        </span>
        <button
          type="button"
          className="outline-none py-2 px-4 flex-1 bg-secondary1 rounded-lg flex items-center gap-1 text-white font-medium "
        >
          {<CiSearch />} Tìm kiếm
        </button>
      </div>
      {isShowModal && (
        <Modal content={content} name={name} setisShowModal={setisShowModal} />
      )}
    </>
  );
};

export default Search;
