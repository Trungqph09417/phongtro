import React, { useCallback, useEffect, useRef } from "react";
import logo from "../../assets/logo.png";
import { Button } from "../../components";
import icons from "../../ultils/icons";
import { useNavigate, Link, useSearchParams } from "react-router-dom";
import { path } from "../../ultils/constain";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../../store/actions";
const { AiOutlinePlusCircle } = icons;

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const listRef = useRef();

  const { isLoggedIn } = useSelector((state) => state.auth);
  const goLogin = useCallback((flag) => {
    navigate(path.LOGIN, { state: { flag } });
  }, []);
  useEffect(() => {
    listRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [searchParams.get("page")]);

  return (
    <div ref={listRef} className="w-3/5">
      <div className="max-w-1100 flex items-center justify-between ">
        <Link to={"/"}>
          <img
            src={logo}
            alt=""
            className="w-[240px] h-[70px] object-contain"
          />
        </Link>
        <div className="flex items-center gap-1">
          {!isLoggedIn && (
            <>
              <small>phongtro123 xin chào !</small>
              <Button
                text={"Đăng nhập"}
                textColor="text-white"
                bgColor="bg-[#3961fb]"
                onClick={() => goLogin(false)}
              />
              <Button
                text={"Đăng ký"}
                textColor="text-white"
                bgColor="bg-[#3961fb]"
                onClick={() => goLogin(true)}
              />
            </>
          )}
          {isLoggedIn && (
            <>
              <small>Tên !</small>

              <Button
                text={"Đăng xuất"}
                textColor="text-white"
                bgColor="bg-red-700"
                onClick={() => dispatch(actions.logout())}
              />
            </>
          )}

          <Button
            text={"Đăng tin mới"}
            textColor="text-white"
            bgColor="bg-secondary2"
            IcBsPlus={AiOutlinePlusCircle}
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
