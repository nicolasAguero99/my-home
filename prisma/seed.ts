import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';
import 'dotenv/config';

const connectionString = process.env.DATABASE_URL;
if (!connectionString) throw new Error('DATABASE_URL is required');
const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

async function main() {
  const usersFromDB = await prisma.user.count();
  if (usersFromDB > 15) return;
  await prisma.user.deleteMany();

  const mockUsers = Array.from({ length: 10 }, (_, index) => ({
    id: index == 0 ? 'f34e751d-ee7c-410f-a898-e08a5fb4fdbc' : String(index),
    username: faker.internet.username(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    profilePicture: faker.image.url(),
    name: faker.person.firstName(),
    lastName: faker.person.lastName(),
  }));

  const createdUsers = await prisma.user.createManyAndReturn({
    data: mockUsers,
  });

  if (!createdUsers) throw new Error('Failed to create users');

  const mockLinks = Array.from({ length: 5 }, (_, index) => ({
    id: String(index),
    title: faker.lorem.word(),
    url: faker.internet.url(),
    category: faker.lorem.word(),
    icon: faker.lorem.word(),
    order: index + 1,
    userId: createdUsers[0].id,
  }));

  const createdLinks = await prisma.links.createMany({
    data: mockLinks,
  });

  if (!createdLinks) throw new Error('Failed to create links');

  const mockMovies = Array.from({ length: 5 }, (_, index) => ({
    id: String(index),
    title: faker.lorem.word(),
    image: faker.image.url(),
    link: faker.internet.url(),
    order: index + 1,
    userId: createdUsers[0].id,
  }));

  const createdMovies = await prisma.movies.createMany({
    data: mockMovies,
  });

  if (!createdMovies) throw new Error('Failed to create movies');

  const mockSongs = Array.from({ length: 5 }, (_, index) => ({
    id: String(index),
    title: faker.lorem.word(),
    image: faker.image.url(),
    link: faker.internet.url(),
    order: index + 1,
    userId: createdUsers[0].id,
  }));

  const createdSongs = await prisma.songs.createMany({
    data: mockSongs,
  });

  if (!createdSongs) throw new Error('Failed to create songs');

  console.log('Seeded successfully');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
