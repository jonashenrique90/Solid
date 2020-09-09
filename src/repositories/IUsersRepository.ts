import { User } from "../entities/User"

export interface IUsersRepository {
    // create() {

    // }
    findByEmail(email: string): Promise<User>;
    save(user: User): Promise<void>;
}