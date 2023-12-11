import { PartialType } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsDefined, IsEnum, IsNotEmpty, IsNumber, IsOptional, Min } from 'class-validator';

import { toNumber } from 'lodash';

import { DtoValidation } from '@/modules/core/decorators';

import { ListWithTrashedQueryDto } from '@/modules/restful/dtos';
import { PublicOrderType } from '@/modules/system/constants';

/**
 * 分页查询验证
 */
@DtoValidation({ type: 'query' })
export class QueryProjectDto extends ListWithTrashedQueryDto {
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
export class CreateProjectDto {
    @IsNumber(undefined, { groups: ['update'], message: '项目ID格式错误' })
    @IsDefined({ groups: ['update'], message: '项目ID必须指定' })
    id!: number;

    @IsNotEmpty({ groups: ['create'], message: '标题不能为空' })
    @IsOptional({ groups: ['update'] })
    title!: string;

    @IsNotEmpty({ groups: ['create'], message: '描述不能为空' })
    @IsOptional({ groups: ['update'] })
    description!: string;

    @Transform(({ value }) => toNumber(value))
    @Min(1, { always: true, message: '排序值必须大于1' })
    @IsNumber(undefined, { always: true })
    @IsOptional({ always: true })
    sortValue = 1;

    /**
     * 状态，用于在create时赋初始值
     */
    state = true;
}

/**
 * 更新验证
 */
@DtoValidation({ groups: ['update'] })
export class UpdateProjectDto extends PartialType(CreateProjectDto) {}
