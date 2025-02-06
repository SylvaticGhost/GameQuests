import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class UserCreateDto {
    @IsString()
    @IsEmail()
    @ApiProperty({
        type: String,
        description: 'Email',
        example: 'user@email.com',
    })
    email: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ type: String, description: 'Nickname', example: 'user' })
    nickname: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ type: String, description: 'Password', example: 'Test1234' })
    password: string;

    @IsDateString()
    @ApiProperty({
        type: String,
        example: '2000-01-01',
        description: 'Birthday in format YYYY-MM-DD',
    })
    birthday: string;
}
