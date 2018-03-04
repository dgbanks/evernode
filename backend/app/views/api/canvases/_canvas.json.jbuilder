json.extract! canvas, :id, :title, :nodes

json.links canvas.links.map { |link|
  {
    id: link.id,
    source: link.source_id,
    target: link.target_id,
    body: link.body
  }
}
