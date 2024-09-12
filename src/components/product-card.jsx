import { IndianRupee } from "lucide-react";
import { useDispatch } from "react-redux";
import { addToCart } from "../store/slices/cart-slice";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader } from "./ui/card";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
      }),
    );
  };
  return (
    <Card className="flex h-96 w-72 flex-col overflow-hidden rounded p-2 shadow-lg">
      <CardHeader className="h-64 p-0">
        <div className="flex h-full w-full items-center justify-center">
          <img
            className="size-full object-contain"
            loading="lazy"
            src={product.imageUrl}
            alt={product.itemName}
          />
        </div>
      </CardHeader>
      <CardContent className="flex flex-grow flex-col justify-between p-4">
        <p className="mb-2 truncate text-xl font-bold">{product.itemName}</p>
        <div className="flex items-center justify-between rounded p-2">
          <div className="flex items-center text-lg font-semibold">
            <IndianRupee className="text-base" />
            {product.price}
          </div>
          <Button onClick={handleAddToCart}>Add to cart</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
