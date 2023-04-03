import { Routes, Route } from "react-router-dom";
import { path } from "./ultils/constain";
import {
  Header,
  Home,
  Login,
  Rental,
  HomePage,
  DetailPost,
} from "./containers/Public";
function App() {
  return (
    <div className=" w-screen bg-primary">
      <Routes>
        <Route path={path.HOME} element={<Home />}>
          <Route path="*" element={<HomePage />} />

          <Route path={path.LOGIN} element={<Login />} />
          <Route path={path.CHO_THUE_CAN_HO} element={<Rental />} />
          <Route path={path.CHO_THUE_PHONG_TRO} element={<Rental />} />
          <Route path={path.NHA_CHO_THUE} element={<Rental />} />
          <Route path={path.CHO_THUE_MAT_BANG} element={<Rental />} />
          <Route
            path={path.DETAIL_POST_TITLE_POSTID}
            element={<DetailPost />}
          />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
