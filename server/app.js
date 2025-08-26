// app.js
const express     = require('express');

const cors        = require('cors');
const passport    = require('passport');
const path = require('path')
const pool          = require('./db');       // ваш pg.Pool
const mongoPromise  = require('./mongo');    // промис MongoDB
const authRoutes    = require('./routes/AuthRoutes');
const driverRoutes  = require('./routes/userRoutes');
const initDb        = require('./initDB');

const nightRoutes= require('./routes/settingsRoutes');

require('./config/passport')(passport);




const app = express();
app.use(cors());

app.use(express.json());


app.use('/auth', authRoutes);
app.use("/night", nightRoutes);


async function start() {
    try {
        // 1) Postgres
        const pgClient = await pool.connect();
        console.log('✅ Connected to Postgres:', pgClient.connectionParameters.database);
        pgClient.release();

        // 2) MongoDB
        const mongoDb = await mongoPromise;
        console.log('✅ Connected to MongoDB:', mongoDb.databaseName);
        app.locals.mongo = mongoDb;


        await initDb();

        app.use(passport.initialize());


        app.use(
            '/api',
            passport.authenticate('jwt', { session: false }),
            driverRoutes
        );
        app.use(express.static(path.join(__dirname, 'client', 'dist')));
        app.get(/.*/, (req, res) => {
            res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
        });

        const PORT = process.env.PORT || 3000;
        app.listen(PORT, () => {
            console.log(`🚀 Server listening on port ${PORT}`);
        });
    } catch (err) {
        console.error('❌ Startup error:', err);
        process.exit(1);
    }
}

start();
