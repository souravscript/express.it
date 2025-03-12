import express from "express"

import userRouter from "./userRouter.js"
import expressionRouter from "./expressionRouter.js"
import followRoutes from "./followRoutes.js"
const router=express.Router()

router.use("/api",userRouter)
router.use("/api",expressionRouter)
router.use("/api",followRoutes)


router.get("/api/test",(req,res)=>{
    res.status(200).json({message:"auth route test succesfull"})
})

export default router