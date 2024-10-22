import jwt from 'jsonwebtoken'

const generateToken = (res, userId)=>{
      
    const token = jwt.sign({userId , role: "user"}, process.env.JWT_SECRET , {
        expiresIn:'3d'
    })

    res.cookie('accessToken' , token, {
        httpOnly:true,
        sameSite:'strict',
        maxAge : 3 * 24 * 60 * 60 * 1000
    })
}

export default generateToken