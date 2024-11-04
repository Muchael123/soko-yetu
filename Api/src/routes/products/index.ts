import { Router } from 'express'
import {
  AddProduct,
  UpdateProduct,
  DeleteProduct,
  ListProducts,
  ViewProductById,
} from "./ProductControllers.js";
import { validateData } from '../../middlewares/ValidationMiddleware.js';

import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { CreateProductSchema, ProductsTable, UpdateProductSchema } from '../../db/ProductSchema.js';
import { verifySeller, verifyToken } from '../../middlewares/AuthMiddleware.js';

const router = Router()

router.get('/', ListProducts)
router.get("/:id", ViewProductById);
router.post("/", verifyToken, verifySeller, validateData(CreateProductSchema), AddProduct);
router.put(
  "/:id",
  verifyToken,
  verifySeller,
  validateData(UpdateProductSchema),
  UpdateProduct
);
router.delete("/:id",verifyToken, verifySeller, DeleteProduct);
export default router