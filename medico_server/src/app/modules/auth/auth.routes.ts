import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AuthController } from './auth.controller';
import { AuthValidation } from './auth.validation';
import auth from '../../middlewares/auth';
import { UserRole } from '@prisma/client';

const router = express.Router();

router.post(
    '/login',
    validateRequest(AuthValidation.loginZodSchema),
    AuthController.loginUser
);

router.post(
    '/refresh-token',
    validateRequest(AuthValidation.refreshTokenZodSchema),
    AuthController.refreshToken
);

router.post(
    '/change-password',
    validateRequest(AuthValidation.changePasswordZodSchema),
    auth(
        UserRole.ADMIN,
        UserRole.RECEPTIONIST,
        UserRole.DOCTOR,
        UserRole.PATIENT
    ),
    AuthController.changePassword
);

router.post(
    '/forgot-password',
    AuthController.forgotPass
);

router.post(
    '/reset-password',
    AuthController.resetPassword
);

export const AuthRoutes = router;