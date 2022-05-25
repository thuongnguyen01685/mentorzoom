import React from "react";
import { useState } from "react";
import Carousel from "../../Carousel";

const CardBody = ({ post, theme }) => {
  const [readMore, setReadMore] = useState(false);
  // console.log(post);

  return (
    <div className="card_body">
      <div
        className="card_body-content"
        style={{
          filter: theme ? "invert(1)" : "invert(0)",
          color: theme ? "white" : "#111",
        }}>
        <span>
          {post.content.length < 60
            ? post.content
            : readMore
            ? post.content + " "
            : post.content.slice(0, 60) + "..."}
        </span>
        {post.content.length > 60 && (
          <span
            className="readMore text-info"
            style={{ cursor: "pointer" }}
            onClick={() => setReadMore(!readMore)}>
            {readMore ? "Ẩn bớt" : "Xem thêm"}
          </span>
        )}
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-start",
          right: "10px",
          alignItems: "center",
        }}>
        {post.files.length > 0 &&
          post.files.map((item) => (
            <div
              key={item.public_id}
              style={{
                marginTop: "-20px",
                padding: "10px",
                marginBottom: "-20px",
              }}>
              {(item.public_id.slice(25) === ".docx" ||
                item.public_id.slice(25) === ".doc") && (
                <i
                  className="far fa-file-word text-primary"
                  style={{
                    filter: theme ? "invert(1)" : "invert(0)",
                    fontSize: "25px",
                    cursor: "pointer",
                    padding: "10px",
                  }}
                  onClick={() => window.open(`${item.url}`, "_blank")}
                />
              )}
              {(item.public_id.slice(25) === ".xlsx" ||
                item.public_id.slice(25) === ".xls") && (
                <i
                  className="far fa-file-excel text-success"
                  style={{
                    filter: theme ? "invert(1)" : "invert(0)",
                    fontSize: "25px",
                    cursor: "pointer",
                    padding: "10px",
                  }}
                  onClick={() => window.open(`${item.url}`, "_blank")}
                />
              )}

              {(item.public_id.slice(25) === "" ||
                item.public_id.slice(25) === ".txt") && (
                <i
                  className="far fa-file-alt text-warning"
                  style={{
                    filter: theme ? "invert(1)" : "invert(0)",
                    fontSize: "25px",
                    cursor: "pointer",
                    padding: "10px",
                  }}
                  onClick={() => window.open(`${item.url}`, "_blank")}
                />
              )}

              <p
                onClick={() => window.open(`${item.url}`, "_blank")}
                style={{ cursor: "pointer", fontSize: "12px" }}>
                {item.public_id.slice(20, 1000)}
              </p>
            </div>
          ))}
      </div>

      {post.images.length > 0 && (
        <Carousel images={post.images} id={post._id} />
      )}
    </div>
  );
};

export default CardBody;
