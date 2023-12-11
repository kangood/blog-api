import { Controller } from '@nestjs/common';

import { BaseController } from '@/modules/restful/base';
import { Crud } from '@/modules/restful/decorators';

import { CreateProjectDto, QueryProjectDto, UpdateProjectDto } from '../dto';
import { ProjectService } from '../service';

@Crud({
    id: 'project',
    enabled: ['list', 'detail', 'store', 'update', 'delete', 'restore'],
    dtos: {
        store: CreateProjectDto,
        update: UpdateProjectDto,
        list: QueryProjectDto,
    },
})
@Controller('project')
export class ProjectController extends BaseController<ProjectService> {
    constructor(protected service: ProjectService) {
        super(service);
    }
}
