import { Router } from 'express'
import {
  AddProduct,
  ChangeProduct,
  DeleteProduct,
  ListProducts,
  ViewProductById,
} from "./ProductControllers";
const router = Router()

router.get('/', ListProducts)
router.get("/:id", ViewProductById);
router.post("/", AddProduct );
router.put("/:id", ChangeProduct);
router.delete("/:id", DeleteProduct);
export default router