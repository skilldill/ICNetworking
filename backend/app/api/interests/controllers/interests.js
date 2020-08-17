'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {
    find: async () => {
        const interests = await strapi.services.interests.find();

        const prepareInterests = interests.map((interest) => {
            const { _id, name } = interest;
            return { name, id: _id };
        })

        return prepareInterests;
    }
};
