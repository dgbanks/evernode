@nodes.each do |node|
  json.set! node.id do
    json.partial! "api/nodes/node", node: node
  end
end
