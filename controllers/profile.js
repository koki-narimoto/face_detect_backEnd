

const getId = (req, res, knex) =>{
    const {id } = req.params;
    knex.select('*').from('users').where({
        'id': id
    }).then(user => {
        if(user.length){
            res.json(user[0])
        }
        else{
            res.status(400).json('error user not found');
        }
    })
    .catch(err => res.status(400).json('error getting user'))
}

module.exports = {
    getId: getId
};