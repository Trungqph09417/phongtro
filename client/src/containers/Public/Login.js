import React, { useEffect, useState } from "react";
import { InputForms, Button } from "../../components";
import { Link } from "react-router-dom";
import { useLocation, useNavigate } from "react-router-dom";
import { apiRegister } from "../../services/auth";
import * as actions from "../../store/actions";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
const Login = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log("location>>>", location);

  const { isLoggedIn, msg, update } = useSelector((state) => state.auth);
  const [isRegister, setisRegister] = useState(location.state?.flag);
  const [invalidFields, setinvalidFields] = useState([]);
  const [payload, setpayload] = useState({
    name: "",
    password: "",
    phone: "",
  });

  useEffect(() => {
    setisRegister(location.state?.flag);
  }, [location.state?.flag]);

  useEffect(() => {
    isLoggedIn && navigate("/");
  }, [isLoggedIn]);

  useEffect(() => {
    msg && Swal.fire("Ops !", msg, "error");
  }, [msg, update]);

  const handleSubmit = async () => {
    // console.log(payload);

    let finalPayload = isRegister
      ? payload
      : {
          phone: payload.phone,
          password: payload.password,
        };
    let invalids = validate(finalPayload);
    if (invalids === 0)
      isRegister
        ? dispatch(actions.register(payload))
        : dispatch(actions.login(payload));
  };
  // console.log(invalidFields);

  const validate = (payload) => {
    // console.log(payload);
    let invalid = 0;
    let field = Object.entries(payload);
    console.log(field);
    field.forEach((item) => {
      if (item[1] === "") {
        setinvalidFields((prev) => [
          ...prev,
          {
            name: item[0],
            message: "Bạn không được bỏ trống trường này",
          },
        ]);
        invalid++;
      }
    });
    field.forEach((item) => {
      switch (item[0]) {
        case "password":
          if (item[1].length < 6) {
            setinvalidFields((prev) => [
              ...prev,
              {
                name: item[0],
                message: "Mật khẩu phải tối thiểu 6 kí tư",
              },
            ]);
            invalid++;
          }
          break;
        case "phone":
          if (!+item[1]) {
            setinvalidFields((prev) => [
              ...prev,
              {
                name: item[0],
                message: "Số điện thoại không hợp lệ",
              },
            ]);
            invalid++;
          }
          break;

        default:
          break;
      }
    });
    return invalid;
  };

  return (
    <div className="bg-white w-[600px] p-[30px] pb-[100px] rouded-md shadow-sm  ">
      <h3 className="font-semibold text-2xl mb-3">
        {isRegister ? "Đăng ký tài khoản" : "Đăng nhập"}{" "}
      </h3>
      <div className="w-full flex flex-col gap-3">
        {isRegister && (
          <InputForms
            setinvalidFields={setinvalidFields}
            invalidFields={invalidFields}
            label={"HỌ TÊN"}
            value={payload.name}
            setValue={setpayload}
            keyPayload={"name"}
          />
        )}
        <InputForms
          setinvalidFields={setinvalidFields}
          invalidFields={invalidFields}
          label={"SỐ ĐIỆN THOẠI"}
          value={payload.phone}
          setValue={setpayload}
          keyPayload={"phone"}
        />
        <InputForms
          setinvalidFields={setinvalidFields}
          invalidFields={invalidFields}
          label={"MẬT KHẨU"}
          value={payload.password}
          setValue={setpayload}
          keyPayload={"password"}
          type="password"
        />
        <Button
          text={isRegister ? "Đăng ký" : "Đăng nhập"}
          bgColor="bg-secondary1"
          textColor="text-white"
          fullWidth
          onClick={handleSubmit}
        />
      </div>
      <div className="flex items-center justify-between mt-[25px]">
        {isRegister ? (
          <small>
            Bạn đã có tài khoản?{" "}
            <span
              className="text-blue-500 hover:underline cursor-pointer"
              onClick={() => {
                setisRegister(false);
                setpayload({
                  name: "",
                  password: "",
                  phone: "",
                });
              }}
            >
              Đăng nhập
            </span>
          </small>
        ) : (
          <>
            <small className="text-[blue] hover:text-[orange] cursor-pointer">
              Bạn quên mật khẩu ?
            </small>
            <small
              onClick={() => {
                setisRegister(true);
                setpayload({
                  name: "",
                  password: "",
                  phone: "",
                });
              }}
              className="text-[blue] hover:text-[orange] cursor-pointer"
            >
              Tạo tài khoản mới
            </small>
          </>
        )}
      </div>
    </div>
  );
};

export default Login;
