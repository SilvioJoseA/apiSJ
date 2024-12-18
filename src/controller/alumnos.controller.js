import alumnosModel from "../model/alumnos.model.js";
import filesController from "./files.controller.js";
const controller = {};
    
    /**
     * Function to create alumnos table 
     * @param {Object} req 
     * @param {Object} res 
     */
    controller.createTableAlumnos = async ( req , res ) => {
        try {
            await alumnosModel.createTableAlumnos();
            res.status(201).json({ message: "Alumnos table created successfully!"});
        } catch (error) {
            console.error(`Error createng alumnos table :`, error.message);
        }
    }
    /**
     * Function to create alumnos table by ciclo lectivo
     * @param {Object} req 
     * @param {Object} res 
     */
    controller.createTableAlumnosByCicloLectivo = async ( req , res ) => {
        try {
            const {cicloLectivo} = req.params;
            await alumnosModel.createTableAlumnosByClicloLectivo(cicloLectivo);
            res.status(201).json({message:"Alumnos table created successfully!"});
        } catch (error) {
            console.error(`Error creating alumnos table by cicloLectivo : `, error.message);
        }
    }
    /**
     * Function to fetch all alumnos from alumnos table
     * @param {Object} req 
     * @param {Object} res 
     */
    controller.getAllAlumnos = async ( req , res ) => {
        try {
            const rows = await alumnosModel.getAllAlumnos();
            res.status(201).json(rows);
        } catch (error) {
            console.error("Error fetching all Alumnos from alumnos table :", error.message);
        }
    }
    controller.verifyDni = async (req, res) => {
        try {
            const { dni } = req.body;
            if (!dni) {
                return res.status(400).json({ message: "El campo DNI es obligatorio." });
            }
    
            var row = await alumnosModel.verifyDni(dni);

            if (row) {
                row = await alumnosModel.verifyStatusInscription(dni);
                res.status(200).json(row); 
            } else {
                res.status(200).json({message:'Apto'}); 
            }
    
        } catch (error) {
            console.error("Error verifying DNI:", error.message);
            res.status(500).json({ message: "Error interno del servidor al verificar el DNI." }); // Código 500 para errores del servidor
        }
    };
    
    controller.updateStatusById = async ( req , res ) => {
        try {
            const { id } = req.params;
            const { status } = req.body;
            await alumnosModel.updateStatusById(id,status);
            res.status(201).json("Status updated successfully!");
        } catch (error) {
            console.error("Error updating status by id : ",error.message);
        }
    }
    controller.updateInscriptionById = async ( req , res ) => {
        try {
            const { id } = req.params;
            const { inscripcion } = req.body;
            await alumnosModel.updatedInscriptionById(id,inscripcion);
            res.status(201).json({message:"Inscription updated successfully!"})
        } catch (error) {
            console.error("Error updating inscription by id : ",error.message);
        }
    }
    controller.updateCursoByCursoId= async ( req , res ) => {
        try {
            const { id } = req.params;
            const { curso_id } = req.body;
            await alumnosModel.updateCursoByCursoId(curso_id,id);
            res.status(201).json({message:"curso updated successfully!"})
        } catch (error) {
            console.error("Error updating curso by id : ",error.message);
        }
    }
    controller.getAllAlumnosByIdProfesor = async ( req , res ) => {
        try {
            const { id_profesor } = req.params;
            const rows = await alumnosModel.getAllAlumnosByIdProfesor( id_profesor );
            res.status(201).json(rows);
        } catch (error) {
            console.error("Error fetching all alumnos by id_profesor : ",error.message);
        }
    }
    /**
     * Function to insert alumno into alumnos table
     * @param {Object} req 
     * @param {Object} res 
     */
    controller.addAlumno = async ( req , res ) => {
        try {
            const { cicloLectivo } = req.params;
            const alumnosData = req.body;
                const row = await alumnosModel.insertAlumno(alumnosData,cicloLectivo);
                res.status(201).json(row);
        } catch (error) {
            console.error("Error adding alumno into alumnos table : ", error.message);
        }
    }
    /**
     * Function to update alumno by id
     * @param {Object} req 
     * @param {Object} res 
     */
    controller.updateAlumnoById = async ( req , res ) => {
        try {
            const id = req.params;
            const alumnoData = req.body;
            await alumnosModel.updateAlumnoById(id,alumnoData);
            res.status(201).json({ message: "Alumno updated successfully!"});
        } catch (error) {
            console.error("Error updating alumno by id : ", error.message);
        }
    }
    /**
     * Function to delete a alumno by id from alumnos table
     * @param {Object} req 
     * @param {Object} res 
     */
    controller.deleteAlumnoById = async ( req , res ) => {
        try {
            const { id } = req.params;
                await alumnosModel.deleteAlumnoById(id);
                res.status(201).json({ message: "Alumno deleted successfully!"});
        } catch (error) {
            console.error("Error deleting alumno by id from alumnos table :", error.message);
        }
    }
    /**
     * Function to get alumno by id from alumnos table
     * @param {Object} req 
     * @param {Object} res 
     */
    controller.getAlunoById = async ( req , res ) => {
        try {
            const { id } = req.params;
            const row = await alumnosModel.getAlumnoById(id);
            res.status(201).json(row[0]);
        } catch (error) {
            console.error("Error fetching alumno by id :", error.message);
        }
    } 

    /**
    * Function to insert massive alumnos into alumnos table
    * @param {Object} req 
    * @param {Object} res 
    */
controller.insertAlumnosMassiveData = async ( req , res ) => {
    try {
        const cursosData = await filesController.readFile('./../files/alumnos.xls');
        const values = cursosData.map( ({ nombalu,apellalu,dnialu,sexoalu,fecnacal,direcalu,celualu,emailalu,identif_cu }) => [apellalu,nombalu,dnialu,sexoalu,fecnacal,direcalu,celualu,emailalu,identif_cu ]);
            console.log("Longitud de array : ",values.length);
            await alumnosModel.inserAlumnosMassive(values);
            res.status(200).json({message:"Alumnos inserted successfully!"});
    } catch (error) {
        console.error("Error inserting data : " , error.message);
    }
}

controller.calculateAverageEscritoById = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id || isNaN(id)) {
            return res.status(400).json({ message: "ID inválido. Debe ser un número válido." });
        }
        await alumnosModel.toCalculateAverageEscritoById(id);
        res.status(200).json({ message: "Promedio escrito calculado y actualizado con éxito." });
    } catch (error) {
        console.error("Error calculating average escrito:", error.message);
        res.status(500).json({ message: "Error al calcular el promedio escrito.", error: error.message });
    }
};

controller.calculateAverageOralById = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id || isNaN(id)) {
            return res.status(400).json({ message: "ID inválido. Debe ser un número válido." });
        }
        await alumnosModel.toCalculateAverageOralById(id);
        res.status(200).json({ message: "Promedio oral calculado y actualizado con éxito." });
    } catch (error) {
        console.error("Error calculating average oral:", error.message);
        res.status(500).json({ message: "Error al calcular el promedio oral.", error: error.message });
    }
};
controller.calculateAverageOralByAll = async (req, res) => {
    try {
        await alumnosModel.toCalculateAverageOralForAll(); 
        res.status(200).json({ message: "Promedio oral calculado y actualizado con éxito para todos los alumnos." });
    } catch (error) {
        console.error("Error calculating average oral for all:", error.message);
        res.status(500).json({ message: "Error al calcular el promedio oral para todos los alumnos.", error: error.message });
    }
};

controller.calculateAverageEscritoByAll = async (req, res) => {
    try {
        await alumnosModel.toCalculateAverageEscritoForAll(); 
        res.status(200).json({ message: "Promedio escrito calculado y actualizado con éxito para todos los alumnos." });
    } catch (error) {
        console.error("Error calculating average escrito for all:", error.message);
        res.status(500).json({ message: "Error al calcular el promedio escrito para todos los alumnos.", error: error.message });
    }
};

controller.calculateAverageGeneral = async ( req , res ) => {
    try {
        await alumnosModel.toCalculateGeneralAverage();
        res.status(200).json({message:"Average General calculated successfully!"});
    } catch (error) {
        console.error("Error calculating average general : ",error.message);
    }
}

export default controller;