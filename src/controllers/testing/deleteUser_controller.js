
const { user } = require('../../models/modelsInitialization');
//Llamar la conexion a mongoDB
const connectDB = require('../../models/dbConnection');

connectDB();

const deleteUser = async () => {

    const userName = 'ledson';
    const email = 'andelsonnicolas@gmail.com';

    //Busco un registro por nombre de usuario o por correo
    const userFind = await user.find({
        $or: [
            { userName: userName },
            { email: email },
        ]
    });

    console.log(userFind);

    //eliminar solo un registro
    await user.findOneAndDelete({ _id: userFind[0]._id });
};

deleteUser();