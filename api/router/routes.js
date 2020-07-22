// Load the MySQL pool connection
const pool = require('../data/config');

// Route the app
const router = app => {
    // Display welcome message on the root
    app.get('/', (request, response) => {
        response.send({
            message: 'Welcome to the Azurian REST API'
        });
    });

    // Display all users
    app.get('/users', (request, response) => {
        const sql = 'SELECT * FROM users';
        
        pool.query(sql, (error, result) => {
            if (error) throw error;

            response.send(result);
        });
    });

    // Display a single user by ID
    app.get('/users/:id', (request, response) => {
        const sql = 'SELECT * FROM users WHERE id = ?';
        const id = request.params.id;

        pool.query(sql, id, (error, result) => {
            if (error) throw error;

            response.send(result);
        });
    });

    // Add a new user
    app.post('/users', (request, response) => {
        const sql = 'INSERT INTO users SET ?';
        const user = {
            name: request.body.name,
            email: request.body.email
        }
        
        pool.query(sql, user, (error, result) => {
            if (error) throw error;

            response.status(201).send(`User added with ID: ${result.insertId}`);
        });
    });

    // Update an existing user
    app.put('/users/:id', (request, response) => {
        const sql = 'UPDATE users SET ? WHERE id = ?';
        const id = request.params.id;
        const user = {
            name: request.body.name,
            email: request.body.email
        }

        pool.query(sql, [user, id], (error, result) => {
            if (error) throw error;

            response.send('User updated successfully.');
        });
    });

    // Delete a user
    app.delete('/users/:id', (request, response) => {
        const sql = 'DELETE FROM users WHERE id = ?';
        const id = request.params.id;

        pool.query(sql, id, (error, result) => {
            if (error) throw error;
            response.send('User deleted.');
        });
    });
}

// Export the router
module.exports = router;
