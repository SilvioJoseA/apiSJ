import alumnosModel from "../model/alumnos.model.js";
import cursosModel from "../model/cursos.model.js";
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
            const { proximociclo } = req.params;
            const rows = await alumnosModel.getAllAlumnos(proximociclo);
            res.status(201).json(rows);
        } catch (error) {
            console.error("Error fetching all Alumnos from alumnos table :", error.message);
        }
    }
    controller.dniRegistred = async ( req , res ) => {
        try {
            const { dni , ciclolectivo } = req.body;
            if(!ciclolectivo=='2025' || !ciclolectivo=='2026' || !ciclolectivo=='2027') res.status(201).json({message:"ciclolective format bad structured!"});
            if(!dni) res.status(201).json({message:"El campo DNI es obligatorio!"});
            const row = await alumnosModel.dniRegistred(ciclolectivo,dni);
            res.status(201).json(row[0]);
        } catch (error) {
            console.error("Error fetching dni registred : ",error.message);
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
                const curso = await cursosModel.getCursoById(row.curso_id);
                if( curso.nivel == 'PREPARATORIO 1' || curso.nivel == 'PREPARATORIO 2' || curso.nivel == 'KINDER') {
                   row = await alumnosModel.verifyStatusInscriptionKinderPreparatorio(dni);
                } else { 
                    row = await alumnosModel.verifyStatusInscription(dni);
                    
                }
                res.status(200).json(row); 
            } else {
                res.status(200).json({message:'Apto'}); 
            }
        } catch (error) {
            console.error("Error verifying DNI:", error.message);
            res.status(500).json({ message: "Error interno del servidor al verificar el DNI." }); 
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
            const { curso_id , curso_id_old } = req.body;
            await alumnosModel.updateCursoByCursoId(curso_id,id,curso_id_old);
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
            const { id,cicle } = req.params;
                if( cicle ){
                    await alumnosModel.deleteAlumnoById(id,cicle);
                } else {
                    await alumnosModel.deleteAlumnoById(id);
                }
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
            const { ciclo , id } = req.params;
            console.log(ciclo);
            if(ciclo){
                const row = await alumnosModel.getAlumnoById(id,ciclo);  
                res.status(201).json(row[0]); 
            } else {
                const row = await alumnosModel.getAlumnoById(id);
                res.status(201).json(row[0]);
            }
        } catch (error) {
            console.error("Error fetching alumno by id :", error.message);
        }
    } 

    /**
    * Function to insert massive alumnos into alumnos table
    * @param {Object} req 
    * @param {Object} res 
    */
    controller.insertAlumnosMassiveData = async (req, res) => {
        try {
            const cursosData = await filesController.readFile('./../files/alumnos.xls');
            
            // Lista de identif_cu permitidos
            const listaIdentif_cu = [
                99, 142, 392, 397, 464, 532, 550, 597, 614, 617, 620, 642, 647, 649, 650, 663, 664, 665, 666, 667, 674, 676, 692, 693, 702, 708, 709, 710, 712, 716, 718, 724, 725, 732, 748, 752, 753, 754, 762, 763, 764, 771, 772, 773
            ];
    
            // Filtrar los estudiantes cuyos identif_cu estén en la lista
            const filteredValues = cursosData
                .filter(({ identif_cu }) => listaIdentif_cu.includes(identif_cu))
                .map(({ nombalu, apellalu, dnialu, sexoalu, fecnacal, direcalu, celualu, emailalu, identif_cu }) => [
                    apellalu, nombalu, dnialu, sexoalu, fecnacal, direcalu, celualu, emailalu, identif_cu
                ]);
    
            console.log("Longitud de array filtrado: ", filteredValues.length);
    
            // Insertar solo los estudiantes filtrados
          //  await alumnosModel.inserAlumnosMassive(filteredValues);
    
            res.status(200).json({ message: "Alumnos filtrados e insertados exitosamente!" });
        } catch (error) {
            console.error("Error insertando datos: ", error.message);
            res.status(500).json({ message: "Error al insertar los datos" });
        }
    };

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
controller.counterAlumnos = async ( req , res ) => {
    try {
        const {cicle} = req.params;
        console.log(cicle);
        const total_alumnos = await alumnosModel.counterAlumnos(cicle);

        res.status(200).json(total_alumnos[0]);
    } catch (error) {
        console.error("Error counted alumnos :",error.message);
    }
}
controller.toMakePriceMonth = ( alumno ) => {
    try {
            if(alumno.type_cuota=='type1'){
                return alumno.price_month;
            }else if(alumno.type_cuota=='type2'){
                return alumno.price_month-alumno.price_month*0.07;
            }else if (alumno.type_cuota=='type3'){
                return alumno.price_month-alumno.price_month*0.5;
            }
    } catch (error) {
        console.error(error);
    }
}
/**
 * Function to updated Type Of Cuota
 * @param {Object} req 
 * @param {Object} res 
 */
controller.updateTypeCuotaById = async ( req , res ) => {
    try {
        const typeCuota = req.body.typeCuota;
        const { id, ciclo } = req.params;
        if (!typeCuota || !id) {
            return res.status(400).json({ message: "Type of cuota and id are required!" });
        }
        await alumnosModel.updateTypeCuotaById(id,typeCuota,ciclo);
        return res.status(200).json({message:"Updated successfylly!"});
    } catch (error) {
        console.error("Error updating type of cuota by id:"+error);
    }
}
controller.toMakeObjectPayerAndAmount = async ( req , res ) => {
    try {
        const { id } = req.params;
        const alumno = await alumnosModel.getAlumnoById(id,'2025');
        const objectPayer = {
            name: `${alumno[0].firstName} ${alumno[0].lastName}`.trim(),
            email: alumno[0].email,
            identification: {
                type: "DNI_ARG",
                number: alumno[0].dni,
                country: "ARG"
            }
        };
        const amount = controller.toMakePriceMonth(alumno[0]);
        res.status(201).json({objectPayer:objectPayer,amount:amount});
    } catch (error) {
        console.error("Error making object payer :"+error.message);
    }
}
export default controller;