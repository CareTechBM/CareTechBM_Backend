// import User from '../Controllers/users.model.js';
// import bcryptjs from "bcryptjs";
// import { generarJWT } from '../helpers/generate-JWT.js';

// export const register = async (req, res) => {
//     try {
        
//         const { name, lastName, email, password, role } = req.body;
//         const encryptPassword = bcryptjs.hashSync(password);
        
//         const user = await User.create({
//             name,
//             lastName,
//             email,
//             password: encryptPassword,
//             role,
//             dateCreation: new Date()
//         });

//         return res.status (200).json({
//             msg: "User has been added to database",
//             userDetails: {
//                 fullName: `${user.name} ${user.lastName}`,
//                 email: user.email,
//                 role: user.role,
//             }
//         });
        
//     } catch (e) {
//         console.log(e);
//         return res.status(500).send('Failed to register user');
//     }
// }

// export const login = async (req, res) => {
//     try {

//         const { email, password } = req.body;

//         let user = await User.findOne({ email: email.toLowerCase()});

//         if ( !user ) {
//             console.log( 'User not found:', email );
//             return res.status( 400 ).send( `Wrong credentials, ${email} doesn´t exist in database` );
//         }

//         if ( !user.password ) {
//             console.log( 'User has no password:', user );
//             return res.status( 500 ).send( 'User password is undefined' );
//         }

//         const validPassword = bcryptjs.compareSync( password, user.password );

//         if ( !validPassword ) {
//             console.log( 'Invalid password for user:', email );
//             return res.status( 400 ).send( "Wrong password" );
//         }

//         const token = await generarJWT( user.id);

//         res.status(200).json({
//             msg: "Login OK",
//             userDetails: {
//                 token: token,
//             }
//         })
        
//     } catch (e) {
//         console.log(e);
//         return res.status(500).send('Contact the administrator');
//     }
// }