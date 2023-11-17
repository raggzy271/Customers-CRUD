const pg = require('pg');

const config = require('./secrets');

const dbName = 'iotas_test'

const TABLE_NAMES = {
    customers: dbName + '.customers'
}

const execute = (query, callback) => {
    const client = new pg.Client(config);
    client.connect(err => {
        if (err) {
            return callback(err, null);
        }
        client.query(query, (err, result) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, result);
            }
            client.end(function (err) {
                if (err) {
                    callback(err, null);
                }
            });
        });
    });
}

module.exports = { TABLE_NAMES, execute };
