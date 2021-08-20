

const handleSignIn = (req, res, knex, bcryptNodejs) => {
    const {email, password} = req.body;
    if(!email || !password){
        return res.status(400).json('incorrect login');
    }
    knex.select('email', 'hash').from('login')
        .where('email', '=', req.body.email)
        .then(data => {
            const isValid = bcryptNodejs.compareSync(req.body.password, data[0].hash);
            if(isValid){
                return knex.select('*').from('users')
                .where('email', '=', req.body.email)
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
    handleSignIn
};