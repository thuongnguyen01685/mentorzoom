import React from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import Posts from "../components/home/Posts";
import RightSidebar from "../components/home/RightSidebar";
import Status from "../components/home/Status";
import LoadIcon from "../images/loading.gif";

let scroll = 0;

const Home = () => {
  const { homePost, theme } = useSelector((state) => state);
  window.addEventListener("scroll", () => {
    if (window.location.pathname === "/") {
      scroll = window.pageXOffset;
      return scroll;
    }
  });
  useEffect(() => {
    setTimeout(() => {
      window.scrollTo({ top: scroll, behavior: "smooth" });
    }, 100);
  }, []);
  return (
    <div className="home row mx-0">
      <div
        className="col-md-2 "
        style={{
          filter: `${theme ? "invert(1)" : "invert(0)"}`,
        }}>
        <div
          className="ns-xjvxg-e-3 title-line1 text-center mt-2"
          title="Aura"
          x-ns-xjvxg-e={3}
          x-overflow-forbidden="xy">
          <a
            className="ns-op93l-e-11"
            data-asoch-targets="ad0,ochTitle"
            dir="auto"
            href="https://aura.vn"
            target="_top"
            x-ns-op93l-e={11}
            x-score={2}>
            Công ty Aura Capital
            <img
              src="https://aura.vn/images/aura/aurahome.png"
              alt="https://aura.vn/images/aura/aurahome.png"
              style={{
                width: "100%",
                borderRadius: "20px",
                marginTop: "10px",
                textAlign: "center",
              }}
            />
          </a>
        </div>
      </div>
      <div className="col-md-6">
        <Status />
        {homePost.loading ? (
          <img src={LoadIcon} alt="loading" className="d-block mx-auto" />
        ) : homePost.result === 0 && homePost.posts.length === 0 ? (
          <h2 className="text-center">No Post</h2>
        ) : (
          <Posts />
        )}
      </div>
      <div className="col-md-4" style={{ padding: "0 50px" }}>
        <RightSidebar />
      </div>
    </div>
  );
};

export default Home;
