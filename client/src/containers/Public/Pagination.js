import React, { useEffect, useState } from "react";

import { useSelector } from "react-redux";
import { PageNumber } from "../../components";
import icons from "../../ultils/icons";
import { useSearchParams } from "react-router-dom";
const { GrLinkNext, GrLinkPrevious } = icons;

const Pagination = () => {
  const { count, posts } = useSelector((state) => state.post);

  const [arrPage, setarrayPage] = useState([]);
  const [currentPage, setcurrentPage] = useState(1);
  const [isHideEnd, setisHideEnd] = useState(false);
  const [isHideStart, setisHideStart] = useState(false);

  const [searchParams] = useSearchParams();
  useEffect(() => {
    let page = searchParams.get("page");
    page && +page !== currentPage && setcurrentPage(+page);
    !page && setcurrentPage(1);
  }, [searchParams]);

  useEffect(() => {
    const maxPage = Math.ceil(count / process.env.REACT_APP_LIMIT_POSTS);

    let end = currentPage + 1 > maxPage ? maxPage : currentPage + 1;
    let start = currentPage - 1 <= 0 ? 1 : currentPage - 1;
    let temp = [];
    for (let i = start; i <= end; i++) temp.push(i);
    setarrayPage(temp);
    if (currentPage >= maxPage - 1) {
      setisHideEnd(true);
    } else {
      setisHideEnd(false);
    }
    if (currentPage <= 2) {
      setisHideStart(true);
    } else {
      setisHideStart(false);
    }
  }, [count, posts, currentPage]);

  return (
    <div className="flex gap-2 justify-center mt-[20px] mb-[20px] cursor-pointer">
      {!isHideStart && (
        <PageNumber
          icon={<GrLinkPrevious />}
          setcurrentPage={setcurrentPage}
          text={1}
        />
      )}
      {!isHideStart && <PageNumber text={"...."} />}
      {arrPage.length > 0 &&
        arrPage.map((i, index) => {
          return (
            <PageNumber
              key={i}
              text={i}
              setcurrentPage={setcurrentPage}
              currentPage={currentPage}
            />
          );
        })}
      {!isHideEnd && <PageNumber text={"..."} />}
      {!isHideEnd && (
        <PageNumber
          icon={<GrLinkNext />}
          setcurrentPage={setcurrentPage}
          text={Math.floor(count / posts.length)}
        />
      )}
    </div>
  );
};

export default Pagination;
