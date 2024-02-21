import { Location, Visit, User } from './models/index.js';
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
    return objectIdsList[key]?.toString();
};


const fakeUserData = [{
    _id: mapObjectIds('user1'),
    name: 'test',
    phone: '555-1212',
    email: '123twerk@gmail.com',
    password: 'password',
    locations: [mapObjectIds('location3')]
},

{
    _id: mapObjectIds('user2'),
    name: 'test2',
    phone: '555-1212',
    email: '321kirk@gmail.com',
    password: 'password',
    locations: [mapObjectIds('location1'), mapObjectIds('location2')]
}];





const locationData = [
   {
         _id: mapObjectIds('location1'),
        name: 'home',
        itemLocations: {
            breakerBox: 'basement',
            leashCarrierCrate: 'mudroom',
            petFoodWaterBowlTreats: 'kitchen',
            cleaningSuppliesVacuum: 'closet',
            thermostat: 'living room',
            alarmPanel: 'hallway',
            other: 'garage'
        },
        emergentContact: '555-1212',
        pets: [
            {
                name: 'spot',
                description: 'white dog'
            },
            {
                name: 'fluffy',
                cat: true,
                description: 'white cat'
            }
        ],
    },

    {
        _id: mapObjectIds('location2'),
        name: 'office',
        itemLocations: {
            breakerBox: 'basement',
            leashCarrierCrate: 'mudroom',
            petFoodWaterBowlTreats: 'kitchen',
            cleaningSuppliesVacuum: 'closet',
            thermostat: 'living room',
            alarmPanel: 'hallway',
            other: 'garage'
        },
        pets: [
            {
                name: 'fido',
                description: 'brown shaggy dog'
            },
            {
                name: 'mittens',
                cat: true,
                description: 'black cat'
            }
        ]
   },
   {
     _id: mapObjectIds('location3'),
     name: 'airport',
        itemLocations: {
        breakerBox: 'basement',
        leashCarrierCrate: 'mudroom',
        petFoodWaterBowlTreats: 'kitchen',
        cleaningSuppliesVacuum: 'closet',
        thermostat: 'living room',
        alarmPanel: 'hallway',
        other: 'garage'
        },
        pets: [
            {
                name: 'chimi',
                description: 'chiuahua'
            },
            {
                name: 'boots',
                cat: true,
                description: 'spotted cat'
            }
        ]
   }

];



const visitData = [
    {
        location: mapObjectIds('location1'),
        user: mapObjectIds('user1'),
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
        location: mapObjectIds('location2'),
        user: mapObjectIds('user2'),
        times: [new Date()],
        tasks: {
            mail: true,
            waterPlants: true,
            alternateLights: true,
            openCloseCurtains: false,
            garbageRecycle: true,
            tvRadioOn: true
        }
    }
    ];



const seed = async () => {
    await connectMongo();
    await User.deleteMany({});
    await User.insertMany(fakeUserData);
    await Location.deleteMany({});
    await Location.insertMany(locationData);
    await Visit.deleteMany({});
    await Visit.insertMany(visitData);
    console.log('seeded');
    process.exit(0);
};




seed();