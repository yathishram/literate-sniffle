const { query, validationResult } = require('express-validator');

const priorityValidationRules = [

  
    query('priority').custom(value => {
        if(value !== 'low' && value !== 'medium' && value !== 'high'){
            throw new Error('Priority must be low, medium or high');
        }
        return true;
    }),
   
];

module.exports = [
    ...priorityValidationRules,
    function (req, res, next) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];