import { Injectable } from '@nestjs/common';
import { omit } from 'lodash';

import { SelectQueryBuilder } from 'typeorm';

import { BaseService } from '@/modules/database/base';

import { QueryHook } from '@/modules/database/types';
import { PublicOrderType } from '@/modules/system/constants';

import { getSnowflakeId } from '@/modules/system/helpers';

import { CreateClassesDto, QueryClassesDto, UpdateClassesDto } from '../dto';
import { ArticleClassesCountView, ClassesEntity } from '../entity';
import { ClassesRepository } from '../repository';

// 标签查询接口
type FindParams = {
    [key in keyof Omit<QueryClassesDto, 'limit' | 'page'>]: QueryClassesDto[key];
};

/**
 * 标签数据操作
 */
@Injectable()
export class ClassesService extends BaseService<ClassesEntity, ClassesRepository, FindParams> {
    constructor(protected repository: ClassesRepository) {
        super(repository);
    }

    /**
     * 分组查询各个分类对应文章数量
     */
    async countListArticleClasses(): Promise<ArticleClassesCountView[]> {
        // 一直报错：RangeError: Maximum call stack size exceeded; at TransformOperationExecutor.transform
        // const qb = await super.buildListQB(this.repository.buildBaseQB());
        // qb.select('MAX(article.id)', 'id')
        //     .addSelect('MAX(article.classes)', 'classes')
        //     .addSelect('COUNT(*)', 'count');
        // qb.groupBy('classes');
        // qb.getRawMany();

        // 使用原生SQL
        return this.repository.manager.query(
            '    SELECT' +
                '    cl.id AS classesId,' +
                '    cl.content AS classesName,' +
                '    COUNT(ar.id) AS count ' +
                'FROM' +
                '    classes cl ' +
                'LEFT JOIN' +
                '    article ar ON cl.content = ar.classes AND ar.deleted_at IS NULL ' +
                'WHERE' +
                '    cl.deleted_at IS NULL ' +
                'GROUP BY' +
                '    cl.id ' +
                'ORDER BY' +
                '    count desc',
        );
    }

    /**
     * 新建标签
     * @param data
     */
    async create(data: CreateClassesDto) {
        // 获取通用参数
        data.id = getSnowflakeId();
        data.state = true;
        // 执行插入
        return this.repository.save(data);
    }

    /**
     * 更新标签
     * @param data
     */
    async update(data: UpdateClassesDto) {
        await this.repository.update(data.id, omit(data, ['id']));
        return this.detail(data.id);
    }

    /**
     * 构建标签列表查询器
     * @param queryBuilder 初始查询构造器
     * @param options 排查分页选项后的查询选项
     * @param callback 添加额外的查询
     */
    protected async buildListQB(
        queryBuilder: SelectQueryBuilder<ClassesEntity>,
        options: FindParams,
        callback?: QueryHook<ClassesEntity>,
    ) {
        // 调用父类通用qb处理方法
        const qb = await super.buildListQB(queryBuilder, options, callback);
        // 子类自我实现
        const { orderBy } = options;
        // 对几个可选参数的where判断
        // ...
        // 排序
        this.addOrderByQuery(qb, orderBy);
        return qb;
    }

    /**
     * 对标签进行排序的Query构建
     * @param qb
     * @param orderBy 排序方式
     */
    protected addOrderByQuery(qb: SelectQueryBuilder<ClassesEntity>, orderBy?: PublicOrderType) {
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
