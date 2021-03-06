import { startOfHour } from "date-fns";
import { getCustomRepository } from 'typeorm';
import Appointment from "../models/Appointment";
import AppointmentsRepository from "../repositories/AppointmentsRepository";

interface RequestDTO {
    provider_id: string;
    customer_id: string;
    date: Date;
}

class CreateAppointmentService {

    public async execute({ provider_id, customer_id, date, }: RequestDTO): Promise<Appointment> {

        const appointmentsRepository = getCustomRepository(AppointmentsRepository);
        const appointmentDate = startOfHour(date);
        const findAppointmentInSameDate = await appointmentsRepository.findByDate(appointmentDate);

        if (findAppointmentInSameDate) {
            throw new Error('This appointment is already booked!');
        }

        const appointment = appointmentsRepository.create({
            provider_id,
            customer_id,
            date: appointmentDate
        });

        await appointmentsRepository.save(appointment);
        return appointment;
    }
}

export default CreateAppointmentService;
