const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
    const numberOfProducts = 100;
    const products = [];

    for (let i = 1; i <= numberOfProducts; i++) {
        products.push({
            name: `Product ${i}`,
            price: parseFloat((Math.random() * 10).toFixed(2)),
            description: `Description for product ${i}`,
            stock: Math.floor(Math.random() * 500) + 1,
        });
    }

    console.log(`Inserting ${numberOfProducts} products...`);

    for (let i = 0; i < products.length; i += 100) {
        const batch = products.slice(i, i + 100);
        await prisma.product.createMany({
            data: batch,
        });
        console.log(`Inserted batch ${i / 100 + 1}`);
    }

    console.log('Seeding completed successfully!');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });