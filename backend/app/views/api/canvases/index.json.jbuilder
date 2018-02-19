@canvases.each do |canvas|
  json.set! canvas.id do
    json.extract! canvas, :id, :title
  end
end
