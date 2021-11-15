import { Router } from 'express';
import { getRepository } from 'typeorm';
import CreateUserService from '../services/CreateUserService';
import User from '../models/User';

const usersRouter = Router();

// POST
usersRouter.post('/', async (request, response) => {
    try {

        const { name, email, password } = request.body;
        const createUserService = new CreateUserService();

        const user = await createUserService.execute({
            name,
            email,
            password
        });

        return response.status(201).json(user);

    } catch (e: any) {

        return response.status(400).json({ error: e.message });
    }
});

// GET
usersRouter.get('/', async (request, response) => {
    const usersRepository = getRepository(User);
    const users = await usersRepository.find();

    return response.status(201).json(users);
});

export default usersRouter;
