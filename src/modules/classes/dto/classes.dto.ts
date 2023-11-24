import { PartialType } from '@nestjs/swagger';
import { IsDefined, IsEnum, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

import { DtoValidation } from '@/modules/core/decorators';

import { IsUnique, IsUniqueExist } from '@/modules/database/constraints';
import { ListWithTrashedQueryDto } from '@/modules/restful/dtos';
import { PublicOrderType } from '@/modules/system/constants';

import { ClassesEntity } from '../entity';

/**
 * 分页查询验证
 */
@DtoValidation({ type: 'query' })
export class QueryClassesDto extends ListWithTrashedQueryDto {
    @IsEnum(PublicOrderType, {
        message: `排序规则必须是${Object.values(PublicOrderType).join(',')}其中一项`,
    })
    @IsOptional()
    orderBy?: PublicOrderType;
}

/**
 * 创建验证
 */
@DtoValidation({ groups: ['create'] })
export class CreateClassesDto {
    @IsUnique(ClassesEntity, {
        groups: ['create'],
        message: '分类名称重复',
    })
    @IsUniqueExist(ClassesEntity, {
        groups: ['update'],
        message: '分类名称重复',
    })
    @IsNotEmpty({ groups: ['create'], message: '分类名称不能为空' })
    @IsOptional({ groups: ['update'] })
    content!: string;

    @IsNumber(undefined, { groups: ['update'], message: '分类ID格式错误' })
    @IsDefined({ groups: ['update'], message: '分类ID必须指定' })
    id!: number;

    /**
     * 状态，用于在create时赋初始值
     */
    state: boolean;
}

/**
 * 更新验证
 */
@DtoValidation({ groups: ['update'] })
export class UpdateClassesDto extends PartialType(CreateClassesDto) {}
