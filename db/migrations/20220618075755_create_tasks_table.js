/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
 const knex = require('knex');

 exports.up = function (knex, Promise) {
     return knex.schema.createTable('tasks', function (table) {
         table.increments('id').primary().unsigned();
         table.string('title').notNullable();
         table.string('description').notNullable();
         table.boolean('is_complete').notNullable().defaultTo(false);
         table.integer('user_id').unsigned().references('id').inTable('users');
         table.timestamp('created_at').defaultTo(knex.fn.now());
         table.timestamp('updated_at').defaultTo(knex.fn.now());
     })
 }
 
 exports.down = function (knex, Promise) {
     return knex.schema.dropTable('tasks');
 }
 