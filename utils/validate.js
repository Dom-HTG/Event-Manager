const { z } = require('zod');

//Defining zod schemas for input validation.
//Login schema.
const LoginSchema = z.object({
    body: z.object({
        email: z.string()
         .email({message: 'Invalid emailaddress'})
         .min(1, {message: 'Email is required'}),
        password: z.string()
         .min(1, {message: 'Password is required'})
    })
});

//Register schema.
const RegisterSchema = z.object({
    body: z.object({
        firstName: z.string().min(1, {message: 'First Name is required'}),
        lastName: z.string().min(1, {message: 'Last Name is required'}),
        email: z.string()
         .email({message: 'Invalid email address'})
         .min(1, {message: 'Email is reqauired'}),
        password: z.string().min(8, {message: 'Password must be at least 8 characters'})
    })
});

// //EVENT schemas.
// const CreateEventSchema = z.object({
//     body: z.object({
//         title: z.string()
//          .min(1, {message: 'Title is required'})
//          .max(100, {message: 'Title should not exceed 100 characters'}),
//         description: z.string()
//          .min(10, {message: 'Atleast 10 characters required'})
//          .max(700, {message: 'description must not exceed 700 characters')
//          .   ,

//     })
// })

module.exports = { LoginSchema, RegisterSchema };