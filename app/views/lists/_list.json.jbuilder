json.extract! list, :id, :name, :created_at, :updated_at
json.items list.items
json.url list_url(list, format: :json)