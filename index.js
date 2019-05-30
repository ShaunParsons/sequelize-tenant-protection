const beforeBulkUpdate = require('./hooks/before-bulk-update');
const beforeUpdate = require('./hooks/before-update');
const beforeFind = require('./hooks/before-find');
const beforeBulkDestory = require('./hooks/before-bulk-destroy');

module.exports = (sequelize) => {
    sequelize.afterDefine((model) => {
        if (!model.rawAttributes.tenantId) return;

        model.addHook('beforeFind', 'tenantProtectionBeforeFind', beforeFind(model));

        model.addHook('beforeUpdate', 'tenantProtectionBeforeUpdate', beforeUpdate(model));

        model.addHook('beforeBulkUpdate', 'tenantProtectionBeforeBulkUpdate', beforeBulkUpdate(model));

        model.addHook('beforeBulkDestroy', 'tenantProtectionBeforeBulkDestroy', beforeBulkDestory(model));
    });
};
