import { IMailProvider } from './../../providers/IMailProvider';
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { ICreateUserRequestDTO } from './CreateUserDTO'
import { User } from "../../entities/User";

export class CreateUserService {
    constructor(
        private usersRepository: IUsersRepository,
        private mailProvider: IMailProvider,
    ) { }

    async execute(data: ICreateUserRequestDTO) {
        const userAlreadyExists = await this.usersRepository.findByEmail(data.email);
        if (userAlreadyExists) {
            throw new Error("User Already exist.")
        }
        const user = new User(data);
        await this.usersRepository.save(user);

        await this.mailProvider.sendMail({
            to: {
                name: data.name,
                email: data.email,
            },
            from: {
                name: "eqipe do meu app",
                email: "eqipe@meuapp.com",
            },
            subject: "Seja bem vindo a plataforma",
            body: "<p>Você já pode fazer login em nossa plataforma.</p>"
        })
    }
}