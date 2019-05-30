module.exports = model => (options) => {
    if (!options.where || !options.where.tenantId) throw new Error(`Must update ${model._schema}.${model.tableName} by tenantId`);
    if (options.fields && options.fields.indexOf('tenantId') !== -1) throw new Error(`Can not update ${model._schema}.${model.tableName} tenantId`);
};
