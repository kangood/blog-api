import { BaseRepository } from '@/modules/database/base';
import { CustomRepository } from '@/modules/database/decorators';

import { ArticleEntity } from '../entity';

@CustomRepository(ArticleEntity)
export class ArticleRepository extends BaseRepository<ArticleEntity> {
    protected _qbName = 'article';

    buildBaseQB() {
        return this.createQueryBuilder(this.qbName);
    }
}
