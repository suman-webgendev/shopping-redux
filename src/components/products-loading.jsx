import "@/style/products-loading.css";

const ProductLoading = () => {
  return (
    <div
      style={{
        width: "95vw",
        padding: "1rem",
        marginInline: "auto",
        overflow: "hidden",
      }}
    >
      <ul>
        {[...Array(10)].map((_, index) => (
          <li key={index}>
            <span></span>
            <span></span>
            <span className="name"></span>
            <span className="price"></span>
            <span className="actions"></span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductLoading;
