class AddOnlyFilterToPostsLogData < ActiveRecord::Migration[7.0]
  def change

    reversible do |dir|
      dir.up do
        execute <<~SQL
          DROP TRIGGER IF EXISTS "logidze_on_posts" on "posts";
        SQL

        execute <<~SQL
          CREATE TRIGGER "logidze_on_posts"
          BEFORE UPDATE OR INSERT ON "posts" FOR EACH ROW
          WHEN (coalesce(current_setting('logidze.disabled', true), '') <> 'on')
          -- Parameters: history_size_limit (integer), timestamp_column (text), filtered_columns (text[]),
          -- include_columns (boolean), debounce_time_ms (integer)
          EXECUTE PROCEDURE logidze_logger(null, 'updated_at', '{title,body}', true);

        SQL
      end

      dir.down do
        # NOTE: We have no idea on how to revert the migration
        # ('cause we don't know the previous trigger params),
        # but you can do that on your own.
        #
        # Uncomment this line if you want to raise an error.
        # raise ActiveRecord::IrreversibleMigration
      end
    end
  end
end
