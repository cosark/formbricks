import { PrismaClient } from "@prisma/client";

const DEFAULT_BRAND_COLOR = "#64748b";
const DEFAULT_STYLING = {
  unifiedStyling: true,
  allowStyleOverwrite: false,
};

const prisma = new PrismaClient();
async function main() {
  await prisma.$transaction(async (tx) => {
    // product table with brand color and the highlight border color (if available)
    // styling object needs to be created for each product
    const products = await tx.product.findMany({});
    if (!products) {
      // something went wrong, could not find any products
      return;
    }
    if (products.length) {
      for (const product of products) {
        // no migration needed
        // 1. product's brandColor is equal to the default one
        // 2. product's styling object is equal the default one
        // 3. product has no highlightBorderColor

        if (
          product.brandColor === DEFAULT_BRAND_COLOR &&
          JSON.stringify(product.styling) === JSON.stringify(DEFAULT_STYLING) &&
          !product.highlightBorderColor
        ) {
          continue;
        }

        if (product.brandColor) {
          await tx.product.update({
            where: {
              id: product.id,
            },
            data: {
              brandColor: null,
              styling: {
                unifiedStyling: false,
                allowStyleOverwrite: true,
                brandColor: {
                  light: product.brandColor,
                },
                ...(product.highlightBorderColor && {
                  highlightBorderColor: {
                    light: product.highlightBorderColor,
                  },
                }),
              },
            },
          });
        }
      }
    }
  });
}
main()
  .catch(async (e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => await prisma.$disconnect());
