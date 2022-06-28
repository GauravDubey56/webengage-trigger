const knex = require('knex');

exports.up = function (knex) {
    return knex.schema.table('tokens', table => {
        table.string('type', 128);
    });
};

exports.down = function (knex) {
    return knex.schema.table('tokens', table => {
        table.dropColumn('type');
    });
};