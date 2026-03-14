export const create = async ({ model, data, options } = {}) => {
    return await model.create(data, options)
}

export const findOne = async ({ model, filter = {}, populate , select = "" } = {}) => {
    return await model.findOne(filter).populate(populate).select(select)
}

export const find = async ({ model, filter = {}, options = {} } = {}) => {
    const doc = model.find(filter)

    if (options.populate) doc.populate(options.populate)
    if (options.skip) doc.skip(options.skip)
    if (options.limit) doc.limit(options.limit)
    if (options.select) doc.select(options.select)

    return await doc.exec()
}

export const findById = async ({ model, id, select }) => {
    return model.findById(id).select(select)
}

export const updateOne = async ({ model, filter = {}, update = {}, options = {} } = {}) => {
    return await model.updateOne(filter, update, { runValidators: true, ...options })
}

export const findOneAndUpdate = async ({ model, filter = {}, update = {}, options = {} } = {}) => {
    return await model.findOneAndUpdate(filter, update, {
        new: true,
        runValidators: true,
        ...options
    })
}
