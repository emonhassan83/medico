import { Patient, Prisma, UserStatus } from '@prisma/client';
import { IPatientFilterRequest, IPatientUpdate } from './patient.interface';
import { patientSearchableFields } from './patient.constants';
import prisma from '../../shared/prisma';
import httpStatus from 'http-status';
import { IPaginationOptions } from '../../interfaces/pagination';
import { IGenericResponse } from '../../interfaces/common';
import { paginationHelpers } from '../../helpers/paginationHelper';
import ApiError from '../../errors/ApiError';

const getAllFromDB = async (
  filters: IPatientFilterRequest,
  options: IPaginationOptions,
): Promise<IGenericResponse<Patient[]>> => {
  const { limit, page, skip } = paginationHelpers.calculatePagination(options);
  const { searchTerm, ...filterData } = filters;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      OR: patientSearchableFields.map(field => ({
        [field]: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      })),
    });
  }

  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      AND: Object.keys(filterData).map(key => {
        return {
          [key]: {
            equals: (filterData as any)[key],
          },
        };
      }),
    });
  }
  andConditions.push({
    isDeleted: false,
  });

  const whereConditions: Prisma.PatientWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.patient.findMany({
    include: {
      medicalReport: true,
      patientHealthData: true,
    },
    where: whereConditions,
    skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? { [options.sortBy]: options.sortOrder }
        : {
            createdAt: 'desc',
          },
  });
  const total = await prisma.patient.count({
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

const getByIdFromDB = async (id: string): Promise<Patient | null> => {
  const result = await prisma.patient.findUnique({
    where: {
      id,
      isDeleted: false,
    },
    include: {
      medicalReport: true,
      patientHealthData: true,
    },
  });
  return result;
};

//! TODO: FIX HERE UPDATE MEDICAL HEALTH DATA
const updateIntoDB = async (
  id: string,
  payload: Partial<IPatientUpdate>,
): Promise<Patient | null> => {
  const { patientHealthData, medicalReport, ...patientData } = payload;
  await prisma.$transaction(async transactionClient => {
    const result = await transactionClient.patient.update({
      include: {
        medicalReport: true,
        patientHealthData: true,
      },
      where: {
        id,
        isDeleted: false,
      },
      data: patientData,
    });
    if (!result) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Unable to update Patient');
    }
    if (result?.patientHealthData && patientHealthData) {
      const updateHelthData = await transactionClient.patientHealthData.update({
        where: {
          id: result?.patientHealthData.id,
        },
        data: patientHealthData,
      });
    }
    if (!result?.patientHealthData && patientHealthData) {
      const newHelthData = await transactionClient.patientHealthData.create({
        data: {
          patientId: id,
          ...patientHealthData,
        },
      });
    }
    if (medicalReport) {
      if (Array.isArray(medicalReport)) {
        for (const report of medicalReport) {
          await transactionClient.medicalReport.create({
            data: {
              patientId: id,
              ...report,
            },
          });
        }
      } else {
        await transactionClient.medicalReport.create({
          data: {
            patientId: id,
            reportName: (medicalReport as any).reportName,
            reportLink: (medicalReport as any).reportLink,
            ...(typeof medicalReport === 'object' && medicalReport !== null ? medicalReport : {}),
          },
        });
      }
    }

    return result;
  });

  const responseData = await prisma.patient.findUnique({
    where: {
      id,
      isDeleted: false,
    },
    include: {
      medicalReport: true,
      patientHealthData: true,
    },
  });
  return responseData;
};

//! TODO: FIX HERE DELETE USING TRANSITION CLIENT AND DELETE patientHealthData, medicalReport, patient, user TABLE DATA
const deleteFromDB = async (id: string): Promise<Patient> => {
  return await prisma.$transaction(async transactionClient => {
    await transactionClient.patientHealthData.delete({
      where: {
        patientId: id,
      },
    });
    await transactionClient.medicalReport.deleteMany({
      where: {
        patientId: id,
      },
    });
    const deletedPatient = await prisma.patient.delete({
      where: {
        id,
      },
    });

    await transactionClient.user.delete({
      where: {
        email: deletedPatient.email,
      },
    });

    return deletedPatient;
  });
};

const softDelete = async (id: string): Promise<Patient> => {
  return await prisma.$transaction(async transactionClient => {
    const deletedPatient = await transactionClient.patient.update({
      where: { id },
      data: {
        isDeleted: true,
      },
    });

    await transactionClient.user.update({
      where: {
        email: deletedPatient.email,
      },
      data: {
        status: UserStatus.DELETED,
      },
    });

    return deletedPatient;
  });
};

export const PatientService = {
  getAllFromDB,
  getByIdFromDB,
  updateIntoDB,
  deleteFromDB,
  softDelete,
};
