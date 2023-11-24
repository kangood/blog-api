import { Injectable } from '@nestjs/common';
import { omit } from 'lodash';

import { SelectQueryBuilder } from 'typeorm';

import { BaseService } from '@/modules/database/base';

import { QueryHook } from '@/modules/database/types';
import { PublicOrderType } from '@/modules/system/constants';

import { getSnowflakeId } from '@/modules/system/helpers';

import { CreateNoticeDto, QueryNoticeDto, UpdateNoticeDto } from '../dto';
import { NoticeEntity } from '../entity';
import { NoticeRepository } from '../repository';

// 公告查询接口
type FindParams = {
    [key in keyof Omit<QueryNoticeDto, 'limit' | 'page'>]: QueryNoticeDto[key];
};

/**
 * 公告数据操作
 */
@Injectable()
export class NoticeService extends BaseService<NoticeEntity, NoticeRepository, FindParams> {
    constructor(protected repository: NoticeRepository) {
        super(repository);
    }

    /**
     * 新建公告
     * @param data
     */
    async create(data: CreateNoticeDto) {
        // 获取通用参数
        data.id = getSnowflakeId();
        data.state = true;
        // 执行插入
        return this.repository.save(data);
    }

    /**
     * 更新公告
     * @param data
     */
    async update(data: UpdateNoticeDto) {
        await this.repository.update(data.id, omit(data, ['id']));
        return this.detail(data.id);
    }

    /**
     * 构建公告列表查询器
     * @param queryBuilder 初始查询构造器
     * @param options 排查分页选项后的查询选项
     * @param callback 添加额外的查询
     */
    protected async buildListQB(
        queryBuilder: SelectQueryBuilder<NoticeEntity>,
        options: FindParams,
        callback?: QueryHook<NoticeEntity>,
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
     * 对公告进行排序的Query构建
     * @param qb
     * @param orderBy 排序方式
     */
    protected addOrderByQuery(qb: SelectQueryBuilder<NoticeEntity>, orderBy?: PublicOrderType) {
        const queryName = this.repository.qbName;
        switch (orderBy) {
            // 按时间倒序
            case PublicOrderType.CREATED:
                return qb.orderBy(`${queryName}.created_at`, 'DESC');
            case PublicOrderType.UPDATED:
                return qb.orderBy(`${queryName}.updated_at`, 'DESC');
            // 公告需要默认按id倒序
            default:
                return qb.orderBy(`${queryName}.id`, 'DESC');
        }
    }
}
