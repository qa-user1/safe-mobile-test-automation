import imaps from 'imap-simple';

class Utils {
    async fetchGmailUnseenMails ({ username, password, markSeen }) {
        var config = {
            imap: {
                user: username,
                password: password,
                host: 'imap.gmail.com',
                port: 993,
                tls: true,
                authTimeout: 8000,
                tlsOptions: { rejectUnauthorized: false }
            }
        };

        const connection = await imaps.connect(config);
        await connection.openBox('INBOX');
        var searchCriteria = [
            'UNSEEN'
        ];
        var fetchOptions = {
            bodies: ['HEADER', 'TEXT'],
            markSeen: true,
            markRead: true
        };
        const results = await connection.search(searchCriteria, fetchOptions);
        var mails = [];
        if (results) {
            results.forEach(item => {
                var _mail = {};
                if (item && item.parts) {
                    item.parts.forEach(_item => {
                        if (_item.which === 'TEXT') {
                            _mail.body = _item.body;
                        }
                        if (_item.which === 'HEADER' && _item.body && _item.body.from && _item.body.from.length) {
                            _mail.from = _item.body.from[0];
                        }
                        if (_item.which === 'HEADER' && _item.body && _item.body.subject && _item.body.subject.length) {
                            _mail.subject = _item.body.subject[0];
                        }
                        if (_item.which === 'HEADER' && _item.body && _item.body.to && _item.body.to.length) {
                            _mail.to = _item.body.to[0];
                        }
                    });
                }
                mails.push(_mail);
            });
        }
        connection.end();
        return mails;
    }
}

export default new Utils();
