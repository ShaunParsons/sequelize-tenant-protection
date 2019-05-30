const chai = require('chai');
const Sequelize = require('sequelize');
const sequelizeTenantProtection = require('../../index');

const expect = chai.expect;

describe('sequelize-tenant-protection', () => {
    let sequelize;

    before(() => {
        sequelize = new Sequelize('db', 'u', 'p', {dialect: 'sqlite', operatorsAliases: false});
        sequelizeTenantProtection(sequelize);
    });

    it('correctly adds hooks to model with tenantId', () => {
        const User = sequelize.define('user', {
            id: {
                type: Sequelize.UUIDV4,
                allowNull: false,
                defaultValue: Sequelize.UUIDV4,
                primaryKey: true,
                field: 'id',
            },
            tenantId: {
                type: Sequelize.UUIDV4,
                allowNull: false,
                field: 'tenant_id',
            }
        });

        expect(User.options.hooks.beforeFind.map(h => h.name).sort()).
            to.deep.equal(['tenantProtectionBeforeFind']);
        expect(User.options.hooks.beforeUpdate.map(h => h.name).sort()).
            to.deep.equal(['tenantProtectionBeforeUpdate']);
        expect(User.options.hooks.beforeBulkUpdate.map(h => h.name).sort()).
            to.deep.equal(['tenantProtectionBeforeBulkUpdate']);
        expect(User.options.hooks.beforeBulkDestroy.map(h => h.name).sort()).
            to.deep.equal(['tenantProtectionBeforeBulkDestroy']);
    });

    it('does not add hooks to model without tenantId', () => {
        const User = sequelize.define('user', {
            id: {
                type: Sequelize.UUIDV4,
                allowNull: false,
                defaultValue: Sequelize.UUIDV4,
                primaryKey: true,
                field: 'id',
            },
        });

        expect(User.options.hooks.beforeFind).to.be.undefined;
        expect(User.options.hooks.beforeUpdate).to.be.undefined;
        expect(User.options.hooks.beforeBulkUpdate).to.be.undefined;
        expect(User.options.hooks.beforeBulkDestroy).to.be.undefined;
    });

});
