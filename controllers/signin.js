

const handleSignIn = (req, res, knex, bcryptNodejs) => {
    const {email, password} = req.body;
    if(!email || !password){
        return res.status(400).json('incorrect login');
    }
    knex.select('email', 'hash').from('login')
        .where('email', '=', email)
        .then(data => {
            const isValid = bcryptNodejs.compareSync(password, data[0].hash);
            if(isValid){
                return knex.select('*').from('users')
                .where('email', '=', email)
                .then(user => {
                    res.json(user[0])
                })
                .catch(err => res.status(400).json('unable to get user'))
            }else{
                res.status(400).json('wrong information')
            }
        })
        .catch(err => res.status(400).json('wrong information'))
}

module.exports = {
    handleSignIn : handleSignIn
};