import mongoose, { Schema, model, type InferSchemaType } from 'mongoose';

import autopopulate from 'mongoose-autopopulate';

const petSchema = new Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    description: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    }
});

petSchema.plugin(autopopulate);

type Pet = InferSchemaType<typeof petSchema>;

export default (mongoose.models.Pet as mongoose.Model<Pet>) || model('Pet', petSchema);
