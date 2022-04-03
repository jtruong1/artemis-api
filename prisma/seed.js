const prisma = require('../src/utils/prisma.util');
const { hashPassword } = require('../src/utils/hash.util');

const main = async () => {
  await prisma.user.upsert({
    where: { email: 'john@example.com' },
    update: {},
    create: {
      email: 'john@example.com',
      name: 'John Doe',
      password: await hashPassword('password'),
      monitors: {
        create: {
          url: 'https://www.google.com/',
          label: 'google.com',
          checks: {
            create: [
              {
                type: 'uptime',
                label: 'Uptime',
                interval: 60,
              },
              {
                type: 'certificate',
                label: 'Certificate',
                interval: 300,
              },
            ],
          },
        },
      },
    },
  });
};

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
