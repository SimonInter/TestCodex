import fs from "fs";
import path from "path";
import { parse } from "csv-parse/sync";
import { prisma } from "@/server/prisma/client";

interface CsvRow {
  name: string;
  slug: string;
  description: string;
  price: string;
  collection: string;
  heroImage: string;
}

async function importProducts(filePath: string) {
  const absolute = path.resolve(process.cwd(), filePath);
  const csv = fs.readFileSync(absolute, "utf-8");
  const rows = parse(csv, { columns: true, skip_empty_lines: true }) as CsvRow[];

  for (const row of rows) {
    await prisma.product.upsert({
      where: { slug: row.slug },
      update: {
        name: row.name,
        description: row.description,
        basePrice: Number(row.price),
        heroImage: row.heroImage,
        collections: {
          set: [],
          connectOrCreate: [
            {
              where: { slug: row.collection },
              create: { slug: row.collection, name: row.collection, description: row.collection }
            }
          ]
        }
      },
      create: {
        slug: row.slug,
        name: row.name,
        description: row.description,
        basePrice: Number(row.price),
        heroImage: row.heroImage,
        collections: {
          connectOrCreate: [
            {
              where: { slug: row.collection },
              create: { slug: row.collection, name: row.collection, description: row.collection }
            }
          ]
        }
      }
    });
  }

  console.log(`Import terminé (${rows.length} produits).`);
}

const file = process.argv[2];
if (!file) {
  console.error("Usage: pnpm tsx scripts/import-products.ts <fichier.csv>");
  process.exit(1);
}

importProducts(file).finally(async () => {
  await prisma.$disconnect();
});
