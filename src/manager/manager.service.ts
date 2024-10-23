import { Injectable } from '@nestjs/common';
import { CreateManagerDto } from './dto/create-manager.dto';
import { UpdateManagerDto } from './dto/update-manager.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Manager, ManagerDocument } from './schemas/manager.schema';
import { Restoran, RestoranDocument } from '../restoran/schemas/restoran.schema';
import { Model } from 'mongoose';

@Injectable()
export class ManagerService {
  constructor(
    @InjectModel(Manager.name) private managerModel: Model<ManagerDocument>,
    @InjectModel(Restoran.name) private restoranModel: Model<RestoranDocument>
  ) {}
  async create(createManagerDto: CreateManagerDto) {
    const {restoran_id} = createManagerDto;
    const restoran = await this.restoranModel.findById(restoran_id);
    if (!restoran) {
      throw new Error('Restoran not found');
    }

    const newManager = await this.managerModel.create(createManagerDto)
    restoran.managers.push(newManager);
    await restoran.save();

    return newManager;
  }

  findAll() {
    return this.managerModel.find().populate('restoran_id');
  }

  findOne(id: string) {
    return this.managerModel.findById(id).populate("restoran_id");
  }

  update(id: string, updateManagerDto: UpdateManagerDto) {
    return `This action updates a #${id} manager`;
  }

  remove(id: string) {
    return `This action removes a #${id} manager`;
  }
}
