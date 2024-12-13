const jwt = require("jsonwebtoken");
const JWT_SECRET_KEY="secReteXpressItKey"


 const verifyToken=(req,res,next)=>{
    const authHeader=req.get('Authorization');
    

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ error: "Authorization header missing or malformed" });
    }

    const token=authHeader.split(" ")[1]
    try {
        const user = jwt.verify(token, JWT_SECRET_KEY);
        if (!user) {
            return res.status(401).json({ error: "JWT verification failed" });
        }

        req.user = user; // Attach user to the request object
        next(); // Proceed to the next middleware
    } catch (error) {
        return res.status(401).json({ error: "Invalid token", details: error.message });
    }
}
module.exports={verifyToken}