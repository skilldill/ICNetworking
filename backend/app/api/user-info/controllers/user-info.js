'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {
    findOne: async (ctx) => {
        const { id } = ctx.params;
        const userInfo = await strapi.services['user-info'].findOne({ uid: id });
        return userInfo;
    }
};
