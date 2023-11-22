import { BaseRepository } from '@/modules/database/base';
import { CustomRepository } from '@/modules/database/decorators';

import { NoticeEntity } from '../entity';

@CustomRepository(NoticeEntity)
export class NoticeRepository extends BaseRepository<NoticeEntity> {
    protected _qbName = 'notice';

    buildBaseQB() {
        return this.createQueryBuilder(this.qbName);
    }
}
