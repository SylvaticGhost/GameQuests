import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ImageDocument, Image } from './image.entity';

@Injectable()
export class ImagesService {
    constructor(@InjectModel(Image.name) private imageModel: Model<ImageDocument>) {}

    async upload(file: Express.Multer.File): Promise<Image> {
        const exists = this.imageModel.exists({ filename: file.originalname });
        if (exists) throw new ConflictException('image with this name exists');

        const newImage = new this.imageModel({
            filename: file.originalname,
            contentType: file.mimetype,
            data: file.buffer,
            uploadDate: new Date(),
        });
        return newImage.save();
    }

    async get(filename: string): Promise<Image> {
        return this.imageModel.findOne({ filename });
    }
}
