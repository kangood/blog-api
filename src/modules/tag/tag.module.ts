import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DatabaseModule } from '../database/database.module';

import * as controller from './controller';
import * as entity from './entity';
import * as repository from './repository';
import * as service from './service';

@Module({
    imports: [
        TypeOrmModule.forFeature(Object.values(entity)),
        DatabaseModule.forRepository(Object.values(repository)),
    ],
    controllers: [...Object.values(controller)],
    providers: [...Object.values(service)],
    exports: [...Object.values(service), DatabaseModule.forRepository(Object.values(repository))],
})
export class TagModule {}
