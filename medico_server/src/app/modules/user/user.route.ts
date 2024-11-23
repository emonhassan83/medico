import express, { NextFunction, Request, Response } from 'express';
import { UserController } from './user.controller';
import validateRequest from '../../middlewares/validateRequest';
import { UserValidation } from './user.validations';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';
import { UserRole } from '@prisma/client';

const router = express.Router();

router.get(
  '/',
  // auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
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

router.post('/create-doctor', UserController.createDoctor);

router.post(
  '/create-admin',
  // auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  validateRequest(UserValidation.createAdmin),
  UserController.createAdmin,
);

router.post(
  '/create-patient',
  auth(ENUM_USER_ROLE.ADMIN),
  UserController.createPatient,
);
router.post(
  '/create-receptionist',
  auth(ENUM_USER_ROLE.ADMIN),
  UserController.createReceptionist,
);

router.patch(
  '/:id/status',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
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
