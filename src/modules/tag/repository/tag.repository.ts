import { BaseRepository } from '@/modules/database/base';
import { CustomRepository } from '@/modules/database/decorators';

import { TagEntity } from '../entity';

@CustomRepository(TagEntity)
export class TagRepository extends BaseRepository<TagEntity> {
    protected _qbName = 'tag';

    buildBaseQB() {
        return this.createQueryBuilder(this.qbName);
    }
}
