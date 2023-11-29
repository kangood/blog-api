import { Controller, Get, Query } from '@nestjs/common';

import { BaseController } from '@/modules/restful/base';
import { Crud } from '@/modules/restful/decorators';

import { CreateArticleDto, QueryArticleDto, UpdateArticleDto } from '../dto';
import { ArticleService } from '../service';

@Crud({
    id: 'article',
    enabled: ['list', 'detail', 'store', 'update', 'delete', 'restore'],
    dtos: {
        store: CreateArticleDto,
        update: UpdateArticleDto,
        list: QueryArticleDto,
    },
})
@Controller('article')
export class ArticleController extends BaseController<ArticleService> {
    constructor(protected service: ArticleService) {
        super(service);
    }

    /**
     * 获取md文件数据
     */
    @Get('getMdFileData')
    getMdFileData(@Query('fileName') fileName: string) {
        return this.service.getMdFileData(fileName);
    }

    /**
     * 查询未分类的文章数量
     */
    @Get('countNotClassesArticle')
    countNotClassesArticle() {
        return this.service.countNotClassesArticle();
    }

    /**
     * 分组查询各个标签对应文章数量
     */
    @Get('countListArticleTag')
    countListArticleTag() {
        return this.service.countListArticleTag();
    }
}
