module.exports = function(env) {
  // console.log(env);
  return require(`./${env}.js`)
}
