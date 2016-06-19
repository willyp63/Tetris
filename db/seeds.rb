# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

admin = User.create!(username: "admin", password: "password")

Highscore.create!(score: 100, user_id: admin.id)
Highscore.create!(score: 200, user_id: admin.id)
Highscore.create!(score: 300, user_id: admin.id)
Highscore.create!(score: 400, user_id: admin.id)
Highscore.create!(score: 500, user_id: admin.id)
