import { Column, CreateDateColumn, DeleteDateColumn, Entity, UpdateDateColumn } from 'typeorm';

import { BoolBitTransformer } from '@/modules/core/helpers/utils';
import { BaseEntity } from '@/modules/database/base/entity';

@Entity('tag', { schema: 'blog' })
export class TagEntity extends BaseEntity {
    @Column('varchar', {
        name: 'content',
        nullable: true,
        comment: '内容',
        length: 255,
    })
    content: string | null;

    @Column('bit', {
        name: 'state',
        nullable: true,
        comment: '状态',
        transformer: new BoolBitTransformer(),
    })
    state: boolean | null;

    @DeleteDateColumn({
        name: 'deleted_at',
        nullable: true,
        comment: '删除时间',
    })
    deletedAt: Date | null;

    @CreateDateColumn({
        name: 'created_at',
        nullable: true,
        comment: '创建时间',
    })
    createdAt: Date | null;

    @Column('bigint', { name: 'created_by', nullable: true, comment: '创建人' })
    createdBy: number | null;

    @UpdateDateColumn({
        name: 'updated_at',
        nullable: true,
        comment: '修改时间',
    })
    updatedAt: Date | null;

    @Column('bigint', { name: 'updated_by', nullable: true, comment: '修改人' })
    updatedBy: number | null;
}
