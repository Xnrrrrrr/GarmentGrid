import { faker } from '@faker-js/faker';




//-----------------------------------------------------------------//
//                          DataUser                               //
//-----------------------------------------------------------------// 


// Enum to specify user roles
const UserRole = {
    ADMIN: 'admin',
    CUSTOMER: 'customer',
};

function createDataUser() {
    // Generate a random role (either admin or customer)
    const role = faker.datatype.boolean() ? UserRole.ADMIN : UserRole.CUSTOMER;

    // Generate a random country code (ISO 2 format)
    let countryIso2;

    // Prioritize generating users from the US until there are at least 50
    if (dataUser.filter(user => user.country === 'US').length < 50) {
        countryIso2 = 'US';
    } else {
        // Prioritize generating users from China, Russia after US
        const countryPriorities = ['CN', 'RU']; // ISO 2 codes for China, Russia
        const userCounts = dataUser.reduce((counts, user) => {
        counts[user.country] = (counts[user.country] || 0) + 1;
        return counts;
        }, {});

        // Prioritize countries based on the required counts
        for (const country of countryPriorities) {
        if (userCounts[country] < getTargetCount(country)) {
            countryIso2 = country;
            break;
        }
        }

        // If all target counts are reached, generate users from other countries randomly
        if (!countryIso2) {
        countryIso2 = faker.location.countryCode('alpha-2');
        }
    }

    return {
        _id: faker.string.uuid(),
        name: faker.person.firstName(),
        phoneNumber: faker.phone.imei(),
        email: faker.internet.email(),
        city: faker.location.city(),
        country: countryIso2,
        role: role,
    };
}

// Array to store multiple users
export const dataUser = [];

// Helper function to get the target count for a specific country
function getTargetCount(country) {
    switch (country) {
        case 'CN':
            return 25; // China
        case 'RU':
            return 37; // Russia
        default:
            return 0;
  }
}

// Generate multiple random users and push them to the array
for (let i = 0; i < 300; i++) { // Total count adjusted to cover all countries
    dataUser.push(createDataUser());
}

//console.log(dataUser);





//-----------------------------------------------------------------//
//                      OverallDataStatistics                      //
//-----------------------------------------------------------------//              


function createOverallDataStatistics() {
    const months = [
        "January", "February", "March", "April", "May", "June", 
        "July", "August", "September", "October", "November", "December"
    ];

    const monthlyData = months.map(month => ({
    month,
    totalSales: faker.number.int({ min: 1000, max: 50000 }),
    totalUnits: faker.number.int({ min: 1000, max: 20000 }),
    _id: faker.string.uuid(),
    }));

    const dailyData = [];

    for (let monthIndex = 0; monthIndex < months.length; monthIndex++) {
        const month = months[monthIndex];
        const daysInMonth = new Date(2023, monthIndex + 1, 0).getDate(); // Get number of days in the month

        for (let day = 1; day <= daysInMonth; day++) {
            const formattedMonth = (monthIndex + 1 < 10 ? '0' : '') + (monthIndex + 1);
            const formattedDay = day < 10 ? `0${day}` : day; // Pad single digit days with zero
            const date = `2023-${formattedMonth}-${formattedDay}`;

            dailyData.push({
                date,
                totalSales: faker.number.int({ min: 1000, max: 40000 }),
                totalUnits: faker.number.int({ min: 200, max: 2000 }),
            });
        }
    }
    return {
        productDistribution: {
            shoes: faker.number.int({ min: 2000, max: 7000 }),
            hoodies: faker.number.int({ min: 2000, max: 7000 }),
            hats: faker.number.int({ min: 2000, max: 7000 }),
            socks: faker.number.int({ min: 3000, max: 10000 }),
        },
        totalCustomers: faker.number.int({ min: 3000, max: 7000 }),
        yearlySalesTotal: faker.number.int({ min: 50000, max: 99999 }),
        yearlyTotalSoldUnits: faker.number.int({ min: 9000, max: 15000 }),
        year: 2023,
        monthlyData,
        dailyData,
    }
}

export const overallDataStatistics = [];

overallDataStatistics.push(createOverallDataStatistics());

//console.log(overallDataStatistics);





//-----------------------------------------------------------------//
//                      DataProduct                                //
//-----------------------------------------------------------------// 


function createDataProduct() {
    let category = undefined;
    const productCategory = faker.number.int({ max: 3 });
    switch (productCategory) {
        case 0:
            category = 'hoodie';
            break;
        case 1:
            category = 'hat';
            break;
        case 2:
            category = 'sock';
            break;
        case 3:
            category = 'shoe';
            break;
        default:
            category = 'hoodie';
            break;
    }
    const name = `${faker.person.firstName()} ${category}`;

    const price = faker.commerce.price({ min: 200, max: 1000 });
    const sold = faker.number.int({ min: 100, max: 2500 });
    const sales = price * sold;

    return {
        _id: faker.string.uuid(),
        price,
        description: 'Fantastic piece of apparel from the clothing overlords',
        category: [],
        rating: faker.number.float({ max: 5 }),
        supply: faker.number.int({ max: 1250 }),
        name,
        category,
        sales,
        sold,
    }
}

export const dataProduct = []

for (let i = 0; i < 100; i++) {
    dataProduct.push(createDataProduct());
}

//console.log(dataProduct);



//-----------------------------------------------------------------//
//                      DataTransaction                            //
//-----------------------------------------------------------------// 

function createDataTransaction() {
    return {
        _id: faker.string.uuid(),
        userId: faker.string.uuid(),
        cost: faker.number.float({ min: 100, max: 5000 }),
        products: faker.number.int({ min: 1, max: 10 })
    }
}

export const dataTransaction = []

for (let i = 0; i < 100; i++) {
    dataTransaction.push(createDataTransaction());
}

//console.log(dataTransaction);
