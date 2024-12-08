import { addHours, addMinutes, format } from "date-fns";
import prisma from "../../../shared/prisma";
import { Prisma, Schedule } from "@prisma/client";
import { IFilterRequest, ISchedule } from "./schedule.interface";
import { IPaginationOptions } from "../../../interfaces/pagination";
import { IAuthUser } from "../../../interfaces/common";
import { paginationHelpers } from "../../../helpers/paginationHelper";

const convertDateTime = async (date: Date) => {
  const offset = date.getTimezoneOffset() * 60000;
  return new Date(date.getTime() + offset);
};

const insertIntoDB = async (payload: ISchedule): Promise<Schedule[]> => {
  const { startDate, endDate, startTime, endTime } = payload;
  const intervalTime = 30;

  const schedules = [];

  const currentDate = new Date(startDate); //* start date format
  const lastDate = new Date(endDate); //* end date format

  while (currentDate <= lastDate) {
    const startDateTime = new Date(
      addMinutes(
        addHours(
          `${format(currentDate, "yyyy-MM-dd")}`,
          Number(startTime.split(":")[0])
        ),
        Number(startTime.split(":")[1])
      )
    );

    const endDateTime = new Date(
      addMinutes(
        addHours(
          `${format(currentDate, "yyyy-MM-dd")}`,
          Number(endTime.split(":")[0])
        ),
        Number(endTime.split(':')[1])
      )
    );

    while (startDateTime < endDateTime) {
      //* create schedule data 30 min interval
      // const scheduleData = {
      //     startDateTime: startDateTime,
      //     endDateTime: addMinutes(startDateTime, intervalTime)
      // }

      const s = await convertDateTime(startDateTime);
      const e = await convertDateTime(addMinutes(startDateTime, intervalTime));

      const scheduleData = {
        startDate: s,
        endDate: e,
      };
      
      const existingSchedule = await prisma.schedule.findFirst({
        where: {
          startDate: scheduleData.startDate,
          endDate: scheduleData.endDate,
        },
      });

      if (!existingSchedule) {
        //* create schedule
        const result = await prisma.schedule.create({
          data: scheduleData,
        });
        schedules.push(result);
      }

      startDateTime.setMinutes(startDateTime.getMinutes() + intervalTime);
    }

    currentDate.setDate(currentDate.getDate() + 1);
  }

  return schedules;
};

const getAllFromDB = async (
  filters: IFilterRequest,
  options: IPaginationOptions,
  user: IAuthUser
) => {
  const { limit, page, skip } = paginationHelpers.calculatePagination(options);
  const { startDate, endDate, ...filterData } = filters;

  const andConditions = [];

  if (startDate && endDate) {
      andConditions.push({
          AND: [
              {
                  startDate: {
                      gte: startDate
                  }
              },
              {
                  endDate: {
                      lte: endDate
                  }
              }
          ]
      })
  };

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

  const whereConditions: Prisma.ScheduleWhereInput =
      andConditions.length > 0 ? { AND: andConditions } : {};

  const doctorSchedules = await prisma.doctorSchedule.findMany({
      where: {
          doctor: {
              email: user?.email
          }
      }
  });

  const doctorScheduleIds = doctorSchedules.map(schedule => schedule.scheduleId);
  // console.log(doctorScheduleIds)

  const result = await prisma.schedule.findMany({
    include: {
      doctorSchedules: true
    },
      where: {
          ...whereConditions,
          id: {
              notIn: doctorScheduleIds
          }
      },
      skip,
      take: limit,
      orderBy:
          options.sortBy && options.sortOrder
              ? { [options.sortBy]: options.sortOrder }
              : {
                  createdAt: 'desc',
              }
  });
  
  const total = await prisma.schedule.count({
      where: {
          ...whereConditions,
          id: {
              notIn: doctorScheduleIds
          }
      },
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

const getByIdFromDB = async (id: string): Promise<Schedule | null> => {
  await prisma.schedule.findUniqueOrThrow({
    where: {
      id,
    },
  });

  const result = await prisma.schedule.findUnique({
    where: {
      id,
    },
  });

  return result;
};

const deleteFromDB = async (id: string): Promise<any> => {
  await prisma.schedule.findUniqueOrThrow({
    where: {
      id,
    },
  });

  await prisma.$transaction(async tx => {
    await tx.doctorSchedule.deleteMany({ where: { scheduleId: id } });
    await tx.appointment.deleteMany({ where: { scheduleId: id } });

    const result = await tx.schedule.delete({
      where: { id },
    });

    return result;
  });
};

export const ScheduleService = {
  insertIntoDB,
  getAllFromDB,
  getByIdFromDB,
  deleteFromDB,
};
