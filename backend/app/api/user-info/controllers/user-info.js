'use strict';
const { parseMultipartData } = require('strapi-utils');
/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {
    findOne: async (ctx) => {
        const { id } = ctx.params;
        const userInfo = await strapi.services['user-info'].findOne({ userId: id });
        console.log(userInfo.avatar);
        return userInfo;
    },

    update: async (ctx) => {
        const { id } = ctx.params;
        const body = ctx.request.body;
        const userInfo = await strapi.services['user-info'].findOne({ userId: id });

        let response;
        const { files, data } = parseMultipartData(ctx);
        console.log(data);

        if (ctx.is('multipart')) {
            console.log(1);
            console.log(files);
            response = await strapi.services['user-info'].update(
                { id: userInfo._id },
                data,
                {avatar: files}
            );
        } else {
            response = await strapi.services['user-info'].update(
                { id: userInfo._id },
                data
            );
        }

        
        
        return response;
    }
};
