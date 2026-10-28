import express from 'express';
import { PaymentController } from './payment.controller';
import auth from '../../middlewares/auth';
import { UserRole } from '@prisma/client';

const router = express.Router();

router.post(
    '/init-payment/:appointmentId',
    auth(UserRole.PATIENT, UserRole.ADMIN),
    PaymentController.initPayment
);

//* validate payment manually
router.patch(
    '/validate/:appointmentId',
    auth(UserRole.ADMIN, UserRole.RECEPTIONIST),
    PaymentController.validatePaymentManually
);

router.post(
    '/success',
    PaymentController.redirectSuccessPaymentUrl
);

router.post(
    '/cancel',
    PaymentController.redirectCancelPaymentUrl
);

router.post(
    '/fail',
    PaymentController.redirectFailPaymentUrl
);

router.get(
    '/ipn',
    PaymentController.validatePayment
);

export const PaymentRoutes = router;