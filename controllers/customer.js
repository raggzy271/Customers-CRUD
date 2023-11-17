const db = require('../util/db');

const table = db.TABLE_NAMES.customers;

const checkIfEmailExists = (email, excludeId, callback) => {
    let query;
    if (excludeId) {
        query = `select * from ${table} WHERE email = '${email}' AND id != ${excludeId};`;
    }
    else {
        query = `select * from ${table} WHERE email = '${email}';`;
    }
    db.execute(query, (err, result) => { 
        if (err) {
            callback(err, null);
        }
        else {
            callback(null, result.rowCount > 0);
        }
    });
}

const getCustomer = (req, res, next) => {
    const id = req.query.id;

    const query = `select * from ${table} WHERE id = ${id};`;
    db.execute(query, (err, result) => {
        const response = {
            status: false,
            message: '',
            customer: null
        }

        if (err) {
            console.error('Error executing query', err);
            response.message = 'Internal server error';
            res.status(500).json(response);
            return;
        }

        if (result.rowCount > 0) {
            response.status = true;
            response.message = 'Customer found';
            response.customer = result.rows[0];
            res.status(200).json(response);
            return;
        }

        response.message = 'Customer not found';
        res.status(404).json(response);
    });
}

const getCustomerList = (req, res, next) => {
    const query = `select * from ${table} ORDER BY id;`;
    db.execute(query, (err, result) => {
        const response = {
            status: false,
            message: '',
            customerList: null
        };

        if (err) {
            console.error('Error executing query', err);
            response.message = 'Internal server error';
            res.status(500).json(response);
            return;
        }

        if (result) {
            response.status = true;
            response.message = 'Customer list found';
            response.customerList = result.rows;
            res.status(200).json(response);
            return;
        }

        response.message = 'Customer list not found';
        res.status(404).json(response);
    });
}

const addCustomer = (req, res, next) => {
    const response = {
        status: false,
        message: '',
        id: null
    };

    const body = req.body;
    if (!body) {
        response.message = 'Invalid request body';
        res.status(400).json(response);
        return;
    }

    const name = body.name;
    const email = body.email;
    if (!(name && email)) {
        response.message = 'Invalid request body';
        res.status(400).json(response);
        return;
    }

    // check if email already exists
    checkIfEmailExists(email, null, (err, exists) => {
        if (err) {
            console.error('Error executing query', err);
            response.message = 'Internal server error';
            res.status(500).json(response);
            return;
        }

        if (exists) {
            response.message = 'Email already exists';
            res.status(400).json(response);
            return;
        }

        const query = `insert into ${table} (name, email) values ('${name}', '${email}') RETURNING id;`;
        db.execute(query, (err, result) => {
            if (err) {
                console.error('Error executing query', err);
                response.message = 'Internal server error';
                res.status(500).json(response);
                return;
            }

            if (result.rowCount > 0) {
                response.status = true;
                response.message = 'Customer added';
                response.id = result.rows[0].id;
                res.status(200).json(response);
                return;
            }

            response.message = 'Internal server error';
            res.status(500).json(response);
        });
    });
};

const editCustomer = (req, res, next) => {
    const response = {
        status: false,
        message: '',
        id: null
    };

    const body = req.body;
    if (!body) {
        response.message = 'Invalid request body';
        res.status(400).json(response);
        return;
    }

    const id = body.id;
    const name = body.name;
    const email = body.email;
    if (!(id && name && email)) {
        response.message = 'Invalid request body';
        res.status(400).json(response);
        return;
    }

    // check if email already exists
    checkIfEmailExists(email, id, (err, exists) => {
        if (err) {
            console.error('Error executing query', err);
            response.message = 'Internal server error';
            res.status(500).json(response);
            return;
        }

        if (exists) {
            response.message = 'Email already exists';
            res.status(400).json(response);
            return;
        }

        const query = `update ${table} set name = '${name}', email = '${email}' where id = ${id} RETURNING id;`;
        db.execute(query, (err, result) => {
            if (err) {
                console.error('Error executing query', err);
                response.message = 'Internal server error';
                res.status(500).json(response);
                return;
            }

            if (result.rowCount > 0) {
                response.status = true;
                response.message = 'Customer updated';
                response.id = result.rows[0].id;
                res.status(200).json(response);
                return;
            }

            response.message = 'Customer does not exist';
            res.status(404).json(response);
        });
    });
};

const deleteCustomer = (req, res, next) => {
    const response = {
        status: false,
        message: '',
        deletedCustomer: null
    };

    const body = req.body;
    if (!body) {
        response.message = 'Invalid request body';
        res.status(400).json(response);
        return;
    }

    const id = body.id;
    if (!id) {
        response.message = 'Invalid request body';
        res.status(400).json(response);
        return;
    }

    const query = `delete from ${table} where id = ${id} RETURNING *;`;
    db.execute(query, (err, result) => {
        if (err) {
            console.error('Error executing query', err);
            response.message = 'Internal server error';
            res.status(500).json(response);
            return;
        }

        if (result.rowCount > 0) {
            response.status = true;
            response.message = 'Customer deleted';
            response.deletedCustomer = result.rows[0];
            res.status(200).json(response);
            return;
        }

        response.message = 'Customer does not exist';
        res.status(404).json(response);
    });
};

module.exports = {
    getCustomer,
    getCustomerList,
    addCustomer,
    editCustomer,
    deleteCustomer
}