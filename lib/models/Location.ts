import mongoose, { Schema, model, type InferSchemaType } from 'mongoose';
import autopopulate from 'mongoose-autopopulate';


const locationSchema = new Schema({
    address: {
        type: String,
        required: true,

    },
    emergencyContact:{
        type: String,
        required: false,
      },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        autopopulate: true,
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


locationSchema.index({
    address: 'text',
    emergencyContact: 'text',
    "pets.name": 'text',
    "pets.description": 'text',
});

locationSchema.plugin(autopopulate);

type Location = InferSchemaType<typeof locationSchema>;

export default ( mongoose.models.Location as mongoose.Model<Location> ) || model('Location', locationSchema );
