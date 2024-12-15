import Router from 'express';
import auditLogController from '../controllers/auditLogController';
import { auditLogDataValidator } from '../validators/auditLogValidator';

const router = Router();

router.post("/",auditLogDataValidator,auditLogController.addAuditLog );
router.get("/",auditLogController.getAuditLogs);
router.get("/:id",auditLogController.getAuditLog);
router.delete("/:id",auditLogController.deleteAuditLog);

export default router;