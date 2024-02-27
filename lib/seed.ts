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
    name: 'Steve Milson',
    phone: '555-1212',
    email: '123twerk@gmail.com',
    password: 'password',
    locations: [mapObjectIds('location3')]
},

{
    _id: mapObjectIds('user2'),
    name: 'Greg Andrews',
    phone: '555-1222',
    email: '321kirk@gmail.com',
    password: 'password',
    locations: [mapObjectIds('location1'), mapObjectIds('location2')]
}];





const locationData = [
   {
         _id: mapObjectIds('location1'),
        user: mapObjectIds('user1'),
        address: '123 Main Street',
        emergenctContact: 'Jim 555-2313',
        personsWithAccess: "Jed Allen, Steven Comtran",
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
                name: 'Sparky',
                type: 'dog',
                description: 'Keeshond'
            }
        ],
    },

    {
        _id: mapObjectIds('location2'),
        user: mapObjectIds('user2'),
        address: '1232 Union Ave',
        emergenctContact: '555-1313',
        personsWithAccess: "krill coean, asen trag, steven c",
        itemLocations: {
            breakerBox: 'inaccessible',
            leashCarrierCrate: 'mudroom',
            petFoodWaterBowlTreats: 'kitchen',
            cleaningSuppliesVacuum: 'closet',
            thermostat: 'inaccessible',
            alarmPanel: 'hallway',
            other: 'garage'
        },
        pets: [
            {
                name: 'Cherry',
                type: 'dog',
                description: 'brown shaggy dog'
            },
            {
                name: 'Gravy',
                type: 'cat',
                description: 'black cat'
            },
            {
                name: 'Apple',
                type: 'cat',
                description: 'white cat'
            }
        ]
   },
   {
        _id: mapObjectIds('location3'),
        user: mapObjectIds('user1'),
        address: '9900 South IH 35',
        emergenctContact: '555-1213',
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
                name: 'Chimi',
                type: 'dog',
                description: 'shaky old chiuahua'
            },
            {
                name: 'Changa',
                type: 'cat',
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
        type: '30 minute visit',
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
        type: '15 minute visit',
        times: [new Date()],
        tasks: {
            mail: true,
            waterPlants: true,
            alternateLights: true,
            openCloseCurtains: false,
            garbageRecycle: true,
            tvRadioOn: true,
            other: "feed fish"
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