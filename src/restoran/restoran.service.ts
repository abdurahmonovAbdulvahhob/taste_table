import { Injectable } from '@nestjs/common';
import { CreateRestoranDto } from './dto/create-restoran.dto';
import { UpdateRestoranDto } from './dto/update-restoran.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Restoran, RestoranDocument } from './schemas/restoran.schema';
import { Model } from 'mongoose';

@Injectable()
export class RestoranService {
  constructor(@InjectModel(Restoran.name) private restoranModel: Model<RestoranDocument>){}
  create(createRestoranDto: CreateRestoranDto) {
    return this.restoranModel.create(createRestoranDto);
  }

  findAll() {
    return this.restoranModel.find().populate('tables').populate('categories').populate('menus');
  }

  findOne(id: string) {
    return this.restoranModel
      .findById(id)
      .populate("tables")
      .populate("categories")
      .populate("menus");
  }

  update(id: string, updateRestoranDto: UpdateRestoranDto) {
    return this.restoranModel.findByIdAndUpdate(id,updateRestoranDto,{new: true});
  }

  remove(id: string) {
    return this.restoranModel.findByIdAndDelete(id);
  }
}
