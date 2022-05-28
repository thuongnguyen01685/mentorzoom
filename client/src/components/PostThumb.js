import React from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const PostThumb = ({ posts, result }) => {
  const { theme } = useSelector((state) => state);

  // console.log(posts.map((post) => post)

  if (result === 0) return <h2 className="text-center">Không có bài viết.</h2>;
  // useEffect(() => {
  //   if()
  // },[]);
  // console.log(posts);

  return (
    <div className="post_thumb">
      {posts.map((item) => item.images.length === 0) ? (
        <>
          <div>Không có bài viết chứa hình ảnh</div>
        </>
      ) : (
        posts.map((post) => (
          <Link key={post._id} to={`/post/${post._id}`}>
            <div className="post_thumb_display">
              {post.images[0].url.match(/video/i) ? (
                <video
                  controls
                  src={post.images[0].url}
                  className=""
                  alt={post.images[0].url}
                  style={{ filter: theme ? "invert(1)" : "invert(0)" }}
                />
              ) : (
                <img
                  src={post.images[0].url}
                  className=""
                  alt={post.images[0].url}
                  style={{ filter: theme ? "invert(1)" : "invert(0)" }}
                />
              )}

              <div className="post_thumb_menu">
                <div className="menu d-flex">
                  <i className="far fa-heart">{post.likes.length}</i>
                  <i className="far fa-comment">{post.comments.length}</i>
                </div>
                <p className="content text-white">{post.content}</p>
              </div>
            </div>
          </Link>
        ))
      )}
    </div>
  );
};

export default PostThumb;
