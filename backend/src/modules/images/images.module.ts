import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ImagesController } from './images.controller';
import { ImagesService } from './images.service';
import { ImageSchema, Image } from './image.entity';

@Module({
    imports: [MongooseModule.forFeature([{ name: Image.name, schema: ImageSchema }])],
    controllers: [ImagesController],
    providers: [ImagesService],
})
export class ImagesModule {}
