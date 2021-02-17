import {FlatList, Text, View} from 'react-native';
import React from 'react';
import {AppStyles} from '../../../theme/styles';
import Spinner from '../../../common/Spinner';
import colors from '../../../theme/colors';
import {TextHeader} from "../../../common/Headers";
import {Typography} from "../../../theme/Typography";
import UserContext from "../../../AuthContaxt/index";
import {Preferences} from "../../../UtilMethods/AppLocalStorage";
import PreferencesKeys from "../../../UtilMethods/PreferencesKeys";
import ApiServices from "../../../ApiServices/Services";
import Moment from 'moment';

const ClinicHome = ({navigation}) => {
    const store = React.useContext(UserContext);
    const {user, setUser, setLogin} = store;
    const [loading, setLoading] = React.useState(true);
    const [clinic, setClinic] = React.useState([]);
    const [futureClinic, setFutureClinic] = React.useState([]);
    const logout = () => {
        Preferences._RemoveStoredData(PreferencesKeys.TOKEN).done();
        Preferences._RemoveStoredData(PreferencesKeys.USER).done();
        setUser(false);
        setLogin(false);
    };
    React.useEffect(() => {

        console.log('res---', user.id);
        ApiServices.todayClinic(user.id, (res) => {
            setLoading(false);
            console.log('res---', res);
            if (res.success) {
                setClinic(res.response.clinics)
            } else {
                setClinic([])
            }
        });

        ApiServices.futureClinic(user.id, (res) => {
            setLoading(false);
            console.log('res---', res);
            if (res.success) {
                setFutureClinic(res.response.clinics)
            } else {
                setFutureClinic([])
            }
        });

    }, [store]);
    if (loading) {
        return <Spinner loading={loading}/>;
    } else {
        return (
            <View
                style={[
                    AppStyles.columnContainer,
                    {backgroundColor: colors.white, height: '100%'},
                ]}>
                {user && <TextHeader title={`Welcome ${user.firstName} ${user.lastName}`} iconName="sign-out-alt"
                                     iconClick={logout}/>}

                <Spinner loading={loading}/>

                <View
                    style={[AppStyles.columnContainer, AppStyles.padding]}>
                    {/*{user && <Text style={Typography.medium}>{"Welcome"} <Text
                        style={[
                            Typography.Bold,
                            {
                                fontSize: 20,
                            },
                        ]}>
                        {`${user.firstName} ${user.lastName}`}
                    </Text></Text>}*/}

                    <Text style={[Typography.Bold, {
                        backgroundColor: colors.accentColor,
                        width: '100%',
                        color: colors.white,
                        height: 30,
                        textAlignVertical: 'center',
                        paddingStart: 10,
                        borderRadius: 5,
                        marginTop: 10,
                        marginBottom: 10
                    }]}>{"Today Clinic"}</Text>

                    {clinic.length > 0 ?
                        <FlatList
                            style={{height: '40%'}}
                            data={clinic}
                            showsVerticalScrollIndicator={false}
                            renderItem={({item}) => <ClinicItem navigation={navigation} item={item}/>}
                            keyExtractor={(item, index) => index}
                        /> : <Text style={[Typography.Bold, {
                            width: '100%',
                            color: colors.red,
                            height: 30,
                            textAlignVertical: 'center',
                            paddingStart: 10,
                            borderRadius: 5,
                            marginTop: 10,
                            marginBottom: 10
                        }]}>{"No clinics for today"}</Text>}

                    <Text style={[Typography.Bold, {
                        backgroundColor: colors.accentColor,
                        width: '100%',
                        color: colors.white,
                        height: 30,
                        textAlignVertical: 'center',
                        paddingStart: 10,
                        borderRadius: 5,
                        marginTop: 10,
                        marginBottom: 10
                    }]}>{"Future Clinic"}</Text>
                    {futureClinic.length > 0 ?
                        <FlatList
                            style={{height: '40%'}}
                            data={futureClinic}
                            showsVerticalScrollIndicator={false}
                            renderItem={({item}) => <ClinicItem navigation={navigation} item={item}/>}
                            keyExtractor={(item, index) => index}
                        /> : <Text style={[Typography.Bold, {
                            width: '100%',
                            color: colors.red,
                            height: 30,
                            textAlignVertical: 'center',
                            paddingStart: 10,
                            borderRadius: 5,
                            marginTop: 10,
                            marginBottom: 10
                        }]}>{"No future clinics"}</Text>}


                </View>


            </View>
        );
    }
};

const ClinicItem = ({navigation, item}) => {

    return <View style={{
        padding: 10,
        flexDirection: 'column',
        width: '95%',
        alignSelf: 'center',
        backgroundColor: colors.listBg,
        borderRadius: 20,
        margin: 5,
        elevation: 5
    }}>
        <View style={[AppStyles.rowContainer, {justifyContent: 'space-between'}]}>

            <Text style={[Typography.Bold, {color: colors.white}]}>{`Date: ${Moment(item.date).format('DD/MM/YYYY')}`}</Text>

        </View>

        <View style={{
            borderStyle: 'dotted',
            borderWidth: 0.5,
            borderRadius: 1,
            borderColor: colors.white,
            width: '90%',
            height: 0.5,
            margin: 10,
        }}>
        </View>

        {rowItemValue("Booked Clients", item.bookedclients)}
        {rowItemValue("Venue", item.clinic.venue.venue)}
        {rowItemValue("Post Code", item.clinic.venue.postCode)}
        {rowItemValue("Address", item.clinic.venue.address.toString())}

    </View>
};
const rowItemValue = (title, value) => {
    return <View style={{flexDirection: 'row', marginTop: 5, justifyContent: 'space-between'}}>

        <Text style={[Typography.medium, {
            color: colors.white,
        }]}>{title}</Text>

        <Text style={[Typography.Bold, {
            color: colors.white,
            fontSize: 14
        }]}>{value}</Text>

    </View>
}

export default ClinicHome;
