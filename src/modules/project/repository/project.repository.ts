import { BaseRepository } from '@/modules/database/base';
import { CustomRepository } from '@/modules/database/decorators';

import { ProjectEntity } from '../entity';

@CustomRepository(ProjectEntity)
export class ProjectRepository extends BaseRepository<ProjectEntity> {
    protected _qbName = 'project';

    buildBaseQB() {
        return this.createQueryBuilder(this.qbName);
    }
}
