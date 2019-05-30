# sequelize-tenant-protection

[Sequelize](https://github.com/sequelize/sequelize) plugin to enforce the protection of tenant data in a multi-tenanted database. It will prevent querying, updating and deleting data if a `tenantId` is not specified in the query.

## Future Work
* Make `tenantId` configurable
* Check to ensure a single `tenantId` has been provided

# Usage

```js
const Sequelize = require('sequelize');
const sequelizeTenantProtection = require('sequelize-tenant-protection');

const sequelize = new Sequelize(...);

sequelizeTenantProtection(sequelize);
