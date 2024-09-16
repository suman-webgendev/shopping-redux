import { capitalize } from "@/lib/utils";
import {
  useGetProductCategoryQuery,
  useGetProductsQuery,
} from "@/store/slices/product-api-slice";
import { motion } from "framer-motion";
import { Suspense, useCallback, useState } from "react";
import AddProduct from "../add-product";
import ProductCard from "../product-card";
import ProductLoading from "../products-loading";
import { Button } from "../ui/button";
import { Combobox } from "../ui/combobox";
import { ScrollArea } from "../ui/scroll-area";

const ProductPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const {
    data: products,
    isLoading,
    error,
  } = useGetProductsQuery({
    category: selectedCategory,
  });

  const {
    data: categoriesRaw,
    isLoading: loadingCategory,
    error: categoryError,
  } = useGetProductCategoryQuery();

  const options = [
    { label: "All", value: "all" },
    ...(Array.isArray(categoriesRaw)
      ? categoriesRaw.map((category) => ({
          label: capitalize(category),
          value: category,
        }))
      : []),
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const handleChange = useCallback((value) => {
    setSelectedCategory(value);
  }, []);

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <>
      <div className="mx-4 my-2 flex items-center justify-between gap-40">
        <div className="flex w-fit items-center gap-2">
          <p className="text-lg font-bold">Filter</p>
          {!loadingCategory && !categoryError && (
            <Combobox
              options={options}
              onChange={handleChange}
              value={selectedCategory}
            />
          )}
        </div>
        <AddProduct>
          <Button variant="outline">Add a new Item</Button>
        </AddProduct>
      </div>
      <ScrollArea className="h-[84vh] w-dvw">
        <Suspense fallback={<ProductLoading />}>
          <motion.div
            className="mx-auto grid max-w-[95vw] grid-cols-1 items-center justify-center gap-2 place-self-center p-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {isLoading && !error && <ProductLoading />}
            {!isLoading &&
              products &&
              products.length > 0 &&
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
