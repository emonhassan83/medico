import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { Request, Response } from "express";
import { SpecialtiesService } from "./specialties.service";

const createSpecialties = catchAsync(async (req: Request, res: Response) => {
    const result = await SpecialtiesService.insertIntoDB(req.body, req.user);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Specialties created successfully!",
        data: result
    });
});

const getAllSpecialties = catchAsync(async (req: Request, res: Response) => {
  const result = await SpecialtiesService.getAllFromDB();
  sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Specialties data fetched successfully',
      data: result,
  });
});

const deleteSpecialties = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await SpecialtiesService.deleteFromDB(id);

  sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Specialty deleted successfully',
      data: result,
  });
});

export const SpecialtiesController = {
  createSpecialties,
  getAllSpecialties,
  deleteSpecialties,
};