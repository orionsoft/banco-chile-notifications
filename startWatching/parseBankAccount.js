export default function(text) {
  return text.replace(/-/g, '').replace(/^0+/, '')
}
