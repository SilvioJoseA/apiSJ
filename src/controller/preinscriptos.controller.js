import { pool } from "../db.js";
import preinscriptosModel from "../model/preinscriptos.model.js";

/*
{
    fullName: "",
    dni: "",
    gender: "",
    birthDate: "",
    address: "",
    phone: "",
    email: "",
    isMinor: false,
    guardianFullName: "",
    guardianDni: "",
    guardianPhone: "",
    guardianEmail: ""
  }
*/
const controller = {};
 
 /**
  * Function to create preinscriptos table
  * @param {Object} req 
  * @param {Object} res 
  */
 controller.createTablePreinscriptos = async ( req , res ) => {
    try {
        await preinscriptosModel.createTablePreinscriptos();
        res.status(201).json({ message: "Preinscriptos table created successfully!" });
    } catch (error) {
        console.error("Error creating preinscriptos table : ", error.message);
        throw new Error("Error creating preinscriptos table!");
        
    }
 }
  
 /**
  * Function to feching all preinsctriptos from preinscriptos table.
  * @param {Object} req 
  * @param {Object} res 
  */
 controller.getAllPreInscriptos = async ( req , res ) => {
    try {
        const rows = await preinscriptosModel.getAllPreinscriptos();
        res.status(200).json(rows); 
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Anything was wrong!"});
    }
 }
 
 /**
  * Function to inser a preinscripto into preinscriptos table
  * @param {Object} req 
  * @param {Object} res 
  */ 
 controller.addPreinscripto = async ( req , res ) => {
    try {
        const { name , lastname , dni , sexo , birthday , direction , phone , email } = req.body;
        const [ row ] = await preinscriptosModel.addPreinscripto(name , lastname , dni , sexo ,birthday , direction , phone , email);
            res.status(201).json(row);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Something was wrong!"});
    }
 }

 /**
  * Function to delete a preinscripto by id from preinscriptos table
  * @param {Object} req 
  * @param {Object} res 
  */
 controller.deletePreInsptoById = async ( req , res ) => {
    try {
        const { id } = req.params;
        const [ row ] = await preinscriptosModel.deletePrinscriptosById(id);
            res.json(row);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Anything was wrong!"});
    }
 }
 export default controller;