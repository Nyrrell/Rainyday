const Image = (props, { src, alt, className }) => (
  <img src={src} alt={alt} className={className} {...props}
       // onError={({ currentTarget }) => {
       //   currentTarget.onerror = null;
       //   currentTarget.src = notFound;
       // }}
  />
);

export default Image;