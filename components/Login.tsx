import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import Header from './Header';
import FooterMenu from './FooterMenu';
import storage from '../util/Storage';

interface LoginDataType {
    email: string,
    password: string
}

const Login: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [userId, setUserId] = useState<number>(0);
    const [loginState, setLoginState] = useState<string>('');
    const [emailValidationFlg, setEmailValidationFlg] = useState<boolean>(false);
    const [passwordValidationFlg, setPasswordValidationFlg] = useState<boolean>(false);
    const navigation = useNavigation();

    useEffect(() => {
        switch (loginState) {
            case 'logined':
                storage.save({
                    key: 'AUTH',
                    data: {
                        userId: userId
                    }
                })
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'Mylist' }]
                });
                break;
            case 'invalid-email':
                setEmailValidationFlg(true);
                break;
            case 'invalid-password':
                setPasswordValidationFlg(true);
                break;
            default:
                setEmailValidationFlg(false);
                setPasswordValidationFlg(false);
                break;
        }
    },[loginState, email, password]);

    const sendLoginUserDataToDB = (data: LoginDataType) => {
        axios.post('http://senzin.site/api/checkLoginUser', data)
        .then((res) => {
            if (res.data[1]) {
                setUserId(res.data[1] as number);
            }
            setLoginState(res.data[0]);
            setEmail('');
            setPassword('');
        })
    }

    const submitLoginInfo = () => {
        setEmailValidationFlg(false);
        setPasswordValidationFlg(false);
        sendLoginUserDataToDB({
            email: email,
            password: password
        });
    }
    return (
        <View>
            <Header />
            <View style={styles.login__wrap}>
                <View style={styles.login__title__wrap}>
                    <Text style={styles.login__title}>ログイン</Text>
                </View>
                <SafeAreaView>
                    <ScrollView style={styles.login__form}>
                        <View style={styles.login__form__items}>
                            <View style={styles.login__form__items}>
                                <Text style={styles.login__form__text}>メールアドレス<Text style={styles.login__form__required}>必須</Text></Text>
                                <TextInput style={styles.login__form__input} onChangeText={setEmail} value={email} autoCapitalize='none' />
                                {emailValidationFlg ?
                                <Text style={styles.validation}>メールアドレスを正しく入力してください</Text>
                                :
                                <></>
                                }
                            </View>
                            <View style={styles.login__form__items}>
                                <Text style={styles.login__form__text}>パスワード<Text style={styles.login__form__required}>必須</Text></Text>
                                <TextInput style={styles.login__form__input} onChangeText={setPassword} value={password} autoCapitalize='none'/>
                                {passwordValidationFlg ?
                                <Text style={styles.validation}>パスワードを正しく入力してください</Text>
                                :
                                <></>
                                }
                            </View>
                            <TouchableOpacity style={styles.login__form__btn__wrap} onPress={submitLoginInfo}>
                                <Text style={styles.login__form__btn__text}>ログイン</Text>
                            </TouchableOpacity>
                            <Text style={styles.login__form__to__register} onPress={() => navigation.navigate('Register')}>新規登録</Text>
                        </View>
                    </ScrollView>
                </SafeAreaView>
            </View>
            <FooterMenu />
        </View>
    )
}

const styles = StyleSheet.create({
    login__wrap: {
        backgroundColor: '#eee',
        paddingTop: 20,
    },
    login__title__wrap: {
        flexDirection: 'row',
        justifyContent: 'center',
        paddingBottom: 20
    },
    login__title: {
        color: '#6f6152',
        fontSize: 50,
        fontWeight: 'bold',
    },
    login__form: {
        backgroundColor: '#ddcaaf',
        height: '74%',
        marginRight: 'auto',
        marginLeft: 'auto',
        paddingBottom: 20,
        width: '85%'
    },
    login__form__items: {
        paddingTop: 20,
        paddingBottom: 20,
        marginRight: 'auto',
        marginLeft: 'auto',
        width: '80%'
    },
    login__form__text: {
        fontSize: 28
    },
    login__form__required: {
        color: 'red',
        display: 'flex',
        fontSize: 18,
        paddingLeft: 10
    },
    login__form__input: {
        backgroundColor: '#fff',
        borderRadius: 30,
        padding: 10,
        marginTop: 20
    },
    login__form__btn__wrap: {
        textAlign: 'center',
        backgroundColor: '#fff',
        borderRadius: 30,
        shadowColor: 'rgba(0, 0, 0, 0.5)',
        shadowOffset: {
        width: 2,
        height: 2,
        },
        shadowRadius: 0,
        shadowOpacity: 1,
        marginTop: 60,
        marginRight: 'auto',
        marginLeft: 'auto',
        width: '50%'
    },
    login__form__btn__text: {
        color: '#6f6152',
        textAlign: 'center',
        fontSize: 18,
        paddingTop: 15,
        paddingBottom: 15
    },
    login__form__to__register: {
        textAlign: 'center',
        fontSize: 15,
        paddingTop: 30
    },
    validation: {
        color: 'red',
        fontSize: 20,
        marginTop: 15
    }
})

export default Login;