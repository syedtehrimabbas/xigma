import {AppInput, VerticalSpace} from '../common/InputFields';
import {Image, ImageBackground, SafeAreaView, Text, View} from 'react-native';
import React, {useContext} from 'react';

import ApiServices from '../ApiServices/Services';
import {AppStyles} from '../theme/styles';
import {RoundedButton} from '../common/Buttons';
import Spinner from '../common/Spinner';
import {Typography} from '../theme/Typography';
import UserContext from '../AuthContaxt';
import colors from '../theme/colors';
import {images} from '../assets/images';
import {Preferences} from "../UtilMethods/AppLocalStorage";
import PreferencesKeys from "../UtilMethods/PreferencesKeys";
import XigmaAlert from "../components/XigmaAlert";

const Login = ({navigation}) => {
    const store = useContext(UserContext);
    console.log('value', store);
    const {alertShow, alertMessage, showAlert, setAlertShow} = store;
    const [userName, onUsernameChange] = React.useState('test');
    const [password, onPasswordChange] = React.useState('test');
    const [loading, setLoading] = React.useState(false);

    const onLoginButton = () => {
        if (userName === '') {
            alert("Please enter username.");
        } else if (password === '') {
            alert("Please enter password.");
        } else {
            const data = JSON.stringify({"username": userName, "password": password});

            setLoading(true);
            ApiServices.signIn(data, (res) => {
                console.log('res---', res);
                res = res.response;

                setLoading(false);

                if (res.success) {
                    let user = res.user;
                    let token = res.token;
                    console.log("onLoginButton", user)
                    store.setUser(user);
                    store.setToken(token);
                    store.setLogin(true);
                    Preferences._StoreData(PreferencesKeys.TOKEN, token).done();
                    Preferences._StoreData(PreferencesKeys.USER, user).done();

                } else {
                    showAlert(res.msg)
                }
            });

        }
    };
    return (
        <ImageBackground source={images.app_bg} style={{flex: 1, padding: 10}}>
            <SafeAreaView/>
            <VerticalSpace space={50}/>
            <View style={[AppStyles.columnContainer]}>

                <Image style={{alignSelf: 'center', width: 100, height: 100}}
                       resizeMode="contain"
                       source={images.appIcon}/>

                <XigmaAlert alertShow={alertShow} alertMessage={alertMessage}
                            onHideAlert={() => setAlertShow(false)}/>

                <Text
                    style={[
                        Typography.medium,
                        {
                            fontSize: 25,
                            marginTop: 10,
                            marginLeft: 10,
                        },
                    ]}>
                    {'Sign in'}
                </Text>
                <Spinner loading={loading}/>
                <Text
                    style={[
                        Typography.light,
                        {
                            width: '50%',
                            marginTop: 10,
                            marginLeft: 10,
                        },
                    ]}>
                    {'Welcome back, login'}
                </Text>

                <VerticalSpace space={20}/>

                <AppInput
                    placeholder={'username'}
                    iconSrc={images.email}
                    keyboardType="default"
                    returnKeyType="next"
                    onChangeText={(text) => onUsernameChange(text)}
                    value={userName}
                />
                <AppInput
                    placeholder={'Ppassword'}
                    iconSrc={images.lock}
                    keyboardType="default"
                    returnKeyType="next"
                    password={true}
                    onChangeText={(text) => onPasswordChange(text)}
                    value={password}
                />

                <VerticalSpace space={10}/>

                <RoundedButton
                    text="Sign in"
                    iconSrc={images.login_icon}
                    background={colors.accentColor}
                    onPress={onLoginButton}
                />

            </View>
        </ImageBackground>
    );
};

export default Login;
