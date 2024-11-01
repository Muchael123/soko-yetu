import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken'
export function verifyToken(req: Request, res: Response, next: NextFunction) {
    const Token = req.header('Authorization')
    if (!Token) {
        res.status(401).json({ message: "Access denied" })
        return;
    }


    try {
        //decode jwt token data
        const decoded = jwt.verify(Token, process.env.JWT_SECRET!);
        if (typeof decoded !== 'object' || !decoded?.userId) {      
      res.status(401).json({ message: "Access denied" });  
        }

        const payload = decoded as jwt.JwtPayload;
       

        req.userId = payload?.userId;
        req.role = payload?.role;
        next()
    } catch (e) {
      res.status(401).json({ message: "Access denied" });  
    }
}

export function verifySeller(req: Request, res: Response, next: NextFunction) {
  const Token = req.header("Authorization");
  if (!Token) {
    res.status(401).json({ message: "Access denied" });
    return;
  }

  try {
    //decode jwt token data
       if (req.role !== "seller") {
           res.status(401).json({ error: "You dont have access. Not a seller" });
           return;
       }
      
    next();
  } catch (e) {
    res.status(401).json({ message: "Access denied" });
  }
}