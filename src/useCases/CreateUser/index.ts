import { CreateUserController } from './CreateUserController';
import { CreateUserService } from './CreateUseService';
import { PostgresUsersRepository } from './../../repositories/implementations/PostgresUsersRepository';
import { MailTrapMailProvider } from './../../providers/implementations/MailTrapMailProvider';
const mailTrapMailProvider = new MailTrapMailProvider();
const postgresUsersRepository = new PostgresUsersRepository();

const createUserService = new CreateUserService(
    postgresUsersRepository,
    mailTrapMailProvider,
);

const createUserController = new CreateUserController(
    createUserService
);

export { createUserService, createUserController }
