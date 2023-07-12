const post = require('../models/post');
const Post = require('../models/post')

exports.getPosts  =(req,res) =>{
    const posts = Post.find()
    .then((posts) => {
      res.status(200).json({posts})  
    })
    .catch( err => console.log(err))
};

exports.createPost = (req,res) =>{
    const post = new Post(req,body);
   
    post.save()
    .then(result => {
        res.json({
            post: result
        })
    })

}