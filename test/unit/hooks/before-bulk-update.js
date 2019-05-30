const chai = require('chai');
const beforeBulkUpdate = require('../../../hooks/before-bulk-update');

const expect = chai.expect;

describe('beforeBulkUpdate', () => {
    const schema = 'core';
    const table = 'model';
    const model = {
        _schema: schema,
        tableName: table,
    };

    it('throws an exception if no where clause exists', () => {
        const options = {};
        expect(() => { beforeBulkUpdate(model)(options) })
            .to.throw(`Must update ${schema}.${table} by tenantId`);
    });

    it('throws an exception if tenantId not in where clause', () => {
        const options = {
            where: {},
        };
        expect(() => { beforeBulkUpdate(model)(options) })
            .to.throw(`Must update ${schema}.${table} by tenantId`);
    });

    it('no exception thrown when tenantId is in where clause', () => {
        const options = {
            where: {
                tenantId: '1d492a28-011c-42b4-8828-505c55b766fb',
            },
        };
        expect(() => { beforeBulkUpdate(model)(options) })
            .to.not.throw();
    });
});
