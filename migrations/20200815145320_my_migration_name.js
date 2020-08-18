
exports.up = function(knex) {
  return knex.schema.createTable("tokens", function (table) {
    table.increments("id");
    table.string("token")
    table.foreign("user_id")
    table.timestamps();
  });

};

exports.down = function(knex) {
  return knex.schema.dropTable("tokens");
};
