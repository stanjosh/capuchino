import connectMongo from "./mongoose";
import { Visit, Location, User, Pet } from "./models/index";




const db = {
    visit: {
        getOne: async (id: string) => {
            await connectMongo();
            const visitData =  await Visit.findById(id);
            return visitData;
        },

        getAll: async () => {
            await connectMongo();
            const visitData =  await Visit.find();
            return visitData;
        },

        create: async (visitData: typeof Visit) => {
            await connectMongo();
            const newVisitData = await Visit.create(visitData);
            return newVisitData;
        }
    },

    location : {

        getOne: async (id: string) => {
            console.log('id', id);
            await connectMongo();
            const locationData =  await Location.findById(id);
            return locationData;
        },

        getAll: async () => {
            await connectMongo();
            const locationData =  await Location.find();
            return locationData;
        },

        create:  async (locationData: typeof Location) => {
            await connectMongo();
            const newLocationData = await Location.create(locationData);
            return newLocationData;
        }

    },

    pet: {

        getPet:  async (id: string) => {
            await connectMongo();
            const petData =  await Pet.findById(id);
            return petData;
            },

        getAll: async () => {
            await connectMongo();
            const petData =  await Pet.find();
            return petData;
        },
    },

    user: {

        getUser: async (id: string) => {
            await connectMongo();
            const userData =  await User.findById(id);
            return userData;
        },

        updateUser: async (id: string, userData: any) => {
            await connectMongo();
            const updatedUserData =  await User.findByIdAndUpdate(id, userData, {new: true})
            return updatedUserData;
        }

    }
};

export default db;

