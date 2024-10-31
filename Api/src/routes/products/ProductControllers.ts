import { Request, Response } from "express";
import { db } from "../../db/index";
import { ProductsTable } from "../../db/ProductSchema";
import { eq } from "drizzle-orm";


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
  const [product] = await db.insert(ProductsTable).values(req.body).returning();
  res.status(201).json(product);
  } catch (e) {
    res.status(500).json({message: "An error occured"})
  }
};

export async function ChangeProduct(req: Request, res: Response) {
  const { id } = req.params
  try {
    const [product] = await db
      .select()
      .from(ProductsTable)
      .where(eq(ProductsTable.id, Number(id)));
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
    const [product] = await db.delete(ProductsTable)
      .where(eq(ProductsTable.id, Number(id))).returning();
    if (product)
      res.status(203)
    else
      res.status(404).json({message: "Product not found"})
  } catch (e) {
    res.status(500).send("An error occured");
  }
};
