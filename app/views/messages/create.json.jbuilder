json.id @message.id
json.body @message.body
json.image @message.image
json.created_at @message.created_at.strftime("%Y/%m/%d(%a) %H:%M:%S")
json.user_name @message.user.name
