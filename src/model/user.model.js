import { pool } from "../db.js";

const userModel = {};

/**
 * Function that creates the users table if it doesn't exist
 * @returns {Promise<void>}
 */
userModel.createTableUsers = async () => {
    try {
        await pool.query(`
                CREATE TABLE IF NOT EXISTS users (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    username VARCHAR(100) NOT NULL,
                    password VARCHAR(100) NOT NULL,
                    email VARCHAR(100) NOT NULL UNIQUE
                )
            `);
    } catch (error) {
        console.error("Error creating user table: ", error.message);
    }
}

/**
 * Query to fetch all users from the users table
 * @returns {Promise<Array>}
 */
userModel.getAllUsers = async () => {
    try {
        const  rows  = await pool.query("SELECT * FROM users");
        console.log( rows );
        return rows;
    } catch (error) {
        console.error("Error fetching all users: ", error.message);
    }
}

/**
 * Query to fetch a specific user by username and password from the users table
 * @param {string} username 
 * @param {string} password 
 * @returns {Promise<Object>}
 */
userModel.getUserByUserNameAndPassword = async ( email , password ) => {
    try {
        const [ rows ] = await pool.query("SELECT * FROM users WHERE email = ? AND password = ?", [ email , password ]);
        return rows; // Assuming username is unique, return the first user found
    } catch (error) {
        console.error("Error fetching user by username and password : ", error.message);
    }
}

/**
 * Query to insert a new user into the users table 
 * @param {string} username 
 * @param {string} password 
 * @param {string} email
 * @returns {Promise<void>} 
 */
userModel.addUser = async ( username , password , email , profesor_id , role ) => {
    try {
        await pool.query("INSERT INTO users ( username , password , email , profesor_id , role ) VALUES ( ? , ? , ? , ? , ? )", [ username , password , email , profesor_id , role ]);
    } catch (error) {
        console.error("Error adding user: ", error.message);
    }
}

/**
 * Query to delete a user by id from users table
 * @param {number} id
 * @returns {Promise<void>} 
 */
userModel.deleteUserById = async ( id ) => {
    try {
        await pool.query("DELETE FROM users WHERE id = ?", [id]);
    } catch (error) {
        console.error("Error deleting user by id: ",error.message);
    }
}

export default userModel;