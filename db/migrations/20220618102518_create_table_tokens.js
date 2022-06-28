/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
const knex = require('knex');

exports.up = function (knex, Promise) {
    return knex.schema.createTable('tokens', function (table) {
        table.increments('id').primary().unsigned();
        table.string('token').notNullable();
        table.string('expiresAt').notNullable();
        table.boolean('blacklisted').notNullable().defaultTo(false);
        table.integer('user_id').unsigned().references('id').inTable('users');
        table.timestamp('created_at').defaultTo(knex.fn.now());
    })
}

exports.down = function (knex, Promise) {
    return knex.schema.dropTable('tokens');
}