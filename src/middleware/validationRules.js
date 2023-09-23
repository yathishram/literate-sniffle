const { body, validationResult } = require('express-validator');

const taskValidationRules = [

    body('title').isLength({ min: 3 }).withMessage('Title must be at least 3 characters long'),
    body('description').isLength({ min: 5 }).withMessage('Description must be at least 5 characters long'),
    body('priority').optional().custom(value => {
        if(value !== 'low' && value !== 'medium' && value !== 'high'){
            throw new Error('Priority must be low, medium or high');
        }
        return true;
    }),
    body('flag').optional().custom(value => {
       if(typeof value !== 'boolean'){
           throw new Error('Flag must be a boolean');
       }
         return true;
    })
];

module.exports = [
    ...taskValidationRules,
    function (req, res, next) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];