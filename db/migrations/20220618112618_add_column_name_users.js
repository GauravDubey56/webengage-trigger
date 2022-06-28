const knex = require('knex');

exports.up = function (knex) {
    return knex.schema.table('users', table => {
        table.string('name', 128);
    });
};

exports.down = function (knex) {
    return knex.schema.table('users', table => {
        table.dropColumn('name');
    });
};