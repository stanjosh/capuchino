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
    times: [{
        type: Date,
        required: true
    }],
    tasks: {
        mail: {type: Boolean},
        waterPlants: {type: Boolean},
        alternateLights: {type: Boolean},
        openCloseCurtains: {type: Boolean},
        garbageRecycle: {type: Boolean},
        tvRadioOn: {type: Boolean},
    },
});

visitSchema.plugin(autopopulate);

type Visit = InferSchemaType<typeof visitSchema>;

export default ( mongoose.models.Visit as mongoose.Model<Visit> ) || model('Visit', visitSchema);
