import mongoose, { Schema, model, type InferSchemaType } from 'mongoose';
import autopopulate from 'mongoose-autopopulate';


const locationSchema = new Schema({
    address: {
        type: String,
        required: true,
        unique: true,
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
    personsWithAccess: {
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
            index: true,
        },
        type: {
            type: String,
            required: false,
            default: 'dog'
        },
        description: {
            type: String,
            required: false,
        }
    }],
});


locationSchema.index({
    "$**": "text"
});

locationSchema.plugin(autopopulate);

type Location = InferSchemaType<typeof locationSchema>;

export default ( mongoose.models.Location as mongoose.Model<Location> ) || model('Location', locationSchema );
