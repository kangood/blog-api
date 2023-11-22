import { Controller } from '@nestjs/common';

import { BaseController } from '@/modules/restful/base';
import { Crud } from '@/modules/restful/decorators';

import { CreateNoticeDto, QueryNoticeDto, UpdateNoticeDto } from '../dto';
import { NoticeService } from '../service';

@Crud({
    id: 'notice',
    enabled: ['list', 'detail', 'store', 'update', 'delete', 'restore'],
    dtos: {
        store: CreateNoticeDto,
        update: UpdateNoticeDto,
        list: QueryNoticeDto,
    },
})
@Controller('notice')
export class NoticeController extends BaseController<NoticeService> {
    constructor(protected service: NoticeService) {
        super(service);
    }
}
