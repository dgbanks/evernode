@links.each do |link|
  json.set! link.id do
    json.partial! "api/links/link", link: link
  end
end
