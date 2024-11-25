export const scheduleFilterableFields: string[] = ['searchTerm', 'isBooked', 'doctorId', 'startDate', 'endDate'];

export type IDoctorScheduleFilterRequest = {
    searchTerm?: string | undefined;
    isBooked?: boolean | undefined;
};