import { formatPrice } from "@/lib/utils";
import { addToCart, removeFromCart } from "@/store/slices/cart-slice";
import { useGetProductByIdQuery } from "@/store/slices/product-api-slice";
import { ShoppingCart } from "lucide-react";
import { Suspense } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { toast } from "sonner";
import ProductDetailsLoading from "../product-details-loading";
import { Button } from "../ui/button";
import { ScrollArea } from "../ui/scroll-area";

const ProductDetails = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { id } = location.state || {};

  const { data: product, error, isLoading } = useGetProductByIdQuery(id);

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

  return (
    <ScrollArea className="h-[90vh]">
      {isLoading && !error && <ProductDetailsLoading />}
      <Suspense fallback={<ProductDetailsLoading />}>
        {!isLoading && !error && product && (
          <div className="m-3 mx-auto grid h-full max-w-[85vw] grid-cols-1 gap-3 sm:grid-cols-2">
            <div className="h-[25rem]">
              <img
                className="size-full object-contain"
                src={product.image}
                alt={product.title}
              />
            </div>
            <div className="h-full p-3">
              <h2 className="mb-2 text-xl font-medium">{product.title}</h2>
              <h3 className="mb-4 text-pretty break-words font-medium capitalize leading-7">
                {product.description}
              </h3>

              <div className="flex items-center justify-between">
                <p className="text-xl font-bold">
                  MRP {formatPrice(product.price)}
                </p>
                <Button
                  variant="outline"
                  className="text-xl"
                  onClick={handleAddToCart}
                >
                  <ShoppingCart className="mr-3 size-6" />
                  Add to cart
                </Button>
              </div>
            </div>
          </div>
        )}
      </Suspense>
    </ScrollArea>
  );
};

export default ProductDetails;
