import { initialData } from './seed';
import prisma from "../lib/prisma";
import { countries } from './seed-countries';

async function main() {

  // 1. Borrar registros previos
  /* await Promise.all([
    prisma.productImage.deleteMany(),
    prisma.product.deleteMany(),
    prisma.category.deleteMany(),
  ]); */
  await prisma.user.deleteMany();
  await prisma.country.deleteMany();
  await prisma.productImage.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();

  // Categories
  const { categories, products, users } = initialData;

  await prisma.user.createMany({
    data: users,
  });

  // Countries
  await prisma.country.createMany({
    data: countries,
  });

  const categoriesData = categories.map( category => {
    return {
      name: category,
    }
  });

  await prisma.category.createMany({
    data: categoriesData,
  });

  const categoriesDB = await prisma.category.findMany();
  
  const categoriesMap = categoriesDB.reduce((map, category) => {
    map[category.name.toLowerCase()] = category.id;
    return map;
  }, {} as Record<string, string>);
  
  // Products
  /* const { images, type, ...product1} = products[0]; */

  /* await prisma.product.create({
    data: {
      ...product1,
      category_id: categoriesMap['shirts'],
    }
  }); */

  products.forEach( async product => {
    const { type, images, ...rest } = product;
    const dbProduct = await prisma.product.create({
      data: {
        ...rest,
        category_id: categoriesMap[type],
      }
    });

    // Images
    /* images.forEach( async image => {
      await prisma.productImage.create({
        data: {
          url: image,
          productId: dbProduct.id,
        }
      });
    }); */

    // Otra forma
    const imagesData = images.map((img) =>({ url: img, productId: dbProduct.id }));
    await prisma.productImage.createMany({
      data: imagesData
    });

  });

}


(() => {
  if(process.env.NODE_ENV === 'production') return;
  main();

})();