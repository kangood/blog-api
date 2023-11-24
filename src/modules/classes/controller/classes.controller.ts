import { Controller } from '@nestjs/common';

import { BaseController } from '@/modules/restful/base';
import { Crud } from '@/modules/restful/decorators';

import { CreateClassesDto, QueryClassesDto, UpdateClassesDto } from '../dto';
import { ClassesService } from '../service';

@Crud({
    id: 'classes',
    enabled: ['list', 'detail', 'store', 'update', 'delete', 'restore'],
    dtos: {
        store: CreateClassesDto,
        update: UpdateClassesDto,
        list: QueryClassesDto,
    },
})
@Controller('classes')
export class ClassesController extends BaseController<ClassesService> {
    constructor(protected service: ClassesService) {
        super(service);
    }
}
