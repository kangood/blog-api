import { Controller } from '@nestjs/common';

import { BaseController } from '@/modules/restful/base';
import { Crud } from '@/modules/restful/decorators';

import { CreateTagDto, QueryTagDto, UpdateTagDto } from '../dtos';
import { TagService } from '../services';

@Crud({
    id: 'tag',
    enabled: ['list', 'detail', 'store', 'update', 'delete', 'restore'],
    dtos: {
        store: CreateTagDto,
        update: UpdateTagDto,
        list: QueryTagDto,
    },
})
@Controller('tag')
export class TagController extends BaseController<TagService> {
    constructor(protected service: TagService) {
        super(service);
    }
}
