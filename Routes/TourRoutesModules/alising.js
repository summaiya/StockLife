exports.top_five_cheap_and_best = (req, res, next)=>{
    //http://localhost:3000/api/v1/tours/?limit=5&sort=price,ratingsQuantity&fields=name,price,ratingsQuantity
    console.log('http://localhost:3000/api/v1/tours/?limit=5&sort=price,ratingsQuantity&fields=name,price,ratingsQuantity')
    req.query.limit = "5";
    req.query.sort = "price,ratingsQuantity";
    req.query.fields = "name,price,ratingsQuantity"
    next();
}
