import userModel from "../model/user.model.js";

const controller = {};

    /**
     * Function to create table users
     * @param {Object} req 
     * @param {Object} res 
     * @retuns {Promise<void>}
     */
    controller.createTableUsers = async ( req , res ) => {
        try {
            await userModel.createTableUsers();
            res.status(201).json({ message: "User table created successfully!" });
        } catch (error) {
            console.error("Error creating Users Table :",error.message);
            throw new Error("Error creating Users Table!");
        }
    }

    /**
     * Function to add a user in users table
     * @param {Object} req 
     * @param {Object} res 
     * @returns {Promise<void>}
     */
    controller.addUser = async ( req , res ) => {
        try {
            const { username , password , email , profesor_id , role } = req.body;
            await userModel.addUser( username , password , email , profesor_id , role );
            res.status(201).json({message:"User was adding successfully!"});
        } catch (error) {
            console.error("Error adding user in users table : ", error.message);
            throw new Error("Error adding user in users table!");  
        }
    }

    /**
     * Function to fetch all users from users table
     * @param {Object} req 
     * @param {Object} res 
     * @returns {Promise<void>}
     */
    controller.getAllUsers = async ( req , res ) => {
        try {
            const [ rows ] = await userModel.getAllUsers();
                res.status(201).json(rows);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Internal Server Error"});
        }
    }

    /**
     *  Function to fetch a user by username and password
     * @param {Object} req 
     * @param {Object} res 
     */
    controller.getUserByUsernameAndPassword = async ( req , res ) => {
        try {
            const { email , password } = req.body;
            console.log(email);
            console.log(password);
            const [ row ] = await userModel.getUserByUserNameAndPassword(email,password);
            res.status(201).json(row);
        } catch (error) {
            console.error("Error fetching user by username and password: ", error.message);
            throw new Error("Error fetching user by username and password!");
            
        }
    }
    controller.deleteUser = async ( req , res ) => {
        try {
            const { id } = req.params;
            await userModel.deleteUserById(id);
                res.status(201).json({message:"User was deleting successfully!"});
        } catch (error) {
            console.error("Error deleting user by id : ",error.message);
            throw new Error("Error deleting user by id!");
            
        }
    }

export default controller;