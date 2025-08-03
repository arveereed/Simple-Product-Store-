import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  IconButton,
  Image,
  Input,
  Text,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { useProductStore } from "../store/product";
import { useToast } from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";

const ProductCard = ({ product }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = useRef(null);
  const finalRef = useRef(null);

  const textColor = useColorModeValue("gray.600", "gray.200");
  const bg = useColorModeValue("white", "gray.800");
  const toast = useToast();

  const { deleteProduct, updateProduct } = useProductStore();
  const [productDetails, setProductDetails] = useState(product);

  const handleDelete = async (pid) => {
    const { success, message } = await deleteProduct(pid);
    if (success) {
      toast({
        title: "Product deleted.",
        description: message,
        status: "success",
        duration: 2500,
      });
      onClose;
    } else {
      toast({
        title: "Error.",
        description: message,
        status: "error",
        duration: 2500,
      });
    }
  };

  const handleSave = async (pid, editedProduct) => {
    const { success, message } = await updateProduct(pid, editedProduct);
    if (success) {
      toast({
        title: "Product save.",
        description: message || "Product updated successfully",
        status: "success",
        duration: 2500,
      });
      onClose();
    } else {
      toast({
        title: "Error.",
        description: message || "Failed to edit, please try again",
        status: "error",
        duration: 2500,
      });
    }
  };

  return (
    <>
      <Box
        shadow={"lg"}
        rounded={"lg"}
        overflow={"hidden"}
        transition={"all 0.3s"}
        _hover={{ transform: "translateY(-5px)", shadow: "xl" }}
        bg={bg}
      >
        <Image
          src={product.image}
          alt={product.name}
          h={48}
          w={"full"}
          objectFit={"cover"}
        />
        <Box p={4}>
          <Heading as={"h3"} size={"md"} mb={2}>
            {product.name}
          </Heading>
          <Text fontWeight={"bold"} fontSize={"xl"} color={textColor} mb={4}>
            ${product.price}
          </Text>
          <HStack spacing={2}>
            <IconButton onClick={onOpen} icon={<CiEdit />} colorScheme="blue" />
            <IconButton
              icon={<MdDelete />}
              colorScheme="red"
              onClick={() => handleDelete(product._id)}
            />
          </HStack>
        </Box>
      </Box>
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update Product</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <Input
                value={productDetails.name}
                onChange={(e) =>
                  setProductDetails({ ...productDetails, name: e.target.value })
                }
                ref={initialRef}
                placeholder="Product name"
              />
            </FormControl>

            <FormControl mt={4}>
              <Input
                value={productDetails.price}
                onChange={(e) =>
                  setProductDetails({
                    ...productDetails,
                    price: e.target.value,
                  })
                }
                placeholder="Product price"
              />
            </FormControl>

            <FormControl mt={4}>
              <Input
                value={productDetails.image}
                onChange={(e) =>
                  setProductDetails({
                    ...productDetails,
                    image: e.target.value,
                  })
                }
                placeholder="Product image"
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              onClick={() => handleSave(product._id, productDetails)}
              colorScheme="blue"
              mr={3}
            >
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ProductCard;
