import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { AdminModule } from './admin/admin.module';
import { RestoranModule } from './restoran/restoran.module';
import { TablesModule } from './tables/tables.module';
import { MenuModule } from './menu/menu.module';
import { ServeStaticModule } from "@nestjs/serve-static";
import path, { join } from "path";
import { CategoryModule } from './category/category.module';
import { LanguageModule } from './language/language.module';
import { ManagerModule } from './manager/manager.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: ".env", isGlobal: true }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, "..", "public"),
    }),
    MongooseModule.forRoot(process.env.MONGO_URI),
    AdminModule,
    RestoranModule,
    TablesModule,
    MenuModule,
    CategoryModule,
    LanguageModule,
    ManagerModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
