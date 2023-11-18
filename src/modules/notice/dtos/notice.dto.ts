import { PartialType } from '@nestjs/swagger';
import { IsDefined, IsEnum, IsNumber, IsOptional } from 'class-validator';

import { DtoValidation } from '@/modules/core/decorators';

import { ListWithTrashedQueryDto } from '@/modules/restful/dtos';
import { PublicOrderType } from '@/modules/system/constants';

/**
 * 公告分页查询验证
 */
@DtoValidation({ type: 'query' })
export class QueryNoticeDto extends ListWithTrashedQueryDto {
    @IsEnum(PublicOrderType, {
        message: `排序规则必须是${Object.values(PublicOrderType).join(',')}其中一项`,
    })
    @IsOptional()
    orderBy?: PublicOrderType;
}

/**
 * 公告创建验证
 */
@DtoValidation({ groups: ['create'] })
export class CreateNoticeDto {
    @IsNumber(undefined, { groups: ['update'], message: '公告ID格式错误' })
    @IsDefined({ groups: ['update'], message: '公告ID必须指定' })
    id!: number;
}

/**
 * 公告更新验证
 */
@DtoValidation({ groups: ['update'] })
export class UpdateNoticeDto extends PartialType(CreateNoticeDto) {}
