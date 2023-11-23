import { readFile } from 'fs/promises';

import { join } from 'path';

import { Injectable } from '@nestjs/common';
import { isEmpty, omit } from 'lodash';

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
     * 获取md文件数据
     */
    async getMdFileData(fileName: string) {
        let mdFileData = '';
        // 加载并读取已上传的文件数据
        const filePath = join(process.env.MD_FILE_PATH, fileName);
        await readFile(filePath).then(async (data) => {
            mdFileData = data.toString();
        });
        return mdFileData;
    }

    /**
     * 新建博客
     * @param data
     */
    async create(data: CreateArticleDto) {
        // 获取通用参数
        data.id = getSnowflakeId();
        // 执行插入
        return this.repository.save(data);
    }

    /**
     * 更新博客
     * @param data
     */
    async update(data: UpdateArticleDto) {
        await this.repository.update(data.id, omit(data, ['id']));
        return this.detail(data.id);
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
        if (!isEmpty(classes)) {
            qb.andWhere(`${queryName}.classes = '%${classes}%'`);
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
