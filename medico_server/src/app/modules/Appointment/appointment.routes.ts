import express from 'express';
import { AppointmentController } from './appointment.controller';
import auth from '../../middlewares/auth';
import { UserRole } from '@prisma/client';
import validateRequest from '../../middlewares/validateRequest';
import { AppointmentValidation } from './appointment.validation';

const router = express.Router();

router.post(
  '/',
  auth(UserRole.PATIENT),
  validateRequest(AppointmentValidation.create),
  AppointmentController.createAppointment,
);

router.get(
  '/',
  auth(UserRole.RECEPTIONIST, UserRole.PATIENT, UserRole.ADMIN, UserRole.DOCTOR),
  AppointmentController.getAllFromDB,
);

router.get(
  '/my-appointment',
  auth(UserRole.DOCTOR, UserRole.PATIENT),
  AppointmentController.getMyAppointment,
);

router.patch(
  '/status/:id',
  auth(UserRole.RECEPTIONIST, UserRole.ADMIN, UserRole.DOCTOR),
  AppointmentController.changeAppointmentStatus,
);

router.delete(
  '/:id',
  auth(UserRole.RECEPTIONIST, UserRole.ADMIN, UserRole.DOCTOR),
  AppointmentController.deleteAppointment,
);

export const AppointmentRoutes = router;
