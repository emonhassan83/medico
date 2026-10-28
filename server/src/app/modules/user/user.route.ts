import express from 'express';
import { UserController } from './user.controller';
import validateRequest from '../../middlewares/validateRequest';
import { UserValidation } from './user.validations';
import auth from '../../middlewares/auth';
import { UserRole } from '@prisma/client';

const router = express.Router();

router.get(
  '/',
  auth(UserRole.ADMIN, UserRole.RECEPTIONIST),
  UserController.getAllUser,
);

router.get(
  '/me',
  auth(
    UserRole.ADMIN,
    UserRole.RECEPTIONIST,
    UserRole.DOCTOR,
    UserRole.PATIENT,
  ),
  UserController.getMyProfile,
);

router.post(
  '/create-admin',
  auth(UserRole.ADMIN),
  validateRequest(UserValidation.createAdmin),
  UserController.createAdmin,
);

router.post(
  '/create-receptionist',
  auth(UserRole.ADMIN),
  validateRequest(UserValidation.createReceptionist),
  UserController.createReceptionist,
);

router.post(
  '/create-doctor',
  validateRequest(UserValidation.createDoctor),
  auth(UserRole.ADMIN),
  UserController.createDoctor,
);

router.post(
  '/create-patient',
  // auth(UserRole.ADMIN),
  validateRequest(UserValidation.createPatient),
  UserController.createPatient,
);

router.patch(
  '/:id/status',
  auth(UserRole.ADMIN),
  validateRequest(UserValidation.updateStatus),
  UserController.changeProfileStatus,
);

router.patch(
  '/update-my-profile',
  auth(
    UserRole.ADMIN,
    UserRole.RECEPTIONIST,
    UserRole.DOCTOR,
    UserRole.PATIENT,
  ),
  UserController.updateMyProfile,
);

export const userRoutes = router;
