import { Injectable } from "@nestjs/common";
import { CreateCategoryDto } from "./dto/create-category.dto";
import { UpdateCategoryDto } from "./dto/update-category.dto";
import { InjectModel } from "@nestjs/mongoose";
import { Category, CategoryDocument } from "./schemas/category.schema";
import { Model } from "mongoose";
import {
  Language,
  LanguageDocument,
} from "../language/schemas/language.schema";
import {
  Restoran,
  RestoranDocument,
} from "../restoran/schemas/restoran.schema";

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name) private categoryModel: Model<CategoryDocument>,
    @InjectModel(Language.name) private languageModel: Model<LanguageDocument>,
    @InjectModel(Restoran.name) private restoranModel: Model<RestoranDocument>
  ) {}
  async create(createCategoryDto: CreateCategoryDto) {
    const { restoran_id, language_id } = createCategoryDto;
    const restoran = await this.restoranModel.findById(restoran_id);
    if (!restoran) {
      throw new Error("Restoran not found");
    }

    const language = await this.languageModel.findById(language_id);
    if (!language) {
      throw new Error("Language not found");
    }

    const newCategory = await this.categoryModel.create(createCategoryDto);

    return newCategory;
  }

  findAll() {
    return this.categoryModel
      .find()
      .populate("restoran_id")
      .populate("language_id");
  }

  findOne(id: string) {
    return this.categoryModel
      .findById(id)
      .populate("restoran_id")
      .populate("language_id");
  }

  update(id: string, updateCategoryDto: UpdateCategoryDto) {
    return `This action updates a #${id} category`;
  }

  remove(id: string) {
    return `This action removes a #${id} category`;
  }
}
