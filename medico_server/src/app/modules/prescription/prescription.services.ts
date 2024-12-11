import prisma from '../../../shared/prisma';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { IAuthUser, IGenericResponse } from '../../../interfaces/common';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import {
  AppointmentStatus,
  PaymentStatus,
  Prescription,
  Prisma,
} from '@prisma/client';
import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';
import {
  prescriptionRelationalFields,
  prescriptionRelationalFieldsMapper,
} from './prescription.constants';

const insertIntoDB = async (
  data: Partial<Prescription>,
  user: any,
): Promise<Prescription> => {
  const isAppointmentExists = await prisma.appointment.findFirstOrThrow({
    where: {
      id: data.appointmentId,
      paymentStatus: PaymentStatus.PAID,
    },
    include: {
      doctor: true,
    },
  });

  if (!(user.email === isAppointmentExists.doctor.email)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'This is not your appointment!');
  }
  const result = await prisma.$transaction(async tx => {
    await tx.appointment.update({
      where: {
        id: isAppointmentExists.id,
      },
      data: {
        status: AppointmentStatus.COMPLETED,
      },
    });

    const prescriptionData = await tx.prescription.create({
      data: {
        appointmentId: isAppointmentExists.id,
        doctorId: isAppointmentExists.doctorId,
        patientId: isAppointmentExists.patientId,
        followUpDate: data.followUpDate || null,
        instructions: data.instructions as string,
      },
    });
    return prescriptionData;
  });

  return result;
};

const patientPrescriptions = async (
  user: any,
  filters: any,
  options: IPaginationOptions,
): Promise<IGenericResponse<Prescription[]>> => {
  const { limit, page, skip } = paginationHelpers.calculatePagination(options);
  const { ...filterData } = filters;
  const andConditions = [];
  
  if (user.email) {
    andConditions.push({
      patient: {
        email: user.email,
      },
    });
  }

  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      AND: Object.keys(filterData).map(key => {
        if (prescriptionRelationalFields.includes(key)) {
          return {
            [prescriptionRelationalFieldsMapper[key]]: {
              email: (filterData as any)[key],
            },
          };
        } else {
          return {
            [key]: {
              equals: (filterData as any)[key],
            },
          };
        }
      }),
    });
  }
  const whereConditions: Prisma.PrescriptionWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.prescription.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? { [options.sortBy]: options.sortOrder }
        : {
            createdAt: 'desc',
          },
    include: {
      doctor: true,
      patient: true,
      appointment: true,
    },
  });
  const total = await prisma.prescription.count({
    where: whereConditions,
  });

  return {
    meta: {
      total,
      page,
      limit,
    },
    data: result,
  };
};

const getAllFromDB = async (
  filters: any,
  options: IPaginationOptions,
): Promise<IGenericResponse<Prescription[]>> => {
  const { limit, page, skip } = paginationHelpers.calculatePagination(options);
  const { searchTerm, ...filterData } = filters;
  const andConditions = [];

  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      AND: Object.keys(filterData).map(key => {
        if (prescriptionRelationalFields.includes(key)) {
          return {
            [prescriptionRelationalFieldsMapper[key]]: {
              email: (filterData as any)[key],
            },
          };
        } else {
          return {
            [key]: {
              equals: (filterData as any)[key],
            },
          };
        }
      }),
    });
  }

  const whereConditions: Prisma.PrescriptionWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.prescription.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? { [options.sortBy]: options.sortOrder }
        : {
            createdAt: 'desc',
          },
    include: {
      doctor: true,
      patient: true,
      appointment: true,
    },
  });
  const total = await prisma.prescription.count({
    where: whereConditions,
  });

  return {
    meta: {
      total,
      page,
      limit,
    },
    data: result,
  };
};

const getByIdFromDB = async (id: string): Promise<Prescription | null> => {
  const result = await prisma.prescription.findUnique({
    where: {
      id,
    },
    include: {
      doctor: true,
      patient: true,
      appointment: true,
    },
  });
  return result;
};

const deleteFromDB = async (
  id: string,
  user: IAuthUser,
): Promise<Prescription | null> => {
  await prisma.user.findFirstOrThrow({
    where: {
      id: user?.userId,
    },
  });

  const result = await prisma.prescription.delete({
    where: {
      id,
    },
  });
  return result;
};

export const PrescriptionService = {
  insertIntoDB,
  patientPrescriptions,
  getAllFromDB,
  getByIdFromDB,
  deleteFromDB,
};
