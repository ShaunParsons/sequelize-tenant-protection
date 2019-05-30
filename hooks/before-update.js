module.exports = model => (entity, options) => {
    if (options.fields.indexOf('tenantId') !== -1) throw new Error(`Can not update ${model._schema}.${model.tableName} tenantId`);
};
