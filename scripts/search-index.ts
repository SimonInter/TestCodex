import { prisma } from "@/server/prisma/client";
import algoliasearch from "algoliasearch";
import { MeiliSearch } from "meilisearch";

const driver = process.env.SEARCH_DRIVER ?? "meilisearch";

async function sync() {
  const products = await prisma.product.findMany({
    include: {
      collections: true
    }
  });

  const payload = products.map((product) => ({
    id: product.id,
    name: product.name,
    slug: product.slug,
    description: product.description,
    price: product.basePrice,
    categories: product.collections.map((collection) => collection.name)
  }));

  if (driver === "algolia") {
    if (!process.env.ALGOLIA_APP_ID || !process.env.ALGOLIA_API_KEY) {
      throw new Error("Algolia non configuré");
    }
    const client = algoliasearch(process.env.ALGOLIA_APP_ID, process.env.ALGOLIA_API_KEY);
    const index = client.initIndex("products");
    await index.saveObjects(payload.map((item) => ({ ...item, objectID: item.id })));
  } else {
    const host = process.env.MEILISEARCH_HOST ?? "http://localhost:7700";
    const apiKey = process.env.MEILISEARCH_API_KEY ?? "masterKey";
    const meili = new MeiliSearch({ host, apiKey });
    const index = await meili.getOrCreateIndex("products", { primaryKey: "id" });
    await index.addDocuments(payload);
  }

  console.log(`Indexation terminée (${payload.length} produits).`);
}

sync()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
