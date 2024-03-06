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
            return locationData;
        },

        create:  async (locationData: Record<string, string>) => {
            await connectMongo();
            const newLocationData = await Location.create(locationData);
            return newLocationData;
        },

        addPet: async (id: string, petData: any) => {
            await connectMongo();
            const locationData = await Location.findById(id);
            locationData?.pets.push(petData);
            const data = await locationData?.save();
            return data;
        },

        updatePet: async (id: string, petData: any) => {
            await connectMongo();
            const locationData = await Location.findById(id);
            const pet = petData._id ? locationData?.pets.id(petData._id) : null;
            if (pet) {
                delete petData._id;
                pet.set(petData);
                const data = await locationData?.save();
                return data;
            } else if (locationData && petData) {
                delete petData._id;
                locationData?.pets.addToSet(petData);
                const data = await locationData?.save();
                return data;
            }
            return null;
        },

        update: async (id: string, locationData: any) => {
            await connectMongo();
            return await Location.findByIdAndUpdate(id, locationData, {new: true})
        },

        search: async (searchTerm: string) => {
            await connectMongo();
            const locationData =  await Location.find({$text: {$search: searchTerm}});
            console.log('locationData', locationData);
            return [...locationData];
        },

    },

    user: {

        getOne: async (id: string) => {
            await connectMongo();
            const userData =  await User.findById(id);
            return userData;
        },

        getAll: async () => {
            await connectMongo();
            const userData =  await User.find();
            return userData;
        },

        update: async (userData: any) => {
            const data = {
                data: null,
                error: null
            } as any;
            await connectMongo();
            try {
                if ( userData && userData._id ) {
                    data.data = await User.findByIdAndUpdate(userData._id, userData, {new: true})
                } else if ( userData ) {
                    data.data = await User.create(userData);
                }
            } catch (error: any) {
                if (error.code === 11000) {
                    data.error = 'User already exists';
                } else {
                    data.error = error;
                }
            }
            return data;
        },

        search: async (searchTerm: string) => {
            await connectMongo();
            const userData =  await User.find({$text: {$search: searchTerm}});
            return userData;
        },

    }
};

export default db;

