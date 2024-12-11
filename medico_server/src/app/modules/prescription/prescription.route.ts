import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { PrescriptionValidation } from './prescription.validations';
import { PrescriptionController } from './prescription.controller';
import auth from '../../middlewares/auth';
import { UserRole } from '@prisma/client';

const router = express.Router();

router.get(
  '/my-prescriptions',
  auth(UserRole.PATIENT),
  PrescriptionController.patientPrescription,
);

router.get(
  '/',
  auth(UserRole.RECEPTIONIST, UserRole.DOCTOR, UserRole.PATIENT),
  PrescriptionController.getAllFromDB,
);

router.get(
  '/:id',
  auth(UserRole.RECEPTIONIST, UserRole.DOCTOR, UserRole.PATIENT),
  PrescriptionController.getByIdFromDB,
);

router.post(
  '/',
  auth(UserRole.DOCTOR),
  validateRequest(PrescriptionValidation.create),
  PrescriptionController.insertIntoDB,
);

router.delete(
  '/:id',
  auth(UserRole.DOCTOR, UserRole.PATIENT),
  PrescriptionController.deleteFromDB,
);

export const PrescriptionsRoutes = router;
