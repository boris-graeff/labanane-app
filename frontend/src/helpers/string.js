export default {
  slugify (str) {
    return str.replace(/\s+/g, '-').replace(/[^a-zA-Z0-9-]/g, '')
  }
}
