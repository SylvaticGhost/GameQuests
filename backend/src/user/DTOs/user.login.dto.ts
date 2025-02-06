import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class UserLoginDto {
    @IsString()
    @IsEmail()
    @IsNotEmpty()
    @MinLength(4)
    @ApiProperty({
        type: String,
        description: 'Email',
        example: 'user@email.com',
    })
    email: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    @ApiProperty({ type: String, description: 'Password', example: 'Test1234' })
    password: string;
}
