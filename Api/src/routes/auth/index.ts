import { createUserSchema, LoginSchema, UsersTable } from "../../db/usersSchema.js";
import { validateData } from "../../middlewares/ValidationMiddleware.js";
import { Router } from "express";
import bcrypt from "bcryptjs";
import { db } from "../../db/index.js";
import { eq } from "drizzle-orm";
import jwt from 'jsonwebtoken'

const router = Router()
router.post('/register', validateData(createUserSchema), async (req, res) => {
    try {
        const data = req.cleanBody
    data.password = await bcrypt.hash(
      data.password,10
    );
    const [user] = await db.insert(UsersTable).values(data).returning();
    
        res.status(201).json({ message: "success" });
    } catch (e) {
        res.status(500).json({message: "Something went wrong"})
    }
})

router.post('/login', validateData(LoginSchema), async (req, res) => {
    try {
const { email, password } = req.cleanBody;
const [user] = await db
  .select()
  .from(UsersTable)
  .where(eq(UsersTable.email, email));

if (!user) {
  res.status(401).json({ message: "Authentication failed" });
  return;
}

// Compare the plain text password with the hashed password stored in the database
const matched = await bcrypt.compare(password, user.password);

if (!matched) {
  res.status(401).json({ message: "Authentication failed" });
  return;
}


        const token = jwt.sign(
          { userId: user.id, role: user.role },
          process.env.JWT_SECRET!,
          { expiresIn: "30d" }
        );
        res.status(200).json({token: token, user: user.name, email: user.email, role: user.role})
        return;
    } catch (e) {
        console.log(e)
        res.status(500).json({message: "An error occured"})
        return;
    }
})

export default router;