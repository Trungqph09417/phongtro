import React, { useEffect } from "react";
import { Button, Items } from "../../components";
import { getPosts, getPostsPage } from "../../store/actions/postAction";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
const List = ({ categoryCode }) => {
  const dispath = useDispatch();
  const { posts, count } = useSelector((state) => state.post);

  const [searchParams] = useSearchParams();

  useEffect(() => {
    let param = [];
    for (let entry of searchParams.entries()) {
      param.push(entry);
    }
    let searchParamObject = {};

    param?.map((i) => {
      searchParamObject = { ...searchParamObject, [i[0]]: i[1] };
    });
    if (categoryCode) searchParamObject.categoryCode = categoryCode;

    dispath(getPostsPage(searchParamObject));
  }, [searchParams, categoryCode]);

  return (
    <>
      <div className="w-full border  p-2 bg-white shadow-md rounded-md">
        <div className="flex items-center justify-between my-3">
          <h4 className="text-xl font-semibold">Danh sách tin đăng</h4>
          <span>Cập nhật: 21:32 06/02/2023</span>
        </div>
        <div className="flex items-center gap-1">
          <span>Sắp xếp:</span>
          <Button bgColor="bg-gray-200" text="Mặc định" />
          <Button bgColor="bg-gray-200" text="Mới nhất" />
        </div>
        <div className="items">
          {/* <Items /> */}
          {posts?.length > 0 &&
            posts.map((item) => {
              return (
                <Items
                  key={item?.id}
                  address={item?.address}
                  attributes={item?.attributes}
                  description={JSON.parse(item?.description)}
                  images={JSON.parse(item?.images?.image)}
                  star={+item?.star}
                  title={item?.title}
                  user={item?.user}
                  id={item?.id}
                />
              );
            })}
        </div>
      </div>
      <div>{/* <Pagination length={posts?.length}  /> */}</div>
    </>
  );
};

export default List;
