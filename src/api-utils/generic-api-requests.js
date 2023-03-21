const frisby = require('frisby');
const S = require('../test/utils/settings');
const qs = require('qs');

// return frisby
//     .post(`${baseUrl}/api/cases/${caseId}/permissions`, {
//         body: disableCLP,
//         headers: {
//             'Content-Type': 'application/json'
//         }
//     })
//     .expect('status', 200);

async function request_with_JSON_data (httpMethod, urlSuffix, requestBody, log, propertyToSaveInLocalStorage, specificResponseProperty = null) {

    function isObject (variable) {
        return Object.prototype.toString.call(variable) === '[object Object]';
    }

    return await frisby
        //  .post('https://pentestapi.trackerproducts.com/mobile', {
        // .post('https://qaapi.trackerproducts.com/mobile', {
        .get(S.api_url + urlSuffix, {
            body: qs.stringify(requestBody),
        })
        .inspectRequest()
        .inspectRequestHeaders()
        .expect('status', 200)
        .then(response => {
            let propertyName;
            let propertyValue;

            console.log('RESPONSE IS  ' + JSON.stringify(response));

            propertyName = propertyToSaveInLocalStorage || '';

            // set value to be saved in settings.js file and local storage
            if (specificResponseProperty) {
                propertyValue = JSON.stringify(response.body[specificResponseProperty]);

                if (isObject(propertyValue)) {
                    S.selectedEnvironment[propertyName] = Object.assign(S.selectedEnvironment[propertyName], JSON.parse(propertyValue));
                } else {
                    S.selectedEnvironment[propertyName] = JSON.parse(propertyValue);
                }

            } else if (response.body) {
                propertyValue = JSON.stringify(response.body);

                if (isObject(propertyValue)) {
                    S.selectedEnvironment[propertyName] = Object.assign(S.selectedEnvironment[propertyName], JSON.parse(propertyValue));
                } else {
                    S.selectedEnvironment[propertyName] = JSON.parse(propertyValue);
                }
            }

            // log message and/or ID from the response object if available
            if (response.body && response.body.id) {
                console.log(log + propertyName + ' ' + JSON.parse(propertyValue).id);
            } else {
                console.log(log + propertyName);
            }
        });

    // cy.getLocalStorage("headers").then(headers => {
    //     cy.request({
    //         url: S.api_url + urlSuffix,
    //         method: httpMethod,
    //         json: true,
    //         body: requestBody,
    //         headers: JSON.parse(headers)
    //     })
    //         .then(response => {
    //             let propertyName;
    //             let propertyValue;
    //
    //             propertyName = propertyToSaveInLocalStorage || '';
    //
    //             // set value to be saved in settings.js file and local storage
    //             if (specificResponseProperty) {
    //                 propertyValue = JSON.stringify(response.body[specificResponseProperty]);
    //
    //                 if (isObject(propertyValue)) {
    //                     S.selectedEnvironment[propertyName] = Object.assign(S.selectedEnvironment[propertyName], JSON.parse(propertyValue));
    //                 } else {
    //                     S.selectedEnvironment[propertyName] = JSON.parse(propertyValue);
    //                 }
    //
    //                 cy.setLocalStorage(propertyName, propertyValue);
    //             } else if (response.body) {
    //                 propertyValue = JSON.stringify(response.body);
    //
    //                 if (isObject(propertyValue)) {
    //                     S.selectedEnvironment[propertyName] = Object.assign(S.selectedEnvironment[propertyName], JSON.parse(propertyValue));
    //                 } else {
    //                     S.selectedEnvironment[propertyName] = JSON.parse(propertyValue);
    //                 }
    //
    //                 cy.setLocalStorage(propertyName, propertyValue);
    //             }
    //
    //             // log message and/or ID from the response object if available
    //             if (response.body && response.body.id) {
    //                 cy.log(log + propertyName + ' ' + JSON.parse(propertyValue).id);
    //             } else {
    //                 cy.log(log + propertyName);
    //             }
    //         });
    // });
    //  return this;
}


exports.POST = async function (urlSuffix, requestBody, log, propertyToSave) {
    return await frisby
        .post(S.api_url + urlSuffix,{
                body: requestBody,
            })
        .expect('status', 200)
        .then(response => {

            let propertyName;
            let propertyValue;

            propertyName = propertyToSave || '';

            // set value to be saved in settings.js file
                propertyValue = JSON.stringify(response.body);

                if (isObject(propertyValue)) {
                    S.selectedEnvironment[propertyName] = Object.assign(S.selectedEnvironment[propertyName], JSON.parse(propertyValue));
                } else {
                    S.selectedEnvironment[propertyName] = JSON.parse(propertyValue);
                }

            // log message and/or ID from the response object if available
            if (response.body && response.body.id) {
                console.log(log + propertyName + ' ' + JSON.parse(propertyValue).id);
            } else {
                S.log('black', '*********************************************    ' + log + propertyName + '     *********************************************', 'green');
            }
        });
};

exports.PUT = async function (urlSuffix, requestBody, log, propertyToSave) {
    return await frisby
        .put(S.api_url + urlSuffix,{
            //body: qs.stringify(requestBody),
            body: requestBody,
            json: true
        })
        .catch(err => {
            console.log('Error!', err);
        })
         // .inspectRequestHeaders()
         // .inspectRequest()
        .expect('status', 200)
        .then(response => {

            let propertyName;
            let propertyValue;

            propertyName = propertyToSave || '';

            // set value to be saved in settings.js file
            propertyValue = JSON.stringify(response.body);

            if (isObject(propertyValue)) {
                S.selectedEnvironment[propertyName] = Object.assign(S.selectedEnvironment[propertyName], JSON.parse(propertyValue));
            } else {
                S.selectedEnvironment[propertyName] = JSON.parse(propertyValue);
            }

            // log message and/or ID from the response object if available
            if (response.body && response.body.id) {
                console.log(log + propertyName + ' ' + JSON.parse(propertyValue).id);
            } else {
                S.log('black', '*********************************************    ' + log + propertyName + '     *********************************************', 'green');
            }
        });
};

exports.DELETE = function (urlSuffix, requestBody, log) {
    request_with_JSON_data('DELETE', urlSuffix, requestBody, log);
    return this;
};

function isObject (variable) {
    return Object.prototype.toString.call(variable) === '[object Object]';
}

exports.GET = async function (urlSuffix, log, propertyToSave, specificResponseProperty) {

    return await frisby
        .get(S.api_url + urlSuffix)
        .expect('status', 200)
        .then(response => {

            let propertyName;
            let propertyValue;

            propertyName = propertyToSave || '';

            // set value to be saved in settings.js file
            if (specificResponseProperty) {
                propertyValue = response.body[specificResponseProperty];

          /*  if (specificResponseProperty) {
                propertyValue = response.body[specificResponseProperty];*/

                if (isObject(propertyValue)) {
                    S.selectedEnvironment[propertyName] = Object.assign(S.selectedEnvironment[propertyName], JSON.parse(propertyValue));
                } else {
                    S.selectedEnvironment[propertyName] = JSON.parse(propertyValue);
                }
                }
            else if (response.body) {

              if (response.body) {
                propertyValue = response.body;

                if (isObject(propertyValue)) {
                    S.selectedEnvironment[propertyName] = Object.assign(S.selectedEnvironment[propertyName], JSON.parse(propertyValue));
                } else {
                    S.selectedEnvironment[propertyName] = JSON.parse(propertyValue);
                }
            }
            }

            // log message and/or ID from the response object if available
            if (response.body && response.body.id) {
                console.log(log + propertyName + ' ' + JSON.parse(propertyValue).id);
            } else {
                console.log(log + propertyName);
            }
            });


};

