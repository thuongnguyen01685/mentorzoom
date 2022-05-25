import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { createComment } from "../../redux/actions/commentAction";
import { GLOBALTYPES } from "../../redux/actions/globalTypes";
import { imageUpload } from "../../utils/imageUpload";
import { fileShow, imageShow, videoShow } from "../../utils/mediaShow";
import Icons from "../Icons";

const InputComment = ({ children, post, onReply, setOnReply }) => {
  const [content, setContent] = useState("");
  const { auth, socket, theme } = useSelector((state) => state);
  const [media, setMedia] = useState([]);
  const [loadMedia, setLoadMedia] = useState(false);

  const dispatch = useDispatch();
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });
    if (!content.trim()) {
      if (setOnReply) return setOnReply(false);
      return;
    }

    setContent("");
    setMedia([]);
    setLoadMedia(true);

    let newArr = [];
    if (media.length > 0) newArr = await imageUpload(media);

    const newComment = {
      content,
      files: newArr,
      likes: [],
      user: auth.user,
      createdAt: new Date().toISOString(),
      reply: onReply && onReply.commentId,
      tag: onReply && onReply.user,
    };
    setLoadMedia(false);
    dispatch(createComment({ post, newComment, auth, socket }));
    if (setOnReply) return setOnReply(false);
  };
  const handleChangeMedia = (e) => {
    const files = [...e.target.files];
    let err = "";
    let newMedia = [];

    files.forEach((file) => {
      if (!file) return (err = "File does not exits.");
      if (file.size > 1024 * 1024 * 100) {
        return (err = "The image largest is 100mb.");
      }
      return newMedia.push(file);
    });

    if (err) dispatch({ type: GLOBALTYPES.ALERT, payload: { error: err } });
    setMedia([...media, ...newMedia]);
  };

  const handleDeleteMedia = (index) => {
    const newArr = [...media];
    newArr.splice(index, 1);
    setMedia(newArr);
  };

  return (
    <>
      <div
        className="show_media"
        style={{ display: media.length > 0 ? "grid" : "none" }}>
        {media.map((item, index) => (
          <div key={index} id="file_media">
            {item.type.match(/video/i)
              ? videoShow(URL.createObjectURL(item), theme)
              : item.type.match(/image/i)
              ? imageShow(URL.createObjectURL(item), theme)
              : fileShow(media.url, theme)}
            <span onClick={() => handleDeleteMedia(index)}>&times;</span>
          </div>
        ))}
      </div>
      <form className="card-footer comment_input" onSubmit={handleSubmit}>
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
        <Icons setContent={setContent} content={content} theme={theme} />
        <div className="file_upload">
          <i className="fas fa-file-alt text-primary" />
          <input
            type="file"
            name="file"
            id="file"
            multiple
            accept="image/*,video/*,.xlsx,.xls,.doc, .docx,.ppt, .pptx,.txt,.pdf"
            onChange={handleChangeMedia}
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
  );
};

export default InputComment;
