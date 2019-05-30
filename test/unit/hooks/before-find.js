const chai = require('chai');
const beforeFind = require('../../../hooks/before-find');

const expect = chai.expect;
    
describe('beforeFind', () => {
    const schema = 'core';
    const table = 'model';
    const model = {
        _schema: schema,
        tableName: table,
    };

    it('throws an exception if no where clause exists', () => {
        const options = {};
        expect(() => { beforeFind(model)(options) })
            .to.throw(`Must query ${schema}.${table} by tenantId`);
    });

    it('throws an exception if tenantId not in where clause', () => {
        const options = {
            where: {},
        };
        expect(() => { beforeFind(model)(options) })
            .to.throw(`Must query ${schema}.${table} by tenantId`);
    });

    it('no exception thrown when tenantId is in where clause', () => {
        const options = {
            where: {
                tenantId: '28abb2dc-c721-45f9-a12c-1f5e4e7b177f',
            },
        };
        expect(() => { beforeFind(model)(options) })
            .to.not.throw();
    });
});
