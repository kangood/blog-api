import { Column, CreateDateColumn, DeleteDateColumn, Entity, UpdateDateColumn } from 'typeorm';

import { BoolBitTransformer } from '@/modules/core/helpers/utils';
import { BaseEntity } from '@/modules/database/base/entity';

@Entity('project', { schema: 'blog' })
export class ProjectEntity extends BaseEntity {
    @Column('varchar', {
        name: 'title',
        nullable: true,
        comment: '标题',
        length: 64,
    })
    title: string | null;

    @Column('varchar', {
        name: 'description',
        nullable: true,
        comment: '描述',
        length: 255,
    })
    description: string | null;

    @Column('varchar', {
        name: 'href',
        nullable: true,
        comment: '链接',
        length: 255,
    })
    href: string | null;

    @Column('varchar', {
        name: 'img_src',
        nullable: true,
        comment: '图片源',
        length: 255,
    })
    imgSrc: string | null;

    @Column('json', {
        name: 'tech_stack',
        nullable: true,
        comment: '图片源',
    })
    techStack: string[] | null;

    @Column('int', {
        name: 'sort_value',
        nullable: true,
        comment: '排序',
        default: () => "'1'",
    })
    sortValue: number | null;

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
