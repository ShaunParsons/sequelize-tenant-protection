const chai = require('chai');
const beforeUpdate = require('../../../hooks/before-update');

const expect = chai.expect;

describe('beforeUpdate', () => {
    const schema = 'core';
    const table = 'model';
    const model = {
        _schema: schema,
        tableName: table,
    };

    it('throws an exception if updating \'tenantId\'', () => {
        const options = {
            fields: ['tenantId'],
        };
        expect(() => { beforeUpdate(model)({}, options) })
            .to.throw(`Can not update ${schema}.${table} tenantId`);
    });

    it('no expection thrown if not updating \'tenantId\'', () => {
        const options = {
            fields: ['name'],
        };
        expect(() => { beforeUpdate(model)({}, options) })
            .to.not.throw();
    });
});
