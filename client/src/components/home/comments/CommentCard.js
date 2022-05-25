import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Avatar from "../../Avatar";
import moment from "moment";
import LikeButton from "../../LikeButton";
import { useSelector } from "react-redux";
import CommentMenu from "./CommentMenu";
import {
  likeComment,
  unLikeComment,
  updateComment,
} from "../../../redux/actions/commentAction";
import InputComment from "../InputComment";
import { fileShow, imageShow, videoShow } from "../../../utils/mediaShow";
import Icons from "../../Icons";
import { GLOBALTYPES } from "../../../redux/actions/globalTypes";

const CommentCard = ({ children, comment, post, commentId }) => {
  const { auth, socket, theme, statusCmt, alert } = useSelector(
    (state) => state
  );
  const dispatch = useDispatch();

  const [content, setContent] = useState("");
  const [readMore, setReadMore] = useState(false);

  const [isLike, setIsLike] = useState(false);
  const [onEdit, setOnEdit] = useState(false);
  const [loadLike, setLoadLike] = useState(false);
  const [files, setFiles] = useState([]);

  const [onReply, setOnReply] = useState(false);

  useEffect(() => {
    setContent(comment.content);
    setIsLike(false);
    setOnReply(false);
    if (comment.likes.find((like) => like._id === auth.user._id)) {
      setIsLike(true);
    }
  }, [comment, auth.user._id]);
  const styleCard = {
    opacity: comment._id ? 1 : 0.5,
    pointerEvents: comment._id ? "inherit" : "none",
  };
  const handleLike = async () => {
    if (loadLike) return;
    setIsLike(true);
    setLoadLike(true);
    await dispatch(likeComment({ comment, post, auth, socket }));
    setLoadLike(false);
  };
  const handleUnLike = async () => {
    if (loadLike) return;
    setIsLike(false);
    setLoadLike(true);
    await dispatch(unLikeComment({ comment, post, auth, socket }));
    setLoadLike(false);
  };

  const handleUpdate = (e) => {
    e.preventDefault();

    if (comment.content !== content || comment.files !== files) {
      dispatch(
        updateComment({ comment, post, content, files, auth, statusCmt })
      );
      setOnEdit(false);
    } else {
      setOnEdit(false);
    }
  };
  const handleCancel = () => {
    setOnEdit(false);
    setContent(comment.content);
  };

  const handleReply = () => {
    if (onReply) return setOnReply(false);
    setOnReply({ ...comment, commentId });
  };

  const handleChangeFiles = (e) => {
    const raz = [...e.target.files];
    let err = "";
    let newFiles = [];

    raz.forEach((file) => {
      if (!file) return (err = "File does not exits.");
      if (file.size > 1024 * 1024 * 100) {
        return (err = "The image largest is 100mb.");
      }
      return newFiles.push(file);
    });

    if (err) dispatch({ type: GLOBALTYPES.ALERT, payload: { error: err } });
    setFiles([...files, ...newFiles]);
  };
  const deleteFiles = (index) => {
    const newArr = [...files];
    newArr.splice(index, 1);
    setFiles(newArr);
  };

  useEffect(() => {
    if (statusCmt.onEditCmt) {
      setFiles(statusCmt.files);
      setContent(statusCmt.content);
    }
  }, [statusCmt]);

  return (
    <div className="comment_card mt-2" style={styleCard}>
      <Link to={`/profile/${comment.user._id}`} className="d-flex text-dark">
        <Avatar src={comment.user.avatar} size="small-avatar" />
        <h6 className="mx-1">{comment.user.fullname}</h6>
      </Link>
      <div className="comment_content">
        <div
          className="flex-fill"
          style={{
            filter: theme ? "invert(1)" : "invert(0)",
            color: theme ? "white" : "#111",
          }}>
          {onEdit ? (
            <>
              <div
                className="show_media"
                style={{ display: files.length > 0 ? "grid" : "none" }}>
                {files.map((item, index) => (
                  <div key={index} id="file_media">
                    {item.url ? (
                      <>
                        {item.url.match(/video/i)
                          ? videoShow(item.url, theme)
                          : item.url.match(/image/i)
                          ? imageShow(item.url, theme)
                          : fileShow(files.url, theme)}
                      </>
                    ) : (
                      <>
                        {item.type.match(/video/i)
                          ? videoShow(URL.createObjectURL(item), theme)
                          : item.type.match(/image/i)
                          ? imageShow(URL.createObjectURL(item), theme)
                          : fileShow(files.url, theme)}
                      </>
                    )}
                    <span onClick={() => deleteFiles(index)}>&times;</span>
                  </div>
                ))}
              </div>
              <form
                className="card-footer comment_input"
                onSubmit={handleUpdate}>
                {children}
                <input
                  type="text"
                  placeholder="Nhập bình luận..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  style={{
                    filter: theme ? "invert(1)" : "invert(0)",
                    color: theme ? "white" : "#111",
                    background: theme ? "rgba(0,0,0,.03)" : "",
                  }}
                />
                <Icons
                  setContent={setContent}
                  content={content}
                  theme={theme}
                />
                <div className="file_upload">
                  <i className="fas fa-file-alt text-primary" />
                  <input
                    type="file"
                    name="file"
                    id="file"
                    multiple
                    accept="image/*,video/*,.xlsx,.xls,.doc, .docx,.ppt, .pptx,.txt,.pdf"
                    onChange={handleChangeFiles}
                  />
                </div>
                <button
                  type="submit"
                  className="postBtn btn btn-info"
                  disabled={content !== "" ? false : true}>
                  Đăng
                </button>
              </form>
            </>
          ) : (
            <div>
              {comment.tag && comment.tag._id !== comment.user._id && (
                <Link to={`/profile/${comment.tag._id}`} className="mr-1">
                  @{comment.tag.fullname}
                </Link>
              )}
              <span>
                {content.length < 100
                  ? content
                  : readMore
                  ? content + " "
                  : content.slice(0, 100) + "...."}
              </span>
              <div style={{ display: "flex", justifyContent: "flex-start" }}>
                {comment.files.map((item, index) => (
                  <div
                    key={index}
                    style={{
                      margin: "10px",
                      filter: theme ? "invert(1)" : "invert(0)",
                      color: theme ? "white" : "#111",
                      background: theme ? "rgba(0,0,0,.03)" : "",
                    }}>
                    {item.url.match(/video/i)
                      ? videoShow(item.url, theme)
                      : item.url.match(/image/i)
                      ? imageShow(item.url, theme)
                      : fileShow(item.url, theme)}
                  </div>
                ))}
              </div>
              {content.length > 100 && (
                <span
                  className="readMore text-info"
                  style={{ cursor: "pointer" }}
                  onClick={() => setReadMore(!readMore)}>
                  {readMore ? "Ẩn bớt" : "Xem thêm"}
                </span>
              )}
            </div>
          )}

          <div style={{ cursor: "pointer" }}>
            <small className="text-muted mr-3">
              {moment(comment.createdAt).fromNow()}
            </small>

            {onEdit ? (
              <>
                {/* <button
                  className="font-weight-bold mr-3"
                  disabled={content.length !== 0 ? false : true}
                  onClick={handleUpdate}
                  style={{ border: "none", outline: "none" }}>
                  Chỉnh sửa
                </button> */}
                <button
                  className="font-weight-bold mr-3"
                  onClick={handleCancel}
                  style={{ border: "none", outline: "none" }}>
                  Đóng
                </button>
              </>
            ) : (
              <>
                <small className="font-weight-bold ml-2 mr-3">
                  {comment.likes.length} Likes
                </small>
                <small className="font-weight-bold mr-3" onClick={handleReply}>
                  {onReply ? "Đóng" : "Phản hồi"}
                </small>
              </>
            )}
          </div>
        </div>
        <div
          className="d-flex align-items-center mx-2"
          style={{ cursor: "pointer" }}>
          <CommentMenu post={post} comment={comment} setOnEdit={setOnEdit} />
          <LikeButton
            isLike={isLike}
            handleLike={handleLike}
            handleUnLike={handleUnLike}
          />
        </div>
      </div>
      {onReply && (
        <InputComment post={post} onReply={onReply} setOnReply={setOnReply}>
          <Link to={`/profile/${onReply.user._id}`} className="mr-1">
            @{onReply.user.fullname}
          </Link>
        </InputComment>
      )}
      {children}
    </div>
  );
};

export default CommentCard;
