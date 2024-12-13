import { createExpressionService } from "../services/expressionService.js";

export const createExpression=async (req,res)=>{
    try{
        const {content,photos}=req.body;
        console.log("content is ",content)
        if(!content){
            res.status(401).json({error:"Content is required"})
        }
        const authorId=req.user.id
        console.log("author ID is ", authorId)
        const newExpression=await createExpressionService({content,photos,authorId})
        res.status(201).json({message:"Post created successfully",expression:newExpression});
        
    }catch(err){
        res.status(500).json({ message: err.message });
    }
}