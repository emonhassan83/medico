import prisma from "../../../shared/prisma";
import { Specialties, UserStatus } from "@prisma/client";

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

const getAllFromDB = async (): Promise<Specialties[]> => {
  return await prisma.specialties.findMany();
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
  deleteFromDB,
};
