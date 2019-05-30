const chai = require('chai');
const beforeBulkDestroy = require('../../../hooks/before-bulk-destroy');

const expect = chai.expect;

describe('beforeBulkDestroy', () => {
    const schema = 'core';
    const table = 'model';
    const model = {
        _schema: schema,
        tableName: table,
    };

    it('throws an exception if no where clause exists', () => {
        const options = {};
        expect(() => { beforeBulkDestroy(model)(options) })
            .to.throw(`Must delete ${schema}.${table} by tenantId`);
    });

    it('throws an exception if tenantId not in where clause', () => {
        const options = {
            where: {},
        };
        expect(() => { beforeBulkDestroy(model)(options) })
            .to.throw(`Must delete ${schema}.${table} by tenantId`);
    });

    it('no exception thrown when tenantId is in where clause', () => {
        const options = {
            where: {
                tenantId: '1d492a28-011c-42b4-8828-505c55b766fb',
            },
        };
        expect(() => { beforeBulkDestroy(model)(options) })
            .to.not.throw();
    });
});
