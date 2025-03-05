import { createExpressionService, getAllExpressionsService, getExpressionsByIDService } from "../services/expressionService.js";

export const createExpression=async (req,res)=>{
    try{
        const {content,photos}=req.body;
        if(!content){
            res.status(401).json({error:"Content is required"})
        }
        const authorId=req.user.id
        const newExpression=await createExpressionService({content,photos,authorId})
        res.status(201).json({message:"Post created successfully",expression:newExpression});
        
    }catch(err){
        res.status(500).json({ message: err.message });
    }
}

export const getAllExpressionController=async (req,res)=>{
    try{
        const allExpression=await getAllExpressionsService()
        res.status(201).json({message:"All expression fetched",expressions:allExpression})
    }catch(err){
        res.status(500).json({message:err.message})
    }
}

export const getOwnExpressionsController=async(req,res)=>{
    try{
        const authorId=req.user.id
        const ownExpressions=await getExpressionsByIDService({authorId})
        res.status(201).json({message:"Fetched all my expressions",ownExpressions:ownExpressions})
    }catch(err){
        res.status(500).json({message:err.message})
    }
}
export const getOthersExpressionController = async (req, res) => {
    try {
        console.log("trying to fetch req.params", req.params);
        const { id, authorId } = req.params; // Assuming authorId is part of the params
        const othersExpressions = await getExpressionsByIDService({ id });
        res.status(201).json({ message: `Fetched all others expressions of ${authorId}`, expressions: othersExpressions });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}