export const imageShow = (src, theme) => {
  return (
    <>
      <img
        src={src}
        alt="images"
        className="img-thumbnail"
        style={{ filter: theme ? "invert(1)" : "invert(0)" }}
      />
    </>
  );
};

export const fileShow = (src, theme) => {
  return (
    <>
      <i
        className="fas fa-file-alt text-primary"
        style={{ filter: theme ? "invert(1)" : "invert(0)", fontSize: "30px" }}
        onClick={() => window.open(`${src}`, "_blank")}
      />
    </>
  );
};

export const videoShow = (src, theme) => {
  return (
    <video
      controls
      src={src}
      alt="images"
      className="img-thumbnail"
      style={{ filter: theme ? "invert(1)" : "invert(0)" }}
    />
  );
};
