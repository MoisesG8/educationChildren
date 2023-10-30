import { firebase } from '../Firebase';

const LogOut = async () => {
    try {
        await firebase.auth().signOut();
        console.log('User signed out!');
    } catch (error) {
        console.log(error);
    }
};

export default LogOut;