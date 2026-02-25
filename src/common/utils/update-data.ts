import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';

type objectType = Record<string, number | string | boolean | undefined>;

interface dataType {
  created?: objectType[];
  updated?: objectType[];
  deleted?: string[];
}

type DelegateWithOperations = {
  createMany: (args: { data: objectType[] }) => Prisma.PrismaPromise<unknown>;
  update: (args: {
    where: { id: string; userId: string };
    data: objectType;
  }) => Prisma.PrismaPromise<unknown>;
  deleteMany: (args: {
    where: { id: { in: string[] }; userId: string };
  }) => Prisma.PrismaPromise<unknown>;
};

export async function updateData({
  prisma,
  model,
  userId,
  data,
}: {
  prisma: PrismaService;
  model: Prisma.ModelName;
  userId: string;
  data: dataType;
}) {
  const { created = [], updated = [], deleted = [] } = data;
  const delegate = prisma[model] as DelegateWithOperations;

  const operations: Prisma.PrismaPromise<unknown>[] = [
    ...(created.length
      ? [
          delegate.createMany({
            data: created.map((item) => ({
              ...item,
              userId,
            })),
          }),
        ]
      : []),
    ...updated.map((item) =>
      delegate.update({
        where: { id: String(item.id), userId },
        data: item,
      }),
    ),
    ...(deleted.length
      ? [
          delegate.deleteMany({
            where: { id: { in: deleted }, userId },
          }),
        ]
      : []),
  ];

  await prisma.$transaction(operations);
}
