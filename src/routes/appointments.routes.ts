import { Router } from 'express';
import { parseISO } from 'date-fns';
import AppointmentsRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';

const appointmentsRouter = Router();
const appointmentsRepository = new AppointmentsRepository();

// POST
appointmentsRouter.post('/', (request, response) => {
    try {

        const { provider, date } = request.body;

        const parsedDate = parseISO(date);
        const createAppointmentService = new CreateAppointmentService(appointmentsRepository);
        const appointment = createAppointmentService.execute({ provider, date: parsedDate});

        return response.status(201).json(appointment);

    } catch (e: any) {

        return response.status(400).json({ error: e.message });
    }
});

// GET
appointmentsRouter.get('/', (request, response) => {
    const appointments = appointmentsRepository.listAll();

    return response.status(201).json(appointments);
});

export default appointmentsRouter;
