import { useGetProductsQuery } from "@/store/slices/product-api-slice";
import { motion } from "framer-motion";
import { Suspense } from "react";
import ProductCard from "../product-card";
import ProductLoading from "../products-loading";
import { ScrollArea } from "../ui/scroll-area";

const ProductPage = () => {
  const { data: products, error, isLoading } = useGetProductsQuery();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };
  return (
    <>
      <ScrollArea className="h-[92vh] w-dvw">
        <Suspense fallback={<ProductLoading />}>
          <motion.div
            className="mx-auto grid max-w-[95vw] grid-cols-1 items-center justify-center gap-2 place-self-center p-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {isLoading && !error && <ProductLoading />}
            {!isLoading &&
              products.map((product) => (
                <motion.div variants={cardVariants} key={product.id}>
                  <ProductCard product={product} />
                </motion.div>
              ))}
          </motion.div>
        </Suspense>
      </ScrollArea>
    </>
  );
};

export default ProductPage;
