import { BaseRepository } from '@/modules/database/base';
import { CustomRepository } from '@/modules/database/decorators';

import { ClassesEntity } from '../entity';

@CustomRepository(ClassesEntity)
export class ClassesRepository extends BaseRepository<ClassesEntity> {
    protected _qbName = 'classes';

    buildBaseQB() {
        return this.createQueryBuilder(this.qbName);
    }
}
