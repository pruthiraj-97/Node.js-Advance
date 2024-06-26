exports.keyGenerator=(id)=>{
    return `user#${id}`
}
exports.postLikeValue=(id)=>{
    return `post:like:user:${id}`
}
exports.postLikeKey=(id)=>{
    return `post:like:${id}`
}