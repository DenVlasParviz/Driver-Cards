const express    = require('express');
const router     = express.Router();

 router.get('/:driverId', async (req, res) => {
    try{
        const db = req.app.locals.mongo;
        const col = db.collection('driverSettings');
        const id = req.params.driverId;

        const doc = await col.findOne({driverId: id});
        res.json({isNight: !!doc?.isNight});

    }catch(err){
        console.error(err)
        res.status(500).send(err.message);
    }
})
router.post('/:driverId', async(req, res) => {
     try {
        const db = req.app.locals.mongo;
        const col = db.collection('driverSettings');
        const id = req.params.driverId;
        const {isNight} = req.body;

        await col.updateOne({driverId: id}, {$set: {isNight}}, {upsert: true});
        res.status(204).end();
    }catch(err){
         console.error(err)
         res.status(500).send(err.message);
     }
})
module.exports= router;