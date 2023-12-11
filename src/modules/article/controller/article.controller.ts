import { Body, Controller, Get, Post, Query } from '@nestjs/common';

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
    getMdFileData(@Query('titleEng') titleEng: string, @Query('author') author: string) {
        return this.service.getMdFileData(titleEng, author);
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

    /**
     * 修改关于信息，mdx 文件中的
     */
    @Post('updateAboutInfo')
    async updateAboutInfo(
        @Body() data: { aboutContent: string; mdxContent: string; isMe: boolean },
    ) {
        return this.service.updateAboutInfo(data);
    }
}
