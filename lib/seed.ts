import { Location, Pet, Visit } from './models/index.js';
import { Types } from 'mongoose';
import connectMongo from './mongoose.js';

type objectIdsListType = {
    [key: string]: Types.ObjectId;
};

const objectIdsList: objectIdsListType = {};

const mapObjectIds = (key: string) => {
    if (!objectIdsList[key]) {
        objectIdsList[key] = new Types.ObjectId();
    }
    return objectIdsList[key];
};


const fakeUserId = {
    _id: new Types.ObjectId(),
    username: 'test',
    email: '',
    password: 'password'
};

const fakeUserId2 = {
    _id: new Types.ObjectId(),
    username: 'test2',
    email: '',
    password: 'password'
};



const locationData = [
   {
        userId: fakeUserId._id,
        pets: [mapObjectIds('pet1')],
        name: 'home',
        itemLocations: {
            breakerBox: 'basement',
            leashCarrierCrate: 'mudroom',
            petFoodWaterBowlTreats: 'kitchen',
            cleaningSuppliesVacuum: 'closet',
            thermostat: 'living room',
            alarmPanel: 'hallway',
            other: 'garage'
        }
    },
    {
        userId: fakeUserId2._id,
        pets: [mapObjectIds('pet2')],
        name: 'home2',
        itemLocations: {
            breakerBox: 'basement',
            leashCarrierCrate: 'mudroom',
            petFoodWaterBowlTreats: 'kitchen',
            cleaningSuppliesVacuum: 'closet',
            thermostat: 'living room',
            alarmPanel: 'hallway',
            other: 'garage'
        }
   }

];

const petData = [
    {
        userId: fakeUserId._id,
        name: 'Fido',
        description: 'dog'
    },
    {
        userId: fakeUserId._id,
        name: 'Fluffy',
        description: 'cat'
    
    },
    {
        userId: fakeUserId2._id,
        name: 'Fido2',
        description: 'dog'
    },
    {
        userId: fakeUserId2._id,
        name: 'Fluffy2',
        description: 'cat'
    }
];

const visitData = [
    {
        userId: fakeUserId._id,
        location: mapObjectIds('location1'),
        times: [new Date()],
        tasks: {
            mail: true,
            waterPlants: true,
            alternateLights: true,
            openCloseCurtains: true,
            garbageRecycle: true,
            tvRadioOn: true
        }
    },
    {
        userId: fakeUserId2._id,
        location: mapObjectIds('location2'),
        times: [new Date()],
        tasks: {
            mail: true,
            waterPlants: true,
            alternateLights: true,
            openCloseCurtains: true,
            garbageRecycle: true,
            tvRadioOn: true
        }
    }
    ];



const seed = async () => {
    await connectMongo();
    await Location.deleteMany({});
    await Location.insertMany(locationData);
    await Pet.deleteMany({});
    await Pet.insertMany(petData);
    await Visit.deleteMany({});
    await Visit.insertMany(visitData);
    console.log('seeded');
    process.exit(0);
};




seed();