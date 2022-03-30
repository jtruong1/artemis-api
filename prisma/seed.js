const prisma = require('../src/utils/prisma');
const { hashPassword } = require('../src/utils/password');

const main = async () => {
  const john = await prisma.user.upsert({
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
        },
      },
    },
    include: {
      sites: true,
    },
  });

  await prisma.monitor.upsert({
    where: { slug: 'uptime' },
    update: {},
    create: {
      slug: 'uptime',
      name: 'Uptime',
      sites: {
        create: {
          site: {
            connect: {
              id: john.sites[0].id,
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
