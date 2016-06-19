class CreateHighscores < ActiveRecord::Migration
  def change
    create_table :highscores do |t|
      t.integer :score, null: false
      t.integer :user_id, null: false

      t.timestamps null: false
    end
  end
end
