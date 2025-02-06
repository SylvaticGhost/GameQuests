import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ResultInterceptor } from './middlewares/interceptors/result.interceptor';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            forbidNonWhitelisted: true,
            transform: true,
            disableErrorMessages: false,
            exceptionFactory: (errors) => {
                const messages = errors.map(
                    (error) =>
                        `${error.property} has wrong value ${error.value}, ${Object.values(error.constraints).join(', ')}`,
                );
                return new BadRequestException(messages);
            },
        }),
    );

    app.useGlobalInterceptors(new ResultInterceptor(new Reflector()));

    const config = new DocumentBuilder()
        .setTitle('API Documentation')
        .setDescription('The API description')
        .setVersion('1.0')
        .addBearerAuth(
            {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT',
            },
            'access-token',
        )
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document, {
        swaggerOptions: {
            requestInterceptor: (req) => {
                const token = localStorage.getItem('jwtToken');
                if (token && req.url.includes('/api')) {
                    req.headers.Authorization = `Bearer ${token}`;
                }
                return req;
            },
        },
    });

    await app.listen(3001);
}
bootstrap();
