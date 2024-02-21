import connectMongo from "./mongoose";
import { Visit, Location, User } from "./models/index";




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
        },

        search: async (searchTerm: string) => {
            await connectMongo();
            const visitData =  await Visit.find({$text: {$search: searchTerm}});
            return visitData;
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
            console.log('locationData', locationData);
            return locationData;
        },

        create:  async (locationData: typeof Location) => {
            await connectMongo();
            const newLocationData = await Location.create(locationData);
            return newLocationData;
        },

        search: async (searchTerm: string) => {
            await connectMongo();
            const locationData =  await Location.find({$text: {$search: searchTerm}});
            console.log('locationData', locationData);
            return [...locationData];
        },

    },

    user: {

        getUser: async (id: string) => {
            await connectMongo();
            const userData =  await User.findById(id);
            return userData;
        },

        getAll: async () => {
            await connectMongo();
            const userData =  await User.find();
            return userData;
        },

        updateUser: async (id: string, userData: any) => {
            await connectMongo();
            const updatedUserData =  await User.findByIdAndUpdate(id, userData, {new: true})
            return updatedUserData;
        },

        search: async (searchTerm: string) => {
            await connectMongo();
            const userData =  await User.find({$text: {$search: searchTerm}});
            return userData;
        },

    }
};

export default db;

