import express from 'express';
import { userRoutes } from '../modules/user/user.route';
import { AuthRoutes } from '../modules/auth/auth.routes';
import { AdminRoutes } from '../modules/Admin/admin.routes';
import { PatientRoutes } from '../modules/patient/patient.route';
import { ReceptionistRoutes } from '../modules/Receptionist/receptionist.routes';
import { SpecialtiesRoutes } from '../modules/Specialties/specialties.routes';
import { PrescriptionsRoutes } from '../modules/prescription/prescription.route';
import { ReviewRoutes } from '../modules/review/review.route';
import { ScheduleRoutes } from '../modules/Schedule/schedule.routes';
import { DoctorScheduleRoutes } from '../modules/DoctorSchedule/doctorSchedule.routes';
import { AppointmentRoutes } from '../modules/Appointment/appointment.routes';
<<<<<<< HEAD
import { MetaRoutes } from '../modules/Meta/meta.routes';
import { PaymentRoutes } from '../modules/payment/payment.routes';
=======
import { DoctorRoutes } from '../modules/doctor/doctor.route';
>>>>>>> 745d037fd36878466db58239a3b44a0ba7cc33d1

const router = express.Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/user',
    route: userRoutes,
  },
  {
    path: '/admin',
    route: AdminRoutes,
  },
  {
    path: '/receptionist',
    route: ReceptionistRoutes,
  },
  {
    path: '/doctor',
    route: DoctorRoutes,
  },
  {
    path: '/patient',
    route: PatientRoutes,
  },
  {
    path: '/specialties',
    route: SpecialtiesRoutes,
  },
  {
    path: '/prescription',
    route: PrescriptionsRoutes,
  },
  {
    path: '/review',
    route: ReviewRoutes,
  },
  {
    path: '/schedule',
    route: ScheduleRoutes,
  },
  {
    path: '/doctor-schedule',
    route: DoctorScheduleRoutes,
  },
  {
    path: '/appointment',
    route: AppointmentRoutes,
  },
  {
    path: '/payment',
    route: PaymentRoutes,
  },
  {
    path: '/meta',
    route: MetaRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;
