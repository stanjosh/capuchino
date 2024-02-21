import mongoose, { Schema, model, type InferSchemaType } from 'mongoose';
import autopopulate from 'mongoose-autopopulate';
import bcrypt from 'bcrypt';

const userSchema = new Schema({
    name:{
      type: String,
      unique: true,
      required: false,
    },
    phone:{
      type: String,
      unique: true,
      required: true,
    },

    email:{
      type: String,
      required: true,
      unique: true,
    },
    password:{
      type: String,
      required: true,
    },
    locations: [{
      type: Schema.Types.ObjectId,
      ref: 'Location',
      autopopulate: true,
    }],
  },
);

userSchema.index({
  name: 'text',
  email: 'text',
  phone: 'text',
});


userSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }
  next();
});

userSchema.methods.isCorrectPassword = async function (password: string) {
  return bcrypt.compare(password, this.password);
};

userSchema.plugin(autopopulate);



type User = InferSchemaType<typeof userSchema>;

export default (mongoose.models.User as mongoose.Model<User>) || model('User', userSchema);