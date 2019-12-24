module.exports = (req,res,next)=>{    
    if(req.body.username == null || req.body.password == null ){        
        return res.redirect('/auth/login')
    }   
    next()
}
