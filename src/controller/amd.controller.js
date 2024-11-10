import { pool } from "../db.js";
import { pool1 } from "../dbAMD.js";

const controller = {};

    controller.showAllTables = async ( req , res ) => {
        try {
            const [ rows ] = await pool1.query("SELECT * FROM talents");
            res.json(rows);
        } catch (error) {
            console.error(error.message);
        }
    }
    
    controller.showTables = async ( req , res ) => {
        try {
            const [ rows ] = await pool1.query("SHOW TABLES");
                res.json(rows);
        } catch (error) {
            console.error("Error -> ", error.message);
        }
    }

    controller.getSoftSkills = async ( req , res ) => {
        try {
            const rows  = await pool1.query("SELECT * FROM soft_skills");
            res.json(rows);
        } catch (error) {
            console.error("soft_skills data ->",error.message);
        }
    }
    //employment_soft_skills
    controller.getEmploymentSoftSkills = async ( req , res ) => {
        try {
            const rows  = await pool1.query("SELECT * FROM employment_soft_skills");
            res.json(rows);
        } catch (error) {
            console.error("employment_soft_skills data ->",error.message);
        }
    }
    //quiz_questions
    controller.getQuizQuestions = async ( req , res ) => {
        try {
            const rows  = await pool1.query("SELECT * FROM quiz_questions");
            res.json(rows);
        } catch (error) {
            console.error("quiz_questions data ->",error.message);
        }
    }
    //quiz_stages
    controller.getQuizStages = async ( req , res ) => {
        try {
            const rows  = await pool1.query("SELECT * FROM quiz_stages");
            res.json(rows);
        } catch (error) {
            console.error("quiz_stages data ->",error.message);
        }
    }
    // stages 
    controller.getStagesAndQuestionsAndOrders = async ( req , res ) => {
        try {
            const rowsStages = await pool1.query("SELECT id, `order`, name_es FROM quiz_stages");
            const rowsQuestions = await pool1.query("SELECT id, `order`, `type`, `amount`, `desc_es` FROM quiz_questions");
            const rowsOptions = await pool1.query("SELECT id, question_id, name_es, desc_es FROM quiz_options");
            
            // Relaciona cada pregunta con sus opciones
            const rowsQuestionsWichOptions = rowsQuestions[0].map(question => {
                const options = rowsOptions[0].filter(option => option.question_id === question.id);
                return {
                    ...question,
                    options: options
                };
            });
            
            // Relaciona cada etapa con sus preguntas y opciones
            const rowsStagesWichQuestionsAndOptions = rowsStages[0].map(stage => {
                const questions = rowsQuestionsWichOptions.filter(question => question.order === stage.order);
                return {
                    ...stage,
                    questions: questions  // Incluir todas las preguntas relacionadas con la etapa
                };
            });
            
            res.json(rowsStagesWichQuestionsAndOptions);
            
        } catch (error) {
            console.error(error.message);
        }
    }
    //quiz_option
    controller.getQuizOptions = async ( req , res ) => {
        try {
            const rows = pool1.query("SELECT * FROM quiz_options");
            res.json(rows);
        } catch (error) {
            console.error(error.message);
        }
    }
// Get all records from a specified table
controller.getAllTablesByName = async (req, res) => {
    try {
        const { tableName } = req.params;
        const query = `SELECT * FROM ${tableName}`;
        const rows = await pool1.query(query);
        res.json(rows);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "Server error" });
    }
};
//languages
controller.deleteLeguagesById = async ( req , res ) => {
    try {
        const { id } = req.params;
        const row = await pool1.query("DELETE FROM languages WHERE id = ?", [ id ]);
        res.json( row );
    } catch (error) {
        console.error(error.message);
    }
}
// Delete Lenguajes-talentes
controller.deleteTalentLanguageByIdLanguage = async (req, res) => {
    try {
        const { language_id } = req.params;
        const row = await pool1.query("DELETE FROM talent_languages WHERE language_id = ?", [language_id]);
        res.json({ affectedRows: row.affectedRows });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
}

controller.deleteTalentLanguage = async (req, res) => {
    try {
        const result = await pool1.query("DELETE FROM talent_languages WHERE lenguage_id = 26");
        res.json({ affectedRows: result.affectedRows });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
}
// stages

export default controller;