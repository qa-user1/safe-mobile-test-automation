const S = require('./settings');

exports.userRoles = {
    systemAdmin: 'System Admin',
    orgAdmin: 'Org Admin',
    adminUser: 'Admin User',
    powerUser: 'Power User',
    basicUser: 'Basic User',
    blockedUser: 'Blocked User',
    readOnlyUser: 'Read-Only User',
};

exports.getTestAccounts = function (environment, orgNum ) {

    exports.userAccounts = {};

  /*  exports.userAccounts_WebOrg= {
        orgAdmin: {
            title: exports.userRoles.orgAdmin,
            email: `qa+orgadmin1@trackerproducts.com`,
            password: S.getCurrentDate(S.passwordPattern),
            name: 'OrgAdmin, Cypress',
            firstAndLastName: 'Cypress OrgAdmin',
            firstName: 'Cypress',
            lastName: 'OrgAdmin',
          //  officeId: environment.office_1.id,
            organizationId: environment.orgSettings.id,
            id: environment.users.orgAdmin.id,
            guid: environment.users.orgAdmin.guid
        },
        orgAdmin2: {
            title: exports.userRoles.orgAdmin,
            email: 'qa+orgadmin1_2@trackerproducts.com',
            password: S.getCurrentDate(S.passwordPattern),
           // officeId: environment.office_1.id,
            organizationId: environment.orgSettings.id,
            id: environment.users.orgAdmin.id,
            guid: environment.users.orgAdmin.guid
        },
        org2Admin: {
            title: exports.userRoles.orgAdmin,
            email: 'qa+orgadmin2@trackerproducts.com',
            password: S.getCurrentDate(S.passwordPattern),
            officeId: environment.org2Admin.officeId,
            organizationId: environment.org2Admin.organizationId,
            id: environment.org2Admin.id,
            guid: environment.org2Admin.guid
        },
        powerUser: {
            title: exports.userRoles.powerUser,
            email: `qa+poweruser1@trackerproducts.com`,
            name: 'Power',
            firstName: 'Power',
            lastName: 'User',
            password: S.getCurrentDate(S.passwordPattern),
            officeId: environment.office_1.id,
            organizationId: environment.orgSettings.id,
            id: environment.users.powerUser.id,
            guid: environment.users.powerUser.guid
        },
        // clpUser: {
        //     title: exports.userRoles.powerUser,
        //     email: `qa+clp${orgNum}@trackerproducts.com`,
        //     name: 'CLP',
        //     firstName: 'CLP',
        //     lastName: 'User',
        //     password: S.getCurrentDate(S.passwordPattern),
        //     officeId: environment.office_1.id,
        //     organizationId: environment.orgSettings.id,
        //     id: environment.users.clpUser.id,
        //     guid: environment.users.clpUser.guid
        // }
    }*/

    exports.userAccounts_MobileOrg = {
        orgAdmin: {
            title: exports.userRoles.orgAdmin,
            email: `smukaca+adminorg${orgNum}@trackerproducts.com`,
            //password: S.getCurrentDate(S.passwordPattern),
            password:'Qwerty123!',
            name: 'WebDriverIO OrgAdmin',
            firstName: 'WebDriverIO',
            lastName: 'OrgAdmin',
            officeId: environment.office_1.id,
            organizationId: environment.orgSettings.id,
            id: environment.users.orgAdmin.id,
            guid: environment.users.orgAdmin.guid
        },
        orgAdmin2: {
            title: exports.userRoles.orgAdmin,
            email: 'smukaca+adminorg2@trackerproducts.com',
            //password: S.getCurrentDate(S.passwordPattern),
            password: 'Qwerty123!',
            name: 'Sajida OrgAdmin',
            firstName: 'Sajida',
            lastName: 'OrgAdmin',
            officeId: environment.office_1.id,
            organizationId: environment.orgSettings.id,
            id: environment.users.orgAdmin.id,
            guid: environment.users.orgAdmin.guid
        },
        org2Admin: {
            title: exports.userRoles.orgAdmin,
            email: 'smukaca+orgadmin2@trackerproducts.com',
            //password: S.getCurrentDate(S.passwordPattern),
            password: 'Qwerty123!',
            name: 'External orgAdmin',
            firstName: 'External',
            lastName: 'orgAdmin',
            officeId: environment.org2Admin.officeId,
            organizationId: environment.org2Admin.organizationId,
            id: environment.org2Admin.id,
            guid: environment.org2Admin.guid
        },
        powerUser: {
            title: exports.userRoles.powerUser,
            email: `smukaca+poweruser@trackerproducts.com`,
            name: 'WdIO PowerUser',
            firstName: 'WdIO',
            lastName: 'PowerUser',
            //password: S.getCurrentDate(S.passwordPattern),
            password: 'Qwerty123!',
            officeId: environment.office_1.id,
            organizationId: environment.orgSettings.id,
            id: environment.users.powerUser.id,
            guid: environment.users.powerUser.guid
        },
        // clpUser: {
        //     title: exports.userRoles.powerUser,
        //     email: `smukaca+clp${orgNum}@trackerproducts.com`,
        //     name: 'CLP',
        //     firstName: 'CLP',
        //     lastName: 'User',
        //     password: S.getCurrentDate(S.passwordPattern),
        //     officeId: environment.office_1.id,
        //     organizationId: environment.orgSettings.id,
        //     id: environment.users.clpUser.id,
        //     guid: environment.users.clpUser.guid
        // }
    }

    return (orgNum === 1)? exports.userAccounts_MobileOrg: exports.userAccounts_WebOrg
};

module.exports = exports;
