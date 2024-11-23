import express from 'express';
import { ReceptionistController } from './receptionist.controller';
import validateRequest from '../../middlewares/validateRequest';
import auth from '../../middlewares/auth';
import { UserRole } from '@prisma/client';
import { receptionistValidationSchemas } from './receptionist.validation';

const router = express.Router();

router.get('/', auth(UserRole.ADMIN), ReceptionistController.getAllFromDB);

router.get('/:id', auth(UserRole.ADMIN), ReceptionistController.getByIdFromDB);

router.patch(
  '/:id',
  auth(UserRole.ADMIN),
  validateRequest(receptionistValidationSchemas.update),
  ReceptionistController.updateIntoDB,
);

router.delete('/:id', auth(UserRole.ADMIN), ReceptionistController.deleteFromDB);

router.delete(
  '/soft/:id',
  auth(UserRole.ADMIN),
  ReceptionistController.softDeleteFromDB,
);

export const AdminRoutes = router;
