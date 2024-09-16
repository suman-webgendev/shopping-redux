import Button from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { formatPrice } from "@/lib/utils";
import { ShoppingCart } from "lucide-react";
import { Fragment } from "react";
import { useSelector } from "react-redux";

import CartItems from "./cart-items";
import EmptyCart from "./empty-cart";
import { ScrollArea } from "./ui/scroll-area";

const Cart = () => {
  const totalQty = useSelector((state) => state.cart.totalQty);
  const products = useSelector((state) => state.cart.items);
  const subTotal = useSelector((state) => state.cart.totalAmt);
  return (
    <Dialog className="rounded-md">
      <DialogTrigger asChild>
        <Button variant="icon" className="relative">
          <ShoppingCart />
          {totalQty > 0 && (
            <span className="absolute -right-0 top-0.5 flex size-5 items-center justify-center rounded-full bg-red-500 text-center text-xs text-white">
              {totalQty}
            </span>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[90%] rounded-xl sm:rounded-sm lg:rounded-lg xl:rounded-lg">
        <DialogHeader>
          <DialogTitle>Cart</DialogTitle>
          <DialogDescription>
            All of your cart items will appear here
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <ScrollArea className="h-80">
            {products.length === 0 && <EmptyCart />}
            {products.length > 0 &&
              products.map((product) => (
                <Fragment key={product.id}>
                  <CartItems product={product} />
                </Fragment>
              ))}
          </ScrollArea>
        </div>
        {products.length > 0 && (
          <>
            <div className="text-right text-lg font-medium">
              Total: {formatPrice(subTotal)}
            </div>
            <Button>Check out</Button>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default Cart;
