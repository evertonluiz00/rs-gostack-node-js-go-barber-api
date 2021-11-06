import { isEqual } from "date-fns";
import Appointment from "../models/Appointment";

interface ICreateAppointmentDto {
    provider: string;
    date: Date;
}

class AppointmentsRepository {
    private appointments: Appointment[];

    constructor() {
        this.appointments = [];
    }

    public create({ provider, date }: ICreateAppointmentDto): Appointment {
        const appointment = new Appointment({ provider, date });

        this.appointments.push(appointment);

        return appointment;
    }

    public listAll(): Appointment[] {
        return this.appointments;
    }

    public findByDate(date: Date): Appointment | null {
        const findAppointment = this.appointments.find(appointment => isEqual(date, appointment.date));

        return findAppointment || null;
    }
}

export default AppointmentsRepository;
