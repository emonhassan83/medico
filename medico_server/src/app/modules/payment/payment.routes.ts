import express from 'express';
import { PaymentController } from './payment.controller';

const router = express.Router();

router.post(
    '/init-payment/:appointmentId',
    PaymentController.initPayment
);

//* validate payment manually
router.patch(
    '/validate/:appointmentId',
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