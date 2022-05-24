import React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { deleteComment } from "../../../redux/actions/commentAction";
import { GLOBALTYPES } from "../../../redux/actions/globalTypes";

const CommentMenu = ({ post, comment, setOnEdit }) => {
  const dispatch = useDispatch();

  const { auth, socket } = useSelector((state) => state);

  const MenuItem = () => {
    const onEdit = () => {
      setOnEdit(true);
      dispatch({
        type: GLOBALTYPES.STATUSCMT,
        payload: { ...comment, onEditCmt: true },
      });
    };
    return (
      <>
        <div className="dropdown-item" onClick={onEdit}>
          <span className="material-icons ">create</span>
          Chỉnh sửa
        </div>
        <div className="dropdown-item" onClick={handleRemove}>
          <span className="material-icons">delete_outline</span> Xóa bình luận
        </div>
      </>
    );
  };
  const handleRemove = () => {
    if (post.user._id === auth.user._id || comment.user._id === auth.user._id) {
      dispatch(deleteComment({ post, auth, comment, socket }));
    }
  };
  return (
    <div className="menu">
      {(post.user._id === auth.user._id ||
        comment.user._id === auth.user._id) && (
        <div className="nav-item dropdown">
          <span className="material-icons" id="moreLink" data-toggle="dropdown">
            more_horiz
          </span>
          <div className="dropdown-menu" aria-labelledby="moreLink">
            {post.user._id === auth.user._id ? (
              comment.user._id === auth.user._id ? (
                MenuItem()
              ) : (
                <div className="dropdown-item" onClick={handleRemove}>
                  <span className="material-icons">delete_outline</span>
                  Xóa bình luận
                </div>
              )
            ) : (
              comment.user._id === auth.user._id && MenuItem()
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CommentMenu;
