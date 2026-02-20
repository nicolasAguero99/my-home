import { Injectable } from '@nestjs/common';

@Injectable()
export class MeService {
  create() {
    return 'This action adds a new me';
  }

  findAll() {
    return `This action returns all me`;
  }

  findOne(id: number) {
    return `This action returns a #${id} me`;
  }

  update(id: number) {
    return `This action updates a #${id} me`;
  }

  remove(id: number) {
    return `This action removes a #${id} me`;
  }
}
