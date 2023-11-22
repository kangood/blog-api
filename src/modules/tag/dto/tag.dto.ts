import { PartialType } from '@nestjs/swagger';
import { IsDefined, IsEnum, IsNumber, IsOptional } from 'class-validator';

import { DtoValidation } from '@/modules/core/decorators';

import { ListWithTrashedQueryDto } from '@/modules/restful/dtos';
import { PublicOrderType } from '@/modules/system/constants';

/**
 * 分页查询验证
 */
@DtoValidation({ type: 'query' })
export class QueryTagDto extends ListWithTrashedQueryDto {
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
export class CreateTagDto {
    @IsNumber(undefined, { groups: ['update'], message: '标签ID格式错误' })
    @IsDefined({ groups: ['update'], message: '标签ID必须指定' })
    id!: number;
}

/**
 * 更新验证
 */
@DtoValidation({ groups: ['update'] })
export class UpdateTagDto extends PartialType(CreateTagDto) {}
