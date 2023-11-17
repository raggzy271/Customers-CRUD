# Customers-CRUD-API

## A CRUD application built on Node JS using the Express Framework and Postgresql for database management.

### GET /api/get?id={Customer ID}

<p>Checks if customer exists using ID. If it does, then fetches it from the database.</p>

#### HTTP 200 OK
```
{
    "status": true,
    "message": "Customer found",
    "customer": {
        "id": {Customer ID},
        "name": {Customer Name},
        "email": {Customer Email}
    }
}
```

#### HTTP 500 Internal Server Error
```
{
    "status": false,
    "message": "Internal server error",
}
```

#### HTTP 404 Not Found
```
{
    "status": false,
    "message": "Customer not found"
}
```

### GET /api/list

<p>Fetches the customer list from the database.</p>

#### HTTP 200 OK
```
{
    "status": true,
    "message": "Customer list found",
    "customerList": [
        {
            "id": {Customer 1 ID},
            "name": {Customer 1 Name},
            "email": {Customer 1 Email}
        },
        {
            "id": {Customer 2ID},
            "name": {Customer 2 Name},
            "email": {Customer 2 Email}
        },
        ...
    ]
}
```

#### HTTP 404 Not Found
```
{
    "status": false,
    "message": "Customer list not found"
}
```

#### HTTP 500 Internal Server Error
```
{
    "status": false,
    "message": "Internal server error",
}
```

### POST /api/add

<p>Adds the customer to the database. It also checks if the email does not already exist.</p>

<b>BODY</b>
```
name: {Customer Name}
email: {Customer Email}
```

#### HTTP 200 OK
```
{
    "status": true,
    "message": "Customer added",
    "id": {New Customer's ID}
}
```

#### HTTP 400 Bad Request
```
{
    "status": false,
    "message": "Invalid request body"
}
```

#### HTTP 400 Bad Request
```
{
    "status": false,
    "message": "Email already exists"
}
```

#### HTTP 500 Internal Server Error
```
{
    "status": false,
    "message": "Internal server error",
}
```

### PUT /api/edit

<p>Edits the customer in the database. It also checks - (1) if the customer exists and (2) if the new email does not already exist.</p>

<b>BODY</b>
```
id: {Customer ID}
name: {Customer Name}
email: {Customer Email}
```

#### HTTP 200 OK
```
{
    "status": true,
    "message": "Customer updated",
    "id": {Updated Customer's ID}
}
```

#### HTTP 400 Bad Request
```
{
    "status": false,
    "message": "Invalid request body"
}
```

#### HTTP 400 Bad Request
```
{
    "status": false,
    "message": "Email already exists"
}
```

#### HTTP 404 Not Found
```
{
    "status": false,
    "message": "Customer does not exist"
}
```

#### HTTP 500 Internal Server Error
```
{
    "status": false,
    "message": "Internal server error",
}
```

### DELETE /api/delete

<p>Deletes the customer from the database. It also checks if the customer exists and returns the deleted customer.</p>

<b>BODY</b>
```
id: {Customer ID}
```

#### HTTP 200 OK
```
{
    "status": true,
    "message": "Customer deleted",
    "deletedCustomer": {
        "id": {Customer ID},
        "name": {Customer Name},
        "email": {Customer Email}
    }
}
```

#### HTTP 400 Bad Request
```
{
    "status": false,
    "message": "Invalid request body"
}
```

#### HTTP 404 Not Found
```
{
    "status": false,
    "message": "Customer does not exist"
}
```

#### HTTP 500 Internal Server Error
```
{
    "status": false,
    "message": "Internal server error",
}
```