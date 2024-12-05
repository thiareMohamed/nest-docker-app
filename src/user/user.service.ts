import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entity/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  create(user: User): Promise<User> {
    return this.userRepository.save(user);
  }

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  findOne(id: number): Promise<User> {
    return this.userRepository.findOne({ where: { id } });
  }

  async update(id: number, user: User): Promise<User> {
    await this.userRepository.update(id, user);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }

  // Ajouter des données fictives
  async addFakeData(): Promise<User[]> {
    const fakeData = Array.from({ length: 40 }, (_, k) => ({
      name: `user${k}`,
      email: `${k}@example.com`,
    }));

    const users = await this.userRepository.save(fakeData);
    return users;
  }
}
