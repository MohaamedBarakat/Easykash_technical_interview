require('dotenv').config();
import express from 'express';
import db from './models';

const port = process.env.PORT || 3000


const app = express();

db.sequelize.sync().then(() => {
    app.listen(port,() => {
        console.log(`server runnin on ${port}`);
    })
});