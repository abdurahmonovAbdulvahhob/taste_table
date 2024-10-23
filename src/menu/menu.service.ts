import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Menu, MenuDocument } from './schemas/menu.schema';
import { Model } from 'mongoose';
import { Restoran, RestoranDocument } from '../restoran/schemas/restoran.schema';
import { Category, CategoryDocument } from '../category/schemas/category.schema';
import { Language, LanguageDocument } from '../language/schemas/language.schema';

@Injectable()
export class MenuService {
  constructor(
    @InjectModel(Menu.name) private menuModel: Model<MenuDocument>,
    @InjectModel(Restoran.name) private restoranModel: Model<RestoranDocument>,
    @InjectModel(Category.name) private categoryModel: Model<CategoryDocument>,
    @InjectModel(Language.name) private languageModel: Model<LanguageDocument>
    
  ){}
  async create(createMenuDto: CreateMenuDto) {
    const {restoran_id,category_id,language_id} = createMenuDto;
    const restoran = await this.restoranModel.findById(restoran_id)
    if (!restoran) {
      throw new NotFoundException(`Restoran not found with id ${restoran_id}`);
    }

    const category = await this.categoryModel.findById(category_id);
    if (!category) {
      throw new NotFoundException(`Category not found with id ${category_id}`);
    }

    const language = await this.languageModel.findById(language_id);
    if (!language) {
      throw new NotFoundException(`Language not found with id ${language_id}`);
    }


    const newMenu = await this.menuModel.create(createMenuDto);
    return newMenu;
  }

  findAll() {
    return this.menuModel.find().populate('category_id').populate('restoran_id');
  }

  findOne(id: string) {
    return this.menuModel.findById(id).populate('category_id').populate('restoran_id');
  }

  update(id: string, updateMenuDto: UpdateMenuDto) {
    return `This action updates a #${id} menu`;
  }

  remove(id: string) {
    return `This action removes a #${id} menu`;
  }
}
