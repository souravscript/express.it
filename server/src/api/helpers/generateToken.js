import jwt from "jsonwebtoken"
const JWT_SECRET_KEY="secReteXpressItKey"

export const generateToken=(user)=>{
    const jsonWebToken=jwt.sign(
        {
            id:user._id,
            email:user.email
        },
        JWT_SECRET_KEY,
        {expiresIn:"30d"}
    )

    return jsonWebToken;
}