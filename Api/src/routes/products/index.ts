import { Router } from 'express'
import { AddProduct, ChangeProduct, DeleteProduct, ListProduct, ViewProduct } from './ProductControllers';
const router = Router()

router.get('/', ListProduct)
router.get("/:id", ViewProduct);
router.post("/", AddProduct );
router.put("/:id", ChangeProduct);
router.delete("/:id", DeleteProduct);
export default router