const dummy = () => {
  const yks = 1
  return yks
}

const totalLikes = (blogs) => {
  const likes= blogs.reduce((sum, blog) => sum + blog.likes, 0)
  return likes
}

const favoriteBlog = (blogs) => {
  const mostLiked = blogs.reduce((favorite, current) => current.likes > favorite.likes ?
    current : favorite)
  return mostLiked
}

module.exports = {
  dummy,
  totalLikes, favoriteBlog

}