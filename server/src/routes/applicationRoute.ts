import Router from 'express';
import applicationController from '../controllers/applicationController';

const router = Router();

router.get("/",applicationController.getAllApplications);

export default router;