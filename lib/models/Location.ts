import mongoose, { Schema, model, type InferSchemaType } from 'mongoose';

import autopopulate from 'mongoose-autopopulate';

const locationSchema = new Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    pets: [{
        type: mongoose.Types.ObjectId,
        ref: 'Pet',
        autopopulate: true
    }],
    name: {
        type: String,
        required: true
    },
    itemLocations: {
        breakerBox: {type: String},
        leashCarrierCrate: {type: String},
        petFoodWaterBowlTreats: {type: String},
        cleaningSuppliesVacuum: {type: String},
        thermostat: {type: String},
        alarmPanel: {type: String},
        other: {type: String},
    },
    
});



locationSchema.plugin(autopopulate);

type Location = InferSchemaType<typeof locationSchema>;

export default ( mongoose.models.Location as mongoose.Model<Location> ) || model('Location', locationSchema );
