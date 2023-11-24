import { ViewColumn, ViewEntity } from 'typeorm';

@ViewEntity('article-classes-count')
export class ArticleClassesCountView {
    @ViewColumn({ name: '分类ID，关联字段' })
    classesId: number;

    @ViewColumn({ name: '分类名称' })
    classesName: string;

    @ViewColumn({ name: 'sql count(*) 数量，非数据库字段' })
    count: number;
}
