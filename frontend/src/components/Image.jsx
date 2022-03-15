import notFound from "../assets/not_found.png"

const Image = ({ src, alt, className }) => (
  <img src={src} alt={alt} className={className}
       // onError={({ currentTarget }) => {
       //   currentTarget.onerror = null;
       //   currentTarget.src = notFound;
       // }}
  />
);

export default Image;