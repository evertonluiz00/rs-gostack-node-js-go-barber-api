import { Router } from 'express';
import { parseISO } from 'date-fns';
import { getCustomRepository } from 'typeorm';
import AppointmentsRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';

const appointmentsRouter = Router();

// POST
appointmentsRouter.post('/', async (request, response) => {
    try {

        const { provider, date } = request.body;
        const parsedDate = parseISO(date);
        const createAppointmentService = new CreateAppointmentService();
        const appointment = await createAppointmentService.execute({ provider, date: parsedDate});

        return response.status(201).json(appointment);

    } catch (e: any) {

        return response.status(400).json({ error: e.message });
    }
});

// GET
appointmentsRouter.get('/', async (request, response) => {
    const appointmentsRepository = getCustomRepository(AppointmentsRepository);
    const appointments = await appointmentsRepository.find();

    return response.status(201).json(appointments);
});

export default appointmentsRouter;
