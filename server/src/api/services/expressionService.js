import Expression from "../models/Expression.js"

export const createExpressionService=async ({content,photos,authorId})=>{
    try{
        const newExpression=await Expression.create({content,photos,author:authorId})
        return newExpression;
    }catch(err){
        throw new Error(err.message);
    }
}

export const getAllExpressionsService=async()=>{
    try{
        const expressions = await Expression.find()
            .populate("author", "name email") // Populate author details if needed
            .populate("reExpressions.author", "name email") // Populate reExpressions' author details
            .sort({ createdAt: -1 }); // Fetch in descending order of creation time
        return expressions;
    }catch(err){
        throw new ErrorEvent(err.message)
    }
}

export const getExpressionsByIDService=async (author)=>{
    try{

        console.log("author user id  in the service", author.authorId)
        const expressions= Expression.find({author:author.authorId})
            .populate("author", "name email") // Populate author details if needed
            .populate("reExpressions.author", "name email") // Populate reExpressions' author details
            .sort({ createdAt: -1 }); // Fetch in descending order of creation time
        return expressions
    }catch(err){
        throw new Error(err.message)
    }

}