class CreateCaves < ActiveRecord::Migration
  def change
    create_table :cafes do |t|
      t.references :search
      t.string :name
      t.string :address
      t.string :image_url
      t.timestamps
    end

    add_index :cafes, :search_id
  end
end
