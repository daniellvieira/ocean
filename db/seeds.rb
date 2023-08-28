# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)
Blog::Post.destroy_all
Diary::Post.destroy_all

u = User.last

10.times do
  Blog::Post.create!(
    title: Faker::Book.title,
    body: Faker::Lorem.paragraphs,
    user: u
  )
end

10.times do
  Diary::Post.create!(
    title: Faker::Lorem.sentence(word_count: 3),
    body: Faker::Lorem.paragraph(sentence_count: 3)
  )
end