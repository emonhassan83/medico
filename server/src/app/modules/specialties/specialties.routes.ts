import express from "express";
import { SpecialtiesController } from "./specialties.controller";
import auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";
import { SpecialtiesValidation } from "./specialties.validation";
import validateRequest from "../../middlewares/validateRequest";

const router = express.Router();

router.get("/", SpecialtiesController.getAllSpecialties);

router.post(
  "/",
  auth(UserRole.ADMIN),
  validateRequest(SpecialtiesValidation.create),
  SpecialtiesController.createSpecialties,
);

router.get('/:id', auth(UserRole.ADMIN), SpecialtiesController.getByIdFromDB);

router.patch(
  '/:id',
  auth(UserRole.ADMIN),
  validateRequest(SpecialtiesValidation.update),
  SpecialtiesController.updateIntoDB,
);

router.delete(
  "/:id",
  auth(UserRole.ADMIN),
  SpecialtiesController.deleteSpecialties
);

export const SpecialtiesRoutes = router;
