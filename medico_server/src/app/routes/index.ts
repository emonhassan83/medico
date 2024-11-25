import express from 'express';
import { userRoutes } from '../modules/user/user.route';
import { AuthRoutes } from '../modules/auth/auth.routes';
import { AdminRoutes } from '../modules/Admin/admin.routes';
import { PatientRoutes } from '../modules/patient/patient.route';
import { ReceptionistRoutes } from '../modules/Receptionist/receptionist.routes';
import { SpecialtiesRoutes } from '../modules/Specialties/specialties.routes';
import { ScheduleRoutes } from '../modules/Schedule/schedule.routes';


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
    path: '/patient',
    route: PatientRoutes,
  },
  {

    path: '/specialties',
    route: SpecialtiesRoutes,

  },
  {
    path: '/schedule',
    route: ScheduleRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;
