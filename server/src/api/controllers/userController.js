import { registerUser,loginUser } from "../services/userService.js";

export const register = async (req, res) => {
    try {
        const { email, password, name } = req.body;
        const result = await registerUser({ email, password, name });
        res.status(201).json({ message: "User registered successfully", result: result });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

  
export const login = async (req, res) => {
    try {
        const { email, password } = req.body; 
        const { userDetails, token } = await loginUser(email, password);
        res.status(200).json({
            message: "User logged in successfully", 
            userDetails: userDetails,
            token: token
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
