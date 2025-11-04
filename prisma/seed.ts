import { PrismaClient, OptionType } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.customization.deleteMany();
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.cartItem.deleteMany();
  await prisma.cart.deleteMany();
  await prisma.review.deleteMany();
  await prisma.mediaAsset.deleteMany();
  await prisma.variant.deleteMany();
  await prisma.optionValue.deleteMany();
  await prisma.option.deleteMany();
  await prisma.product.deleteMany();
  await prisma.collection.deleteMany();

  await prisma.collection.createMany({
    data: [
      { name: "Housses de coussin", slug: "housses-coussin", description: "Personnalisez vos housses." },
      { name: "Trousses de toilette", slug: "trousses-toilette", description: "Trousses cousues main." },
      { name: "Accessoires", slug: "accessoires", description: "Petites séries artisanales." }
    ]
  });

  const cushion = await prisma.product.create({
    data: {
      slug: "housse-coussin-terracotta",
      name: "Housse de coussin terracotta",
      description:
        "Une housse en lin lavé, personnalisable avec votre choix de tissu, de couleur de zip et de broderie.",
      basePrice: 8900,
      heroImage: "https://res.cloudinary.com/demo/image/upload/v1700000000/atelier/cushion-base.jpg",
      leadTimeDays: 7,
      isFeatured: true,
      collections: {
        connect: [{ slug: "housses-coussin" }]
      }
    }
  });

  const optionsData = [
    {
      name: "Tissu",
      type: OptionType.select,
      values: [
        {
          label: "Lin lavé",
          value: "lin",
          priceImpact: 0,
          imageOverlay: "https://res.cloudinary.com/demo/image/upload/v1700000000/atelier/overlays/cushion-lin.png"
        },
        {
          label: "Coton bio",
          value: "coton",
          priceImpact: 1000,
          imageOverlay: "https://res.cloudinary.com/demo/image/upload/v1700000000/atelier/overlays/cushion-coton.png"
        },
        {
          label: "Velours",
          value: "velours",
          priceImpact: 1500,
          imageOverlay: "https://res.cloudinary.com/demo/image/upload/v1700000000/atelier/overlays/cushion-velours.png"
        }
      ]
    },
    {
      name: "Couleur",
      type: OptionType.select,
      values: [
        {
          label: "Terracotta",
          value: "terracotta",
          priceImpact: 0,
          imageOverlay: "https://res.cloudinary.com/demo/image/upload/v1700000000/atelier/overlays/cushion-terracotta.png"
        },
        {
          label: "Sauge",
          value: "sauge",
          priceImpact: 0,
          imageOverlay: "https://res.cloudinary.com/demo/image/upload/v1700000000/atelier/overlays/cushion-sauge.png"
        },
        {
          label: "Ivoire",
          value: "ivoire",
          priceImpact: 0,
          imageOverlay: "https://res.cloudinary.com/demo/image/upload/v1700000000/atelier/overlays/cushion-ivoire.png"
        }
      ]
    },
    {
      name: "Fermeture",
      type: OptionType.select,
      values: [
        { label: "Zip métal", value: "zip-metal", priceImpact: 500 },
        { label: "Zip nylon", value: "zip-nylon", priceImpact: 0 }
      ]
    },
    {
      name: "Broderie",
      type: OptionType.text,
      config: { maxLength: 12 }
    },
    {
      name: "Doublure",
      type: OptionType.boolean,
      config: { priceImpact: 700 },
      required: false
    }
  ];

  for (const [index, option] of optionsData.entries()) {
    const createdOption = await prisma.option.create({
      data: {
        productId: cushion.id,
        name: option.name,
        type: option.type,
        order: index,
        required: option.type !== OptionType.boolean,
        config: option.config ?? {}
      }
    });

    if (option.values) {
      for (const [order, value] of option.values.entries()) {
        await prisma.optionValue.create({
          data: {
            optionId: createdOption.id,
            label: value.label,
            value: value.value,
            priceImpact: value.priceImpact,
            imageOverlay: value.imageOverlay,
            order
          }
        });
      }
    }
  }

  const media = [
    "https://res.cloudinary.com/demo/image/upload/v1700000000/atelier/cushion-detail-1.jpg",
    "https://res.cloudinary.com/demo/image/upload/v1700000000/atelier/cushion-detail-2.jpg",
    "https://res.cloudinary.com/demo/image/upload/v1700000000/atelier/cushion-detail-3.jpg"
  ];

  for (const url of media) {
    await prisma.mediaAsset.create({
      data: {
        productId: cushion.id,
        url,
        alt: "Détail de housse",
        type: "image"
      }
    });
  }

  const variants = [
    {
      sku: "CUS-LIN-TERR-S",
      price: 8900,
      options: { Tissu: "lin", Couleur: "terracotta", Taille: "S" },
      stock: 12
    },
    {
      sku: "CUS-LIN-TERR-M",
      price: 9900,
      options: { Tissu: "lin", Couleur: "terracotta", Taille: "M" },
      stock: 8
    },
    {
      sku: "CUS-LIN-TERR-L",
      price: 10900,
      options: { Tissu: "lin", Couleur: "terracotta", Taille: "L" },
      stock: 5
    }
  ];

  for (const variant of variants) {
    await prisma.variant.create({
      data: {
        productId: cushion.id,
        sku: variant.sku,
        price: variant.price,
        stock: variant.stock,
        options: variant.options
      }
    });
  }

  const additionalProducts = [
    {
      slug: "trousse-toilette-sauge",
      name: "Trousse de toilette sauge",
      description: "Trousse matelassée avec doublure imperméable et personnalisation zip.",
      basePrice: 6500,
      heroImage: "https://res.cloudinary.com/demo/image/upload/v1700000000/atelier/pouch-sage.jpg",
      leadTimeDays: 5,
      collection: "trousses-toilette"
    },
    {
      slug: "trousse-toilette-terracotta",
      name: "Trousse de toilette terracotta",
      description: "Trousse souple en coton bio avec patch personnalisable.",
      basePrice: 6200,
      heroImage: "https://res.cloudinary.com/demo/image/upload/v1700000000/atelier/pouch-terracotta.jpg",
      leadTimeDays: 6,
      collection: "trousses-toilette"
    },
    {
      slug: "housse-coussin-sauge",
      name: "Housse de coussin sauge",
      description: "Variante sauge de notre housse bestseller.",
      basePrice: 9200,
      heroImage: "https://res.cloudinary.com/demo/image/upload/v1700000000/atelier/cushion-sage.jpg",
      leadTimeDays: 8,
      collection: "housses-coussin"
    },
    {
      slug: "housse-coussin-ivoire",
      name: "Housse de coussin ivoire",
      description: "Lin ivoire avec passepoil contrasté.",
      basePrice: 9500,
      heroImage: "https://res.cloudinary.com/demo/image/upload/v1700000000/atelier/cushion-ivory.jpg",
      leadTimeDays: 8,
      collection: "housses-coussin"
    },
    {
      slug: "housse-coussin-anthracite",
      name: "Housse de coussin anthracite",
      description: "Velours profond avec broderie ton sur ton.",
      basePrice: 9900,
      heroImage: "https://res.cloudinary.com/demo/image/upload/v1700000000/atelier/cushion-anthracite.jpg",
      leadTimeDays: 9,
      collection: "housses-coussin"
    },
    {
      slug: "pochon-lin-personnalise",
      name: "Pochon en lin personnalisé",
      description: "Petit pochon à cordon avec broderie initiales.",
      basePrice: 3900,
      heroImage: "https://res.cloudinary.com/demo/image/upload/v1700000000/atelier/pouch-linen.jpg",
      leadTimeDays: 4,
      collection: "accessoires"
    },
    {
      slug: "sac-weekend-terracotta",
      name: "Sac week-end terracotta",
      description: "Sac cabas en toile épaisse avec bandoulière amovible.",
      basePrice: 15900,
      heroImage: "https://res.cloudinary.com/demo/image/upload/v1700000000/atelier/weekend-bag.jpg",
      leadTimeDays: 10,
      collection: "accessoires"
    },
    {
      slug: "set-serviettes-lin",
      name: "Set de serviettes en lin",
      description: "Lot de 4 serviettes avec personnalisation brodée.",
      basePrice: 7800,
      heroImage: "https://res.cloudinary.com/demo/image/upload/v1700000000/atelier/linen-napkins.jpg",
      leadTimeDays: 6,
      collection: "accessoires"
    },
    {
      slug: "chemin-table-terracotta",
      name: "Chemin de table terracotta",
      description: "Chemin en lin stonewashed avec ourlets larges.",
      basePrice: 5400,
      heroImage: "https://res.cloudinary.com/demo/image/upload/v1700000000/atelier/table-runner.jpg",
      leadTimeDays: 7,
      collection: "accessoires"
    }
  ];

  for (const product of additionalProducts) {
    const created = await prisma.product.create({
      data: {
        slug: product.slug,
        name: product.name,
        description: product.description,
        basePrice: product.basePrice,
        heroImage: product.heroImage,
        leadTimeDays: product.leadTimeDays,
        isFeatured: product.collection !== "accessoires" ? true : false,
        collections: {
          connect: [{ slug: product.collection }]
        }
      }
    });

    await prisma.mediaAsset.create({
      data: {
        productId: created.id,
        url: product.heroImage,
        alt: product.name,
        type: "image"
      }
    });

    await prisma.variant.create({
      data: {
        productId: created.id,
        sku: `${product.slug}-default`.toUpperCase(),
        price: product.basePrice,
        stock: 10,
        options: { Taille: "Unique" }
      }
    });
  }

  console.log("Seed terminée ✅");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
