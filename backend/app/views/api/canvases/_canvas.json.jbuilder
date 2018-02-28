json.extract! canvas, :id, :title, :nodes

json.has_node !canvas.nodes.empty?

# json.links do
#   canvas.nodes.each do |node|
#     node.links do |link|
#       json.set! link.id do
#         json.extract! link, :id, :source_id, :target_id
#       end
#     end
#   end
# end

json.links do
  canvas.nodes.each do |node|
    json.array! node.links do |link|
      json.extract! link
    end
  end
end
