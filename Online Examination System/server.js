const express = require('express');

require('./database/db');

const session = require('express-session');

const cors = require('cors');

const path = require('path');

require('dotenv').config();

const app = express();

app.use(cors({

    origin: true,

    credentials: true

}));

app.use(express.json());

app.use(express.urlencoded({

    extended: true

}));

app.use(session({

    secret: process.env.SESSION_SECRET,

    resave: false,

    saveUninitialized: false,

    cookie: {

        secure: false,

        maxAge: 1000 * 60 * 60 * 24

    }

}));

app.use(

    express.static(

        path.join(__dirname, 'public')

    )

);

const authRoutes =
    require('./routes/authRoutes');

const adminRoutes =
    require('./routes/adminRoutes');

const studentRoutes =
    require('./routes/studentRoutes');

app.use('/api', authRoutes);

app.use('/api/admin', adminRoutes);

app.use('/api/student', studentRoutes);

app.get('/', (req, res) => {

    res.send(
        'Online Exam System Backend Running'
    );

});

app.use((req, res) => {

    res.status(404).json({

        success: false,

        error: 'Route not found'

    });

});

const PORT =
    process.env.PORT || 3000;

app.listen(PORT, () => {

    console.log(`Server:http://localhost:${PORT}`);

});