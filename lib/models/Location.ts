import mongoose, { Schema, model, type InferSchemaType } from 'mongoose';



const locationSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true,
    },
    emergencyContact:{
        type: String,
        required: false,
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
    pets: [{
        name: {
            type: String,
            required: true,
        },
        cat: {
            type: Boolean,
            required: false,
        },
        description: {
            type: String,
            required: true,
        }
    }],
});

type Location = InferSchemaType<typeof locationSchema>;

export default ( mongoose.models.Location as mongoose.Model<Location> ) || model('Location', locationSchema );
