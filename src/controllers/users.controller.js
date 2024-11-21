import User from '../models/users.model.js';
import bcryptjs from "bcryptjs";

export const register = async (req, res) => {
    try {
        
        const { name, lastName, email, password, role, dateCreation } = req.body;
        const encryptPassword = bcryptjs.hashSync(password);
        
        const user = await User.create({
            name,
            lastName,
            email,
            password: encryptPassword,
            role,
            dateCreation
        });

        return res.status (200).json({
            msg: "User has been added to database",
            userDetails: {
                fullName: `${user.name} ${user.lastName}`,
                email: user.email,
                role: user.role,
            }
        });
        
    } catch (e) {
        console.log(e);
        return res.status(500).send("Failed to register user");
    }
}