const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());


//la tabla fue creada 
/*CREATE TABLE usuarios (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
);
*/ 

// Configuración de la conexión a la base de datos
const db = mysql.createConnection({
    host: 'localhost',
    user: 'CloudSAd989a782',
    password: 'Alonso_1204',
    database: 'proyecto',
});

db.connect((err) => {
    if (err) {
        console.error('Error al conectar a la base de datos:', err);
    } else {
        console.log('Conexión a la base de datos exitosa');
    }
});

// Endpoint para el registro de usuarios
app.post('/api/register', (req, res) => {
    const { fullName, email, password } = req.body;

    // Verificar si el correo electrónico ya existe en la base de datos
    const checkEmailQuery = 'SELECT * FROM usuarios WHERE email = ?';
    db.query(checkEmailQuery, [email], (err, results) => {
        if (err) {
            console.error('Error al verificar el correo electrónico:', err);
            res.status(500).json({ success: false, error: 'Error interno del servidor' });
            return;
        }

        if (results.length > 0) {
            // El correo electrónico ya está registrado
            res.status(400).json({ success: false, error: 'El correo electrónico ya está registrado' });
        } else {
            // El correo electrónico no está registrado, proceder con la inserción
            const insertUserQuery = 'INSERT INTO usuarios (nombre, email, password) VALUES (?, ?, ?)';
            db.query(insertUserQuery, [fullName, email, password], (err, result) => {
                if (err) {
                    console.error('Error al registrar el usuario:', err);
                    res.status(500).json({ success: false, error: 'Error interno del servidor' });
                    return;
                }

                console.log('Usuario registrado con éxito');
                res.json({ success: true });
            });
        }
    });
});

// Endpoint para la autenticación de usuarios
app.post('/api/login', (req, res) => {
    const { email, password } = req.body;

    // Verificar la autenticación en la base de datos
    const checkLoginQuery = 'SELECT * FROM usuarios WHERE email = ? AND password = ?';
    db.query(checkLoginQuery, [email, password], (err, results) => {
        if (err) {
            console.error('Error al verificar la autenticación:', err);
            res.status(500).json({ success: false, error: 'Error interno del servidor' });
            return;
        }

        if (results.length > 0) {
            // Autenticación exitosa
            res.json({ success: true });
        } else {
            // Credenciales incorrectas
            res.status(401).json({ success: false, error: 'Credenciales incorrectas o registrese primero' });
        }
    });
});

// Puedes agregar más rutas según sea necesario


/*/*CREATE TABLE usuarios (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
);

INSERT INTO usuarios_admi (nombre, email, password) VALUES
('Rosario Quispe', 'rosario.quispe@utec.edu.pe', 'Ut3c_2009');

//se necesita para logear al admi usuarios
*/


app.post('/api/login_admi', (req, res) => {
    const { email, password } = req.body;

    // Verificar la autenticación en la base de datos
    const checkLoginQuery = 'SELECT * FROM usuarios_admi WHERE email = ? AND password = ?';
    db.query(checkLoginQuery, [email, password], (err, results) => {
        if (err) {
            console.error('Error al verificar la autenticación:', err);
            res.status(500).json({ success: false, error: 'Error interno del servidor' });
            return;
        }

        if (results.length > 0) {
            // Autenticación exitosa
            res.json({ success: true });
        } else {
            // Credenciales incorrectas
            res.status(401).json({ success: false, error: 'Credenciales incorrectas o registrese primero' });
        }
    });
});



// Endpoint para obtener todos los usuarios
app.get('/api/getUsers', (req, res) => {
    const getUsersQuery = 'SELECT id, nombre, email FROM usuarios';
    db.query(getUsersQuery, (err, results) => {
        if (err) {
            console.error('Error al obtener usuarios:', err);
            res.status(500).json({ success: false, error: 'Error interno del servidor' });
            return;
        }

        res.json({ success: true, users: results });
    });
});







app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});


