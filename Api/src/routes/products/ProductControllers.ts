import { Request, Response } from "express";


export function ListProducts(req: Request, res: Response) {
  res.send("List products");
};

export function AddProduct(req: Request, res: Response) {
  console.log(req.body);
  res.send("Add product");
};

export function ChangeProduct(req: Request, res: Response) {
  res.send("change product");
};

export function ViewProductById(req: Request, res: Response) {
  res.send("Add product by id");
};

export function DeleteProduct(req: Request, res: Response) {
  res.send("Delete product");
};
