import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import { Prisma, Specialties, UserStatus } from '@prisma/client';
import { ISpecialtiesFilterRequest } from './specialities.interface';
import { specialtiesFilterableFields } from './specialties.constant';

const insertIntoDB = async (specialtiesData: any, userData: any) => {
  await prisma.user.findUniqueOrThrow({
    where: {
      id: userData?.userId,
      status: UserStatus.ACTIVE,
    },
  });

  const result = await prisma.specialties.create({
    data: specialtiesData,
  });

  return result;
};

const getAllFromDB = async (
  params: ISpecialtiesFilterRequest,
  options: IPaginationOptions,
) => {
  const { page, limit, skip } = paginationHelpers.calculatePagination(options);
  const { searchTerm, ...filterData } = params;

  const andConditions: Prisma.SpecialtiesWhereInput[] = [];

  if (params.searchTerm) {
    andConditions.push({
      OR: specialtiesFilterableFields.map(field => ({
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

  const whereConditions: Prisma.SpecialtiesWhereInput = { AND: andConditions };

  const result = await prisma.specialties.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? {
            [options.sortBy]: options.sortOrder,
          }
        : {
            title: 'desc',
          },
  });

  const total = await prisma.specialties.count({
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

const getByIdFromDB = async (id: string): Promise<Specialties | null> => {
  const result = await prisma.specialties.findUnique({
    where: {
      id,
    },
  });

  return result;
};

const updateIntoDB = async (
  id: string,
  data: Partial<Specialties>,
): Promise<Specialties> => {
  await prisma.specialties.findUniqueOrThrow({
    where: {
      id,
    },
  });

  const result = await prisma.specialties.update({
    where: {
      id,
    },
    data,
  });

  return result;
};

const deleteFromDB = async (id: string): Promise<Specialties> => {
  await prisma.specialties.findUniqueOrThrow({
    where: {
      id,
    },
  });

  const result = await prisma.specialties.delete({
    where: {
      id,
    },
  });
  return result;
};

export const SpecialtiesService = {
  insertIntoDB,
  getAllFromDB,
  getByIdFromDB,
  updateIntoDB,
  deleteFromDB,
};
