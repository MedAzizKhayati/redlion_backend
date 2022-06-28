import { SelectQueryBuilder } from "typeorm";

export function paginate(
    qb: SelectQueryBuilder<any>,
    page = 1,
    limit = 10,
) : SelectQueryBuilder<any> {
    page = isNaN(page) ? 1 : page;
    limit = isNaN(limit) ? 10 : limit;
    return qb
        .skip((page - 1) * limit)
        .take(limit);
}