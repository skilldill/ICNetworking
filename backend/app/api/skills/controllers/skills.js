'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {
    find: async () => {
        const skills = await strapi.services.skills.find();
        
        const prepareSkills = skills.map((skill) => {
            const { _id, name } = skill;
            return { name, id: _id };
        }) 

        return prepareSkills;
    }
};
