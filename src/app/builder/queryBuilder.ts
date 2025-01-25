import { FilterQuery, Query } from 'mongoose'

class QueryBuilder<T> {
  public modelQuery: Query<T[], T>;
  public query: Record<string, unknown>;

  constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
    this.modelQuery = modelQuery
    this.query = query
  }

  search(fields: string[]) {
    if (this.query.search) {
      const searchRegex = new RegExp(this.query.search as string, 'i')
      this.modelQuery = this.modelQuery.find({
        $or: fields.map(field => ({ [field]: searchRegex })),
      })
    }
    return this
  }

  filter() {
    const queryObj = { ...this.query }
    const excludedFields = [
      'searchTerm',
      'sort',
      'limit',
      'page',
      'skip',
      'fields',
    ]
    excludedFields.forEach(el => delete queryObj[el])
    if (this.query.minPrice && this.query.maxPrice) {
      this.modelQuery = this.modelQuery.find({
        $and: [
          { price: { $gt: this.query.minPrice } },
          { price: { $lte: this.query.maxPrice } },
        ],
      } as FilterQuery<T>)
    } else {
      this.modelQuery = this.modelQuery.find(queryObj as FilterQuery<T>)
    }
    return this
  }
  sort() {
    const sort =
      (this?.query?.sort as string)?.split(',')?.join() || '-createdAt'
    this.modelQuery = this.modelQuery.sort(sort as string)
    return this
  }

  paginate() {
    const page = Number(this?.query?.page) | 1;
    const limit = Number(this?.query?.limit) | 1;
    const skip = (page - 1) * limit | 1;
    this.modelQuery = this.modelQuery.skip(skip).limit(limit);
    return this;
  }

  async count() {
    const filter =  this.modelQuery.getFilter()
    const total = await this.modelQuery.model.countDocuments(filter)
    const page = Number(this.query.page)
    const limit = Number(this.query.limit)
    const totalPage = Math.ceil(total / limit)
    return {
      page,
      limit,
      total,
      totalPage
    }
  }
}

export default QueryBuilder
