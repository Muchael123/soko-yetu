import { Request, Response } from "express";
import { db } from "../../db/index";
import { CreateProductSchema, ProductsTable } from "@/db/ProductSchema";
import { eq } from "drizzle-orm";
import _ from 'lodash'

export async function ListProducts(req: Request, res: Response) {
  try {
    const products = await db.select().from(ProductsTable);
    if (!products) {
      res.status(404).json({message: "Not found"})
    } else {
      res.status(200).json(products);
    }
  } catch (e) {
    res.status(500).send('An error occured')
  }
};

export async function AddProduct(req: Request, res: Response) {
  try {
    console.log(req.cleanBody)
  const [product] = await db.insert(ProductsTable).values(req.cleanBody).returning();
  res.status(201).json(product);
  } catch (e) {
    res.status(500).json({e,message: "An error occured"})
  }
};

export async function UpdateProduct(req: Request, res: Response) {
  const { id } = req.params
  const updates = req.body
  console.log(updates)
  try {
    const [product] = await db
      .update(ProductsTable).set(updates)
      .where(eq(ProductsTable.id, Number(id))).returning();
    if (product)
      res.status(200).json({ product, message: "updated successfully" })
    else {
      res.status(404).json({message: "product not found"})
    }
  } catch (e) {
    res.status(500).send('An error occured')
  }
};

export function ViewProductById(req: Request, res: Response) {
  try {
  } catch (e) {
    res.status(500).send("An error occured");
  }
};

export async function DeleteProduct(req: Request, res: Response) {
  
  const { id } = req.params
  try {
    console.log('Deleting...')
    const [product] = await db.delete(ProductsTable)
      .where(eq(ProductsTable.id, Number(id))).returning();
    if (product)
      res.status(204).json({product, message: "Deleted successfully"})
    else
      res.status(404).json({message: "Product not found"})
  } catch (e) {
    res.status(500).json({ e, message: "An error occured"});
  }
};
