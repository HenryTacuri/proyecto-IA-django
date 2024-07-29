/* eslint-disable @typescript-eslint/no-unused-vars */
import { BadRequestException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { User } from './entities/user.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import * as bcryptjs from 'bcryptjs'
import { LoginResponse } from './interfaces/login-response';
import { RegisterUserDto, LoginDto, RegiterPreferenceDto } from './dto';
import { Preference } from './entities/preference.entity';

@Injectable()
export class AuthService {

  constructor( 
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(Preference.name) private preferenceModel: Model<Preference>
  ) {
    
  }

  async register(registerDto: RegisterUserDto): Promise<User> {

    try {

      const {password, ...userData} = registerDto;
      
      const newUser = new this.userModel({
        password: bcryptjs.hashSync(password, 10), 
        ...userData, 
      });

      await newUser.save();

      const {password:_, ...user} = newUser.toJSON();

      return user;

    } catch (error) {

      if(error.code === 11000) {
        throw new BadRequestException(`${registerDto.email} is already exists!`);
      }

      throw new InternalServerErrorException('Something terrible happen!!!');
    
    }
  }

  async login(loginDto: LoginDto): Promise<LoginResponse> {

    const {email, password} = loginDto;
    
    const user = await this.userModel.findOne({email});
    
    if(!user) {
      throw new UnauthorizedException('Not valid credential - email');
    }

    if(!bcryptjs.compareSync(password, user.password)) {
      throw new UnauthorizedException('Not valid credential - password');
    }

    const {password:_, ...rest} = user.toJSON();

    return {
      user: rest
    }

  }

  findAll(): Promise<User[]> {
    return this.userModel.find();
  }

  async findUserById(id: string) {

    try {
      const user = await this.userModel.findById(id);
      const {password, ...rest} = user.toJSON();
      return rest;
      
    } catch (error) {
      throw new InternalServerErrorException('Internal server error!!!');
    }

  }
  
  async registerPreference(registerPreferenceDto: RegiterPreferenceDto): Promise<boolean> {
    try {
      
      const {idUser, ...car} = registerPreferenceDto;

      const userFind = await this.userModel.findById(idUser);
      const {password, ...user} = userFind.toJSON();

      const newPreference = new this.preferenceModel({
        ...car,
        user
      });

      await newPreference.save();

      return true;

    } catch (error) {
      //console.log({error})
      throw new InternalServerErrorException('Something terrible happen!!!'); 
    }

  }

  findAllPreferences(): Promise<Preference[]> {
    
    try {
      return this.preferenceModel.find().populate({
        path: 'user',
        select: '-password'
      }).exec();
    } catch (error) {
      console.log({error});
    }

    
  }

  /*update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }*/

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }

} 
