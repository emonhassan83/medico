import { Admin, Prisma, Receptionist, UserStatus } from '@prisma/client';
import { receptionistSearchAbleFields } from './receptionist.constant';
import prisma from '../../../shared/prisma';
import { IReceptionistFilterRequest } from './receptionist.interface';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IPaginationOptions } from '../../../interfaces/pagination';

const getAllFromDB = async (
  params: IReceptionistFilterRequest,
  options: IPaginationOptions,
) => {
  const { page, limit, skip } = paginationHelpers.calculatePagination(options);
  const { searchTerm, ...filterData } = params;

  const andConditions: Prisma.ReceptionistWhereInput[] = [];

  if (params.searchTerm) {
    andConditions.push({
      OR: receptionistSearchAbleFields.map(field => ({
        [field]: {
          contains: params.searchTerm,
          mode: 'insensitive',
        },
      })),
    });
  }

  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      AND: Object.keys(filterData).map(key => ({
        [key]: {
          equals: (filterData as any)[key],
        },
      })),
    });
  }

  andConditions.push({
    isDeleted: false,
  });

  const whereConditions: Prisma.ReceptionistWhereInput = { AND: andConditions };

  const result = await prisma.receptionist.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? {
            [options.sortBy]: options.sortOrder,
          }
        : {
            createdAt: 'desc',
          },
  });

  const total = await prisma.receptionist.count({
    where: whereConditions,
  });

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getByIdFromDB = async (id: string): Promise<Receptionist | null> => {
  const result = await prisma.receptionist.findUnique({
    where: {
      id,
      isDeleted: false,
    },
  });

  return result;
};

const updateIntoDB = async (
  id: string,
  data: Partial<Receptionist>,
): Promise<Receptionist> => {
  await prisma.receptionist.findUniqueOrThrow({
    where: {
      id,
      isDeleted: false,
    },
  });

  const result = await prisma.receptionist.update({
    where: {
      id,
    },
    data,
  });

  return result;
};

const deleteFromDB = async (id: string): Promise<Receptionist | null> => {
  await prisma.receptionist.findUniqueOrThrow({
    where: {
      id,
    },
  });

  const result = await prisma.$transaction(async transactionClient => {
    const receptionistDeletedData = await transactionClient.receptionist.delete({
      where: {
        id
      },
    });

    await transactionClient.user.delete({
      where: {
        email: receptionistDeletedData.email,
      },
    });

    return receptionistDeletedData;
  });

  return result;
};

const softDeleteFromDB = async (id: string): Promise<Receptionist | null> => {
  await prisma.receptionist.findUniqueOrThrow({
    where: {
      id,
      isDeleted: false,
    },
  });

  const result = await prisma.$transaction(async transactionClient => {
    const receptionistDeletedData = await transactionClient.receptionist.update({
      where: {
        id,
      },
      data: {
        isDeleted: true,
      },
    });

    await transactionClient.user.update({
      where: {
        email: receptionistDeletedData.email,
      },
      data: {
        status: UserStatus.DELETED,
      },
    });

    return receptionistDeletedData;
  });

  return result;
};

export const ReceptionistService = {
  getAllFromDB,
  getByIdFromDB,
  updateIntoDB,
  deleteFromDB,
  softDeleteFromDB,
};
