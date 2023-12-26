const passport = require('passport');
const GitHubStrategy = require('passport-github').Strategy;
const User = require('./models/User'); // Asegúrate de usar la ruta correcta
const userService = require('./models/User');

const initializePassport = () => {
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser(async (id, done) => {
        try {
            let user = await userService.findById(id);
            done(null, user);
        } catch (error) {
            done(error, null);
        }
    });

    passport.use(new GitHubStrategy({
        clientID: 'fc70ab08bae8c420b181',
        clientSecret: '524abf02a9d456e90e9dbadf660edbc2b4ae1b6d',
        callbackURL: 'http://localhost:8080/auth/github/callback'
    }, async (accessToken, refreshToken, profile, done) => {
        try {
            console.log('GitHub Profile:', profile); // Log del perfil obtenido de GitHub

            let user = await User.findOne({ email: profile._json.email });

            if (!user) {
                let newUser = {
                    name: profile._json.name,
                    last_Name: '',
                    age: 18,
                    email: profile._json.email,
                    password: 'aaa'
                }
                let result = await User.create(newUser);
                console.log('New User created:', result); // Log del nuevo usuario creado
                done(null, result);
            } else {
                console.log('User found:', user); // Log del usuario encontrado
                done(null, user);
            }
        } catch (error) {
            console.error('Error during GitHub authentication:', error); // Log de errores
            done(error, null);
        }
    }));
};

module.exports = initializePassport;
