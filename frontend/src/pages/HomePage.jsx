import { Box, Container, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import { useProductStore } from "../store/product";
import { useEffect } from "react";
import ProductCard from "../components/ProductCard";

const HomePage = () => {
  const { fetchProducts, products } = useProductStore();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  console.log(products);
  return (
    <Container maxW={"container.xl"} py={12}>
      <VStack spacing={8}>
        <Text
          fontSize={30}
          fontWeight={"bold"}
          bgGradient={"linear(to-r, cyan.400, blue.500)"}
          bgClip={"text"}
          textAlign={"center"}
        >
          Current Products
        </Text>
      </VStack>
      <SimpleGrid
        columns={{
          base: 1,
          md: 2,
          lg: 3,
        }}
        spacing={10}
        width={"full"}
        mt={10}
      >
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
        {products.length == 0 && <Text>NO PRODUCTS</Text>}
      </SimpleGrid>
    </Container>
  );
};

export default HomePage;
