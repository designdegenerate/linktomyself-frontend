import "./style.scss";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchPage } from "../../store/page/actions";
import { selectPage } from "../../store/page/selectors";
import Sidebar from "./components/Sidebar";
import Content from "./components/content";

export default function Page() {
  const dispatch = useDispatch();
  const params = useParams();
  const getPage = useSelector(selectPage);

  useEffect(() => {
    dispatch(fetchPage(params.username));
  }, [dispatch, params.username]);
  return !getPage ? (
    <div className="loading-screen">
      <p>loading...</p>
    </div>
  ) : (
    <main className="page">
      <Sidebar/>
      <Content/>
    </main>
  );
}
