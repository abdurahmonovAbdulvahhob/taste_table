import { BadRequestException, Injectable } from "@nestjs/common";
import { CreateTableDto } from "./dto/create-table.dto";
import { UpdateTableDto } from "./dto/update-table.dto";
import { InjectModel } from "@nestjs/mongoose";
import { Tables, TablesDocument } from "./schemas/table.schema";
import { Model } from "mongoose";
import {
  Restoran,
  RestoranDocument,
} from "../restoran/schemas/restoran.schema";
import * as QRCode from "qrcode";
import * as path from "path";
import * as fs from "fs";

@Injectable()
export class TablesService {
  constructor(
    @InjectModel(Tables.name) private tablesModel: Model<TablesDocument>,
    @InjectModel(Restoran.name) private restoranModel: Model<RestoranDocument>
  ) {}

  async generateQrCodeFile(text: string, fileName: string): Promise<string> {
    try {
      const qrCodeBuffer = await QRCode.toBuffer(text);
      const filePath = path.join(
        __dirname,
        `../public/qr-codes`,
        `${fileName}.png`
      );
      fs.mkdirSync(path.dirname(filePath), { recursive: true });
      fs.writeFileSync(filePath, qrCodeBuffer);
      return filePath;
    } catch (error) {
      throw new Error("Failde to generate or save  QR Code ");
    }
  }

  async create(createTableDto: CreateTableDto) {
    const { restoran_id } = createTableDto;
    const restoran = await this.restoranModel.findById(restoran_id);
    if (!restoran) {
      throw new BadRequestException("Bunday restoran yo'q");
    }
    const newTable = await this.tablesModel.create(createTableDto);

    const baseUrl = `${process.env.API_URL}:${process.env.PORT}/menu`;
    const link = `${baseUrl}/${restoran._id}/${newTable._id}`;
    await this.generateQrCodeFile(link,String(newTable._id));

    newTable.qr_code = link;
    await newTable.save();

    restoran.tables.push(newTable);
    await restoran.save();

    return {newTable};
  }

  findAll() {
    return this.tablesModel.find().populate("restoran_id");
  }

  findOne(id: string) {
    return this.tablesModel.findById(id).populate("restoran_id");
  }

  update(id: string, updateTableDto: UpdateTableDto) {
    return `This action updates a #${id} table`;
  }

  remove(id: string) {
    return `This action removes a #${id} table`;
  }
}
