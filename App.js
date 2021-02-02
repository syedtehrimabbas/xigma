import 'react-native-gesture-handler';

import Login from './src/screens/Login';
import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import Splash from './src/screens/Splash';
import {UserProvider} from './src/AuthContaxt';
import {createStackNavigator} from '@react-navigation/stack';
import {Preferences} from "./src/UtilMethods/AppLocalStorage";
import PreferencesKeys from "./src/UtilMethods/PreferencesKeys";
import {HOME, LOGIN} from "./src/common/screen_names/index";
import ClinicHome from "./src/screens/home/StoreHome/ClinicHome";

/*Screens*/

const RootStack = createStackNavigator();

const App = () => {
    const [user, setUser] = React.useState({});
    const [login, setLogin] = React.useState(false);
    const [token, setToken] = React.useState('');
    const [isSplash, setSplash] = React.useState(true);
    const [alertShow, setAlertShow] = React.useState(false);
    const [alertMessage, setAlertMessage] = React.useState('');

    const showAlert = (message) => {
        setAlertMessage(message);
        setAlertShow(true);
    };

    let store = {
        user: user,
        setUser: setUser,
        login: login,
        setLogin: setLogin,
        token: token,
        setToken: setToken,
        splash: isSplash,
        setSplash: setSplash,
        showAlert: showAlert,
        alertShow: alertShow,
        alertMessage: alertMessage,
        setAlertShow: setAlertShow
    };

    React.useEffect(() => {
        setTimeout(() => {
            Preferences._GetStoredData(PreferencesKeys.USER).then((user) => {
                console.log("user", user);
                if (user !== null) {
                    setSplash(false);
                    setLogin(true);
                    setToken("");
                    setUser(user);
                } else {
                    setLogin(false);
                    setSplash(false);
                    setToken(null);
                    setUser(null);
                }
            });
        }, 2000);
    }, []);

    if (isSplash) {
        return <Splash/>;
    } else {
        return (
            <UserProvider value={store}>
                <NavigationContainer>
                    <RootStack.Navigator headerMode="none" initialRouteName={LOGIN}>
                        {!login ? (
                            <>
                            <RootStack.Screen name={LOGIN} component={Login}/>
                            </>
                        ) : (
                            <>
                            <RootStack.Screen name={HOME} component={ClinicHome}/>
                            </>
                        )}
                    </RootStack.Navigator>
                </NavigationContainer>
            </UserProvider>
        );
    }
};

export default App;