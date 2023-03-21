const usersApi = require('../endpoints/users/collection')

const frisby = require('frisby');
const qs = require('qs');
import S from '../../test/utils/settings.js';

exports.get_tokens = function (selectedUser) {

    S.log('black', `Logging in with  __________________________________________________________
                ${selectedUser.email} /  ${selectedUser.password}
                 _________________________________________________________________________
                 `, 'yellow');

    return frisby
        .post(S.api_url + '/token', {
            body: qs.stringify({
                username: selectedUser.email,
                password: selectedUser.password,
                grant_type: 'password',
            }),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'kick-out-user': true,
            },
        })
        //.expect('status', 200)
        .then( res => {

            if (res.body.includes('error_description')) {
                console.log(`ERROR on login ___`, 'red');
                console.log(JSON.stringify(res.body))
            }
            else{
            const accessToken = JSON.parse(res.body).access_token;
            const refreshToken = JSON.parse(res.body).refresh_token;
            const authorization = 'Bearer ' + accessToken;

            return frisby
                .post(S.api_url + '/api/users/userData', {
                    headers: {
                        'content-type': 'application/json',
                        refreshToken: refreshToken,
                        authorization: authorization,
                    },
                })
                .expect('status', 200)
                .then(resp => {

                    frisby.globalSetup({
                            request: {
                                headers: {
                                    'Content-Type': 'application/json',
                                   // 'Content-Type': 'application/x-www-form-urlencoded',
                                    officeId: JSON.parse(resp.body).officeId,
                                    organizationId: JSON.parse(resp.body).organizationId,
                                    access_token: accessToken,
                                    refreshToken: refreshToken,
                                    authorization: authorization,
                                },
                            },
                        });
                });
            }
        });
};

function get_token_status (selectedUser) {

    return token_request(selectedUser).then(response => {
        return response.status;
    });
}

exports.set_password =  async function (selectedUser) {

    await exports.get_tokens(selectedUser)
        .then( async(response) => {

            if (response.status === 200) {
                console.log('Password is already based on the current date: ' + S.getCurrentDate(S.passwordPattern));
            } else if (response.body.includes('You typed the password incorrectly')) {

                console.log('Updating the password with current date/time value');
                 await exports.update_password_by_trying_values_based_on_recent_dates(selectedUser, 1);
            } else {
                console.log(JSON.stringify(response));
            }

            let user = Object.assign({}, selectedUser);
            user.password = S.getCurrentDate(S.passwordPattern);
           // get_token_status(user).should('be.equal', 200);
        });
};

exports.set_password_for_all_accounts =  async function (acc1, acc2, acc3) {
    if (!S.isDebuggingMode()){
        await this.set_password(acc1);
        await this.set_password(acc2);
        await this.set_password(acc3);
    }
};

//workaround for changing the password, as we have Captcha that prevents having the step to Reset Password with the link
exports.update_password_by_trying_values_based_on_recent_dates = async function (selectedUser, daysBeforeTheCurrentDate) {

    if (daysBeforeTheCurrentDate < 4) {

        selectedUser.password = S.getDateBeforeXDaysInSpecificFormat(S.passwordPattern, daysBeforeTheCurrentDate);
        console.log('Trying with password: ' + selectedUser.password);

        await exports.get_tokens(selectedUser)
            .then(async (response) => {
                response = response.body;
                if (response.includes('You typed the password incorrectly')) {
                    await exports.update_password_by_trying_values_based_on_recent_dates(selectedUser, daysBeforeTheCurrentDate + 1);
                } else {
                    await exports.get_tokens(selectedUser);
                    await usersApi.update_password(selectedUser.password, S.getCurrentDate(S.passwordPattern))

                    selectedUser.password = S.getCurrentDate(S.passwordPattern);
                }
            });
    }
};

