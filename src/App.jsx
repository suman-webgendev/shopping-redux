import { ScrollArea } from "@/components/ui/scroll-area";
import { motion } from "framer-motion";
import Cart from "./components/cart";
import ProductCard from "./components/product-card";
import { productData } from "./mockData";

const App = () => {
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
      <Cart />
      <ScrollArea className="h-[95vh] w-dvw">
        <motion.div
          className="m-2 grid grid-cols-1 gap-2 p-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {productData.map((product) => (
            <motion.div variants={cardVariants} key={product.id}>
              <ProductCard product={product} />
            </motion.div>
          ))}
        </motion.div>
      </ScrollArea>
    </>
  );
};

export default App;
