import { Injectable } from '@nestjs/common';
import { omit } from 'lodash';

import { SelectQueryBuilder } from 'typeorm';

import { BaseService } from '@/modules/database/base';

import { QueryHook } from '@/modules/database/types';

import { getSnowflakeId } from '@/modules/system/helpers';

import { CreateProjectDto, QueryProjectDto, UpdateProjectDto } from '../dto';
import { ProjectEntity } from '../entity';
import { ProjectRepository } from '../repository';

// 项目查询接口
type FindParams = {
    [key in keyof Omit<QueryProjectDto, 'limit' | 'page'>]: QueryProjectDto[key];
};

/**
 * 项目数据操作
 */
@Injectable()
export class ProjectService extends BaseService<ProjectEntity, ProjectRepository, FindParams> {
    constructor(protected repository: ProjectRepository) {
        super(repository);
    }

    /**
     * 新建项目
     * @param data
     */
    async create(data: CreateProjectDto) {
        // 获取通用参数
        data.id = getSnowflakeId();
        // 执行插入
        return this.repository.save(data);
    }

    /**
     * 更新项目
     * @param data
     */
    async update(data: UpdateProjectDto) {
        await this.repository.update(data.id, omit(data, ['id']));
        return this.detail(data.id);
    }

    /**
     * 构建项目列表查询器
     * @param queryBuilder 初始查询构造器
     * @param options 排查分页选项后的查询选项
     * @param callback 添加额外的查询
     */
    protected async buildListQB(
        queryBuilder: SelectQueryBuilder<ProjectEntity>,
        options: FindParams,
        callback?: QueryHook<ProjectEntity>,
    ) {
        // 调用父类通用qb处理方法
        const qb = await super.buildListQB(queryBuilder, options, callback);
        // 子类自我实现，对几个可选参数的where判断
        // ...
        // 排序
        this.addOrderByQuery(qb);
        return qb;
    }

    /**
     * 对项目进行排序的Query构建
     * @param qb
     * @param orderBy 排序方式
     */
    protected addOrderByQuery(qb: SelectQueryBuilder<ProjectEntity>) {
        const queryName = this.repository.qbName;
        return qb.orderBy(`${queryName}.sort_value`, 'ASC');
    }
}
