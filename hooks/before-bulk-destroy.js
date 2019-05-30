module.exports = model => (options) => {
    if (!options.where || !options.where.tenantId) throw new Error(`Must delete ${model._schema}.${model.tableName} by tenantId`);
};
