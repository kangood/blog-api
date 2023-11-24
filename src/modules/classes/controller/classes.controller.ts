import { Controller, Get } from '@nestjs/common';

import { BaseController } from '@/modules/restful/base';
import { Crud } from '@/modules/restful/decorators';

import { CreateClassesDto, QueryClassesDto, UpdateClassesDto } from '../dto';
import { ArticleClassesCountView } from '../entity';
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

    /**
     * 分组查询各个分类对应文章数量
     */
    @Get('countListArticleClasses')
    countListArticleClasses(): Promise<ArticleClassesCountView[]> {
        return this.service.countListArticleClasses();
    }
}
