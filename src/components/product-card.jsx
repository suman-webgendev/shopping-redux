import { formatPrice } from "@/lib/utils";
import { addToCart, removeFromCart } from "@/store/slices/cart-slice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader } from "./ui/card";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAddToCart = (e) => {
    e.stopPropagation();
    dispatch(
      addToCart({
        id: product.id,
        name: product.title,
        price: product.price,
      }),
    );
    toast("Item added to cart.", {
      description: `${product.title} was added to cart`,
      action: {
        label: "Undo",
        onClick: () => {
          dispatch(removeFromCart(product.id));
        },
      },
    });
  };

  const handleCardClick = () => {
    navigate("/product-details", {
      state: {
        id: product.id,
      },
    });
  };

  return (
    <Card
      className="flex h-96 w-72 cursor-pointer flex-col overflow-hidden rounded p-2 shadow-lg"
      onClick={handleCardClick}
    >
      <CardHeader className="h-52 p-0">
        <div className="flex size-full items-center justify-center">
          <img
            className="size-full object-contain"
            loading="lazy"
            src={product.image}
            alt={product.title}
          />
        </div>
      </CardHeader>

      <CardContent className="flex grow flex-col justify-between p-4">
        <p className="mb-2 truncate font-semibold">{product.title}</p>
        <CardDescription className="line-clamp-2 h-[2.8rem] overflow-hidden pb-2">
          {product.description}
        </CardDescription>
        <div className="flex items-center justify-between rounded p-2">
          <div className="text-lg font-semibold">
            {formatPrice(product.price)}
          </div>
          <Button onClick={handleAddToCart}>Add to cart</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
