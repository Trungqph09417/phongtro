import React, { useEffect } from "react";
import Sitem from "./Sitem";
import { useDispatch, useSelector } from "react-redux";

import * as actions from "../store/actions";
const RelatedPost = () => {
  const { newPosts } = useSelector((state) => state.post);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(actions.getNewPosts());
  }, []);

  return (
    <div className="w-full bg-white rounded-md p-4">
      <h3 className="text-lg font-bold mb-4">Tin mới đăng</h3>
      <div className="w-full flex flex-col gap-2">
        {newPosts?.map((i, index) => {
          return (
            <Sitem
              key={i.id}
              title={i.title}
              price={i.attributes.price}
              createdAt={i.createdAt}
              img={JSON.parse(i?.images?.image)}
            />
          );
        })}
      </div>
    </div>
  );
};

export default RelatedPost;
