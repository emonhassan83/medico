import express from 'express';
import { AppointmentController } from './appointment.controller';
import auth from '../../middlewares/auth';
import { UserRole } from '@prisma/client';
import validateRequest from '../../middlewares/validateRequest';
import { AppointmentValidation } from './appointment.validation';

const router = express.Router();

router.post(
  '/',
  // auth(UserRole.PATIENT),
  validateRequest(AppointmentValidation.create),
  AppointmentController.createAppointment,
);

router.get(
<<<<<<< HEAD
    '/',
    auth(UserRole.RECEPTIONIST, UserRole.ADMIN, UserRole.PATIENT),
    AppointmentController.getAllFromDB
=======
  '/',
  // auth(UserRole.RECEPTIONIST, UserRole.PATIENT, UserRole.ADMIN),
  AppointmentController.getAllFromDB,
>>>>>>> b2028668b1b3acba9ed65b5a553bb3e59fb0f9cf
);

router.get(
  '/my-appointment',
  auth(UserRole.DOCTOR, UserRole.PATIENT),
  AppointmentController.getMyAppointment,
);

router.patch(
  '/status/:id',
  // auth(UserRole.RECEPTIONIST, UserRole.ADMIN, UserRole.DOCTOR),
  AppointmentController.changeAppointmentStatus,
);

export const AppointmentRoutes = router;
