import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ImageDocument, Image } from './image.entity';
import { Result } from 'src/shared/result';

@Injectable()
export class ImagesService {
    constructor(@InjectModel(Image.name) private imageModel: Model<ImageDocument>) {}

    async upload(file: Express.Multer.File): Promise<Result<Image>> {
        const exists = await this.imageModel.exists({ filename: file.originalname });
        if (exists) return Result.conflict('Image already exists');

        const newImage = new this.imageModel({
            filename: file.originalname,
            contentType: file.mimetype,
            data: file.buffer,
            uploadDate: new Date(),
        });
        newImage.save();
        return Result.success(newImage);
    }

    async get(filename: string): Promise<Image> {
        return this.imageModel.findOne({ filename });
    }
}
