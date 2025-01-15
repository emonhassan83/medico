import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import { PaymentService } from "./payment.service";
import config from "../../../config";

const initPayment = catchAsync(async (req: Request, res: Response) => {
    const {appointmentId} = req.params;
  const result = await PaymentService.initPayment(appointmentId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Payment initiate successfully!",
    data: result,
  });
});

const validatePayment = catchAsync(async (req: Request, res: Response) => {
  const result = await PaymentService.validatePayment(req?.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Payment validate successfully!",
    data: result,
  });
});

const validatePaymentManually = catchAsync(async (req: Request, res: Response) => {
  const {appointmentId} = req.params;
  
  const result = await PaymentService.validatePaymentManually(appointmentId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Payment validate successfully!",
    data: result,
  });
});

const redirectSuccessPaymentUrl = catchAsync(async (req: Request, res: Response) => {
  res.redirect(`${config.client_url}/payment?status=success`);
});

const redirectCancelPaymentUrl = catchAsync(async (req: Request, res: Response) => {
  res.redirect(`${config.client_url}/payment?status=cancel`);
});

const redirectFailPaymentUrl = catchAsync(async (req: Request, res: Response) => {
  res.redirect(`${config.client_url}/payment?status=fail`);
});

export const PaymentController = {
  initPayment,
  validatePayment,
  redirectSuccessPaymentUrl,
  redirectCancelPaymentUrl,
  redirectFailPaymentUrl,
  validatePaymentManually
};
