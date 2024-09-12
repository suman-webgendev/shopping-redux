import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ShoppingCart } from "lucide-react";
import { Fragment } from "react";
import { useSelector } from "react-redux";
import CartItems from "./cart-items";
import EmptyCart from "./empty-cart";

const Cart = () => {
  const totalQty = useSelector((state) => state.cart.totalQty);
  const products = useSelector((state) => state.cart.items);
  const subTotal = useSelector((state) => state.cart.totalAmt);
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="icon" className="relative">
          <ShoppingCart />
          {totalQty > 0 && (
            <span className="absolute -right-0 top-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-center text-xs text-white">
              {totalQty}
            </span>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[90dvw]">
        <DialogHeader>
          <DialogTitle>Cart</DialogTitle>
          <DialogDescription>
            All of your cart items will appear here
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {products.length === 0 && <EmptyCart />}
          {products.length > 0 &&
            products.map((product) => (
              <Fragment key={product.id}>
                <CartItems product={product} />
              </Fragment>
            ))}
        </div>
        {products.length > 0 && (
          <>
            <div className="text-right text-lg font-medium">
              Total: {subTotal}
            </div>
            <Button>Check out</Button>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default Cart;
