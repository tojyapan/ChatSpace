json.(@message, :body, :image)
json.created_at @message.created_at
json.user_name @message.user.name
json.id @message.id
