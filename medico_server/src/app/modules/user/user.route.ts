import express, { NextFunction, Request, Response } from 'express';
import { UserController } from './user.controller';
import validateRequest from '../../middlewares/validateRequest';
import { UserValidation } from './user.validations';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';

const router = express.Router();

router.get(
  '/',
  // auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  UserController.getAllUser,
);

router.get(
  '/me',
  auth(
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.DOCTOR,
    ENUM_USER_ROLE.PATIENT,
    ENUM_USER_ROLE.SUPER_ADMIN,
  ),
  UserController.getMyProfile,
);

router.post('/create-doctor', UserController.createDoctor);

router.post(
  '/create-admin',
  // auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  UserController.createAdmin,
);

router.post('/create-patient', UserController.createPatient);

router.patch(
  '/:id/status',
  auth(ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.ADMIN),
  validateRequest(UserValidation.updateStatus),
  UserController.changeProfileStatus,
);

router.patch(
  '/update-my-profile',
  auth(
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.DOCTOR,
    ENUM_USER_ROLE.PATIENT,
  ),
  UserController.updateMyProfile,
);

export const userRoutes = router;
