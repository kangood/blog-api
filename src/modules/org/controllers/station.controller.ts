import { Controller, Get, Query, Res } from '@nestjs/common';
import { FastifyReply } from 'fastify';

import { BaseController } from '@/modules/restful/base';
import { Crud } from '@/modules/restful/decorators';

import { CreateStationDto, QueryStationDto, UpdateStationDto } from '../dtos';

import { StationService } from '../services';

@Crud({
    id: 'station',
    enabled: ['list', 'detail', 'store', 'update', 'delete', 'restore'],
    dtos: {
        store: CreateStationDto,
        update: UpdateStationDto,
        list: QueryStationDto,
    },
    preAuth: 'org:station:',
})
@Controller('station')
export class StationController extends BaseController<StationService> {
    constructor(protected service: StationService) {
        super(service);
    }

    @Get('listRelate')
    listRelate(@Query() options: QueryStationDto) {
        return this.service.listRelate(options);
    }

    @Get('exportExcel')
    exportExcel(@Query() options: QueryStationDto, @Res() response: FastifyReply) {
        return this.service.exportExcel(options, response);
    }
}
