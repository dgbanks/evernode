@canvases.each do |canvas|
  json.set! canvas.id do
    json.partial! "api/canvases/canvas", canvas: canvas
  end
end
