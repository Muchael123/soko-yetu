import { Router } from 'express'
import {
  AddProduct,
  UpdateProduct,
  DeleteProduct,
  ListProducts,
  ViewProductById,
} from "./ProductControllers";
import { validateData } from '@/middlewares/ValidationMiddleware';

import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { CreateProductSchema, ProductsTable, UpdateProductSchema } from '@/db/ProductSchema';

const router = Router()




router.get('/', ListProducts)
router.get("/:id", ViewProductById);
router.post("/",validateData(CreateProductSchema), AddProduct );
router.put("/:id", validateData(UpdateProductSchema), UpdateProduct);
router.delete("/:id", DeleteProduct);
export default router