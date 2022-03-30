const prisma = require('../src/utils/prisma');
const { hashPassword } = require('../src/utils/password');

const main = async () => {
  await prisma.user.upsert({
    where: { email: 'john@example.com' },
    update: {},
    create: {
      email: 'john@example.com',
      name: 'John Doe',
      password: await hashPassword('password'),
      sites: {
        create: {
          url: 'https://www.google.com/',
          label: 'google.com',
          monitors: {
            create: {
              slug: 'uptime',
              name: 'Uptime',
            },
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
