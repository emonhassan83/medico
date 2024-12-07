export enum tagTypes {
  user = "user",
  admin = "admin",
  receptionist = "receptionist",
  doctor = "doctor",
  patient = "patient",
  specialties = "specialties",
  schedule = "schedule",
  doctorSchedule = "doctorSchedule",
  appointment = "appointment",
  prescription = "prescription",
  review = "review",
  payment = "payment",
  meta = "meta",
}

export const tagTypesList = [
  tagTypes.specialties,
  tagTypes.admin,
  tagTypes.doctor,
  tagTypes.patient,
  tagTypes.schedule,
  tagTypes.appointment,
  tagTypes.doctorSchedule,
  tagTypes.receptionist,
  tagTypes.prescription,
  tagTypes.review,
  tagTypes.payment,
  tagTypes.user,
  tagTypes.meta
];
