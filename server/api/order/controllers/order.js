"use strict";
const stripe = require("stripe")(
  "sk_test_51N6FgPLU7z6NCdWoKEevuLAvqoj9lIM8emtUwVdqJ0QrgIAezrmrREYI1c0orhK8kdu1jUKvCBrUbCFKU9hNFVDW00L6xBCZOt"
);

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  async create(ctx) {
    const { token, products, users_permissions_user, addressShipping } =
      ctx.request.body;

    let totalPayment = 0;
    products.forEach((product) => {
      totalPayment = totalPayment + product.price;
    });

    const charge = await stripe.charges.create({
      amount: totalPayment * 100,
      currency: "USD",
      source: token.id,
      description: `ID User ${users_permissions_user}`,
    });

    const createOrder = [];
    for await (const product of products) {
      const data = {
        game: product.id,
        users_permissions_user: users_permissions_user,
        totalPayment,
        idPayment: charge.id,
        addressShipping,
      };

      const validData = await strapi.entityValidator.validateEntityCreation(
        strapi.models.order,
        data
      );

      const entry = await strapi.query("order").create(validData);
      createOrder.push(entry);
    }
    return createOrder;
  },
};
