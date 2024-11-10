import { Router } from "express";
import controller from "../controller/amd.controller.js";

const router = Router();

    router.get('/amd/talents', controller.showAllTables);
    router.get('/amd/show', controller.showTables);
    router.get('/amd/soft_skills', controller.getSoftSkills);
    router.get('/amd/emplyment_soft_skills', controller.getEmploymentSoftSkills);
    router.get('/amd/quiz_questions', controller.getQuizQuestions);
    router.get('/amd/quiz_stages', controller.getQuizStages);
    router.get('/amd/quiz_options', controller.getQuizOptions);
    router.get('/amd/select/:tableName', controller.getAllTablesByName);
    router.delete('/amd/languages/:id', controller.deleteLeguagesById);
   // router.delete('/amd/talent_languages', controller.deleteTalentLanguage);
    router.delete('/amd/talent_lenguages/:lenguage_id', controller.deleteTalentLanguageByIdLanguage);
    router.get('/amd/quiz_stages_questions_options', controller.getStagesAndQuestionsAndOrders);

export default router;