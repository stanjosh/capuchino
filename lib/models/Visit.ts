import mongoose, { Schema, model, type InferSchemaType } from 'mongoose';
import autopopulate from 'mongoose-autopopulate';

const visitSchema = new Schema({
    location: {
        type: Schema.Types.ObjectId,
        ref: 'Location',
        required: true,
        autopopulate: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        autopopulate: true,
    },
    type: {
        type: String,
        required: true,
        
    },
    times: [{
        type: Date,
        required: true,
        index: true,
    }],
    tasks: {
        mail: {type: Boolean},
        waterPlants: {type: Boolean},
        alternateLights: {type: Boolean},
        openCloseCurtains: {type: Boolean},
        garbageRecycle: {type: Boolean},
        tvRadioOn: {type: Boolean},
        other: {type: String},
    },
});

visitSchema.index({
    times: -1,
});

visitSchema.plugin(autopopulate);

type Visit = InferSchemaType<typeof visitSchema>;

export default ( mongoose.models.Visit as mongoose.Model<Visit> ) || model('Visit', visitSchema);
