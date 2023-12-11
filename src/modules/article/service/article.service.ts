import { readFile, writeFile } from 'fs/promises';

import { join } from 'path';

import { Injectable } from '@nestjs/common';
import { isEmpty, isUndefined, omit } from 'lodash';

import { SelectQueryBuilder } from 'typeorm';

import { BaseService } from '@/modules/database/base';

import { QueryHook } from '@/modules/database/types';
import { PublicOrderType } from '@/modules/system/constants';

import { getSnowflakeId } from '@/modules/system/helpers';

import { CreateArticleDto, QueryArticleDto, UpdateArticleDto } from '../dto';
import { ArticleEntity } from '../entity';
import { ArticleRepository } from '../repository';

// 博客查询接口
type FindParams = {
    [key in keyof Omit<QueryArticleDto, 'limit' | 'page'>]: QueryArticleDto[key];
};

/**
 * 博客数据操作
 */
@Injectable()
export class ArticleService extends BaseService<ArticleEntity, ArticleRepository, FindParams> {
    constructor(protected repository: ArticleRepository) {
        super(repository);
    }

    /**
     * 获取mdx文件数据
     */
    async getMdFileData(titleEng: string, author: string) {
        let mdFileData = '';
        let filePath = '';
        // 加载并读取已上传的文件数据
        if (titleEng) {
            filePath = join(process.env.MD_FILE_PATH, `/blog/${titleEng}.mdx`);
        } else if (author === 'kangod') {
            filePath = join(process.env.MD_FILE_PATH, `/authors/kangod.mdx`);
        }
        if (filePath === '') {
            return '';
        }
        await readFile(filePath).then(async (data) => {
            mdFileData = data.toString();
        });
        return mdFileData;
    }

    /**
     * 查询未分类的文章数量
     */
    async countNotClassesArticle() {
        const data: [{ count: number }] = await this.repository.manager.query(
            'SELECT count(*) AS count FROM article WHERE classes = ""',
        );
        return data[0].count;
    }

    /**
     * 分组查询各个分类对应文章数量
     */
    async countListArticleTag() {
        const data: [{ tag: string; count: number }] = await this.repository.manager.query(
            '    SELECT' +
                '    t1.tag,' +
                '    count(*) AS count ' +
                'FROM' +
                '    article,' +
                "    JSON_TABLE ( tags, '$[*]' COLUMNS ( tag VARCHAR ( 255 ) PATH '$' ) ) t1 " +
                'GROUP BY' +
                '    t1.tag',
        );
        return data;
    }

    /**
     * 新建博客
     * @param data
     */
    async create(data: CreateArticleDto) {
        // 文章内容需要写入mdx文件
        const filePath = join(process.env.MD_FILE_PATH, `/blog/${data.titleEng}.mdx`);
        writeFile(filePath, data.content);
        // 获取通用参数
        data.id = getSnowflakeId();
        data.state = true;
        data.post = false;
        // 执行插入
        return this.repository.save(data);
    }

    /**
     * 更新博客
     * @param data
     */
    async update(data: UpdateArticleDto) {
        // 文章内容需要写入mdx文件
        const filePath = join(process.env.MD_FILE_PATH, `/blog/${data.titleEng}.mdx`);
        writeFile(filePath, data.content);
        // 执行更新
        await this.repository.update(data.id, omit(data, ['id', 'content']));
        return this.detail(data.id);
    }

    /**
     * 修改关于信息
     */
    async updateAboutInfo(data: { aboutContent: string; mdxContent: string; isMe: boolean }) {
        // 关于信息，写入mdx文件
        const filePath = join(process.env.MD_FILE_PATH, `/authors/kangod.mdx`);
        // 使用正则表达式匹配关于数据
        let match;
        if (data.isMe) {
            match = data.mdxContent.match(/##\s*关于我\s*👨‍💻([\s\S]*?)(?=##|$)/);
        } else {
            match = data.mdxContent.match(/##\s*关于本站\s*🌊([\s\S]*?)(?=$)/);
        }
        // 如果有匹配，替换匹配的内容
        if (match) {
            data.mdxContent = data.mdxContent.replace(match[1], `\n\n${data.aboutContent}\n\n`);
        }
        writeFile(filePath, data.mdxContent);
    }

    /**
     * 构建博客列表查询器
     * @param queryBuilder 初始查询构造器
     * @param options 排查分页选项后的查询选项
     * @param callback 添加额外的查询
     */
    protected async buildListQB(
        queryBuilder: SelectQueryBuilder<ArticleEntity>,
        options: FindParams,
        callback?: QueryHook<ArticleEntity>,
    ) {
        // 调用父类通用qb处理方法
        const qb = await super.buildListQB(queryBuilder, options, callback);
        // 子类自我实现
        const { orderBy, title, classes, tags } = options;
        const queryName = this.repository.qbName;
        // 对几个可选参数的where判断
        if (!isEmpty(title)) {
            qb.andWhere(`${queryName}.title like '%${title}%'`);
        }
        if (!isUndefined(classes)) {
            qb.andWhere(`${queryName}.classes = '${classes}'`);
        }
        if (!isEmpty(tags)) {
            // 把'yyds,awsl'转换为"'yyds','awsl'"
            const tagArray = tags.split(',');
            const formattedTags = tagArray.map((tag) => `'${tag}'`).join(',');
            qb.andWhere(`JSON_CONTAINS(${queryName}.tags, JSON_ARRAY(${formattedTags}))`);
        }
        // 排序
        this.addOrderByQuery(qb, orderBy);
        return qb;
    }

    /**
     * 对博客进行排序的Query构建
     * @param qb
     * @param orderBy 排序方式
     */
    protected addOrderByQuery(qb: SelectQueryBuilder<ArticleEntity>, orderBy?: PublicOrderType) {
        const queryName = this.repository.qbName;
        switch (orderBy) {
            // 按时间倒序
            case PublicOrderType.CREATED:
                return qb.orderBy(`${queryName}.created_at`, 'DESC');
            case PublicOrderType.UPDATED:
                return qb.orderBy(`${queryName}.updated_at`, 'DESC');
            default:
                return qb.orderBy(`${queryName}.id`, 'ASC');
        }
    }
}
