import Expression from "../models/Expression.js"

export const createExpressionService=async ({content,photos,authorId})=>{
    try{
        const newExpression=await Expression.create({content,photos,author:authorId})
        return newExpression;
    }catch(err){
        throw new Error(err.message);
    }
}