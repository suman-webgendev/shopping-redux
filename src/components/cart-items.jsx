import { formatPrice } from "@/lib/utils";
import {
  addToCart,
  clearItems,
  removeFromCart,
} from "@/store/slices/cart-slice";
import { Minus, Plus, Trash } from "lucide-react";
import { useDispatch } from "react-redux";
import { Button } from "./ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";

const CartItems = ({ product }) => {
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
    <Card className="mb-2 flex items-center justify-between gap-2 px-2 py-4">
      <CardHeader className="p-2 font-semibold">{product.name}</CardHeader>
      <div className="flex">{formatPrice(product.totalAmt)}</div>
      <CardContent className="flex items-center p-2">
        <Button variant="icon" className="p-1" onClick={handleAddToCart}>
          <span className="sr-only">Add one more item to the cart.</span>
          <Plus />
        </Button>
        <div>{product.quantity}</div>
        <Button
          className="p-1"
          variant="icon"
          onClick={() => dispatch(removeFromCart(product.id))}
        >
          <span className="sr-only">Remove one item from the cart.</span>
          <Minus />
        </Button>
      </CardContent>
      <CardFooter className="p-2">
        <Button
          className="p-1"
          variant="icon"
          onClick={() => dispatch(clearItems(product.id))}
        >
          <span className="sr-only">
            Remove all of the items from the cart.
          </span>
          <Trash className="text-red-500" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CartItems;
