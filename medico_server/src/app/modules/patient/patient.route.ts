import express from 'express';
import { PatientController } from './patient.controller';
import auth from '../../middlewares/auth';
import { UserRole } from '@prisma/client';
import validateRequest from '../../middlewares/validateRequest';
import { patientValidation } from './patient.validations';

const router = express.Router();

// router.get('/', auth(UserRole.ADMIN), PatientController.getAllFromDB);
router.get('/', PatientController.getAllFromDB);

router.get(
  '/:id',
  auth(UserRole.ADMIN, UserRole.DOCTOR),
  PatientController.getByIdFromDB,
);

router.patch(
  '/:id',
  auth(UserRole.ADMIN, UserRole.PATIENT),
  validateRequest(patientValidation.PatientSchema),
  PatientController.updateIntoDB,
);

router.delete('/:id', auth(UserRole.ADMIN), PatientController.deleteFromDB);

router.delete('/soft/:id', auth(UserRole.ADMIN), PatientController.softDelete);

export const PatientRoutes = router;
