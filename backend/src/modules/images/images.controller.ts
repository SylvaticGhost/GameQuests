import {
    Controller,
    Post,
    UseInterceptors,
    UploadedFile,
    HttpException,
    Get,
    Param,
    Res,
} from '@nestjs/common';
import { Response as ExpressResponse } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import { ApiConsumes, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ImagesService } from './images.service';

@ApiTags('Images')
@Controller('images')
export class ImagesController {
    constructor(private readonly imagesService: ImagesService) {}

    @Post('upload')
    @ApiOperation({ summary: 'Upload an image' })
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        description: 'Image file upload',
        schema: {
            type: 'object',
            properties: {
                image: {
                    type: 'string',
                    format: 'binary',
                },
            },
        },
    })
    @UseInterceptors(
        FileInterceptor('image', {
            storage: memoryStorage(),
        }),
    )
    async uploadImage(@UploadedFile() file: Express.Multer.File) {
        if (!file) {
            throw new HttpException('File is missing', 400);
        }
        this.imagesService.upload(file);
        return { filename: file.originalname };
    }

    @Get(':filename')
    async getImage(@Param('filename') filename: string, @Res() res: ExpressResponse) {
        const image = await this.imagesService.get(filename);
        if (!image) {
            throw new HttpException('Image not found', 404);
        }
        res.setHeader('Content-Type', image.contentType);
        res.send(image.data);
    }
}
