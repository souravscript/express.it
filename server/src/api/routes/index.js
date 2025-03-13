import express from "express"

import userRouter from "./userRouter.js"
import expressionRouter from "./expressionRouter.js"
import followRoutes from "./followRoutes.js"
import groupRoutes from "./groupRoutes.js"
const router=express.Router()

// User routes
router.use("/users",userRouter)

// Expression routes
router.use("/expressions",expressionRouter)

// Follow routes
router.use("/api",followRoutes)

// Group routes
router.use("/groups",groupRoutes)


router.get("/api/test",(req,res)=>{
    res.status(200).json({message:"auth route test succesfull"})
})

export default router