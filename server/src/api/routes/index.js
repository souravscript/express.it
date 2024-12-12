import express from "express"
const router=express.Router()

import userRouter from "./userRouter.js"

router.use("/api",userRouter)


router.get("/api/test",(req,res)=>{
    res.status(200).json({message:"auth route test succesfull"})
})

export default router