import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import Header from './Header';
import FooterMenu from './FooterMenu';
import Validation from '../util/Validation';


interface RegisterDataType {
    email: string,
    name: string,
    password: string
}

const Register: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [passwordComfire, setPasswordComfire] = useState<string>();
    const [emailValidationFlg, setEmailValidationFlg] = useState<boolean>(false);
    const [uniqueEmailFlg, setUniqueEmailFlg] = useState<boolean>(false);
    const [nameValidationFlg, setNameValidationFlg] = useState<boolean>(false);
    const [passwordValidationFlg, setPasswordValidationFlg] = useState<boolean>(false);
    const [passwordComfireValidationFlg, setPasswordComfireValidationFlg] = useState<boolean>(false);

    const navigation = useNavigation();

    useEffect(() => {
        checkInputValidation();
    },[email,username,password])

    const checkInputValidation = () => {
        Validation(email, setEmailValidationFlg);
        Validation(username, setNameValidationFlg);
        Validation(password, setPasswordValidationFlg);
    }

    const checkSendValidation = () => {
        setPasswordComfireValidationFlg(false);
        if (password !== passwordComfire) {
            setPasswordComfireValidationFlg(true);
            return true;
        } else {
            return false;
        }
    }

    const sendRegisterDataToDB = async(data: RegisterDataType) => {
        await axios.post('http://senzin.site/api/setNewUser', data)
        .then((res) => {
            if (res.data === 'invalid-email') {
                setUniqueEmailFlg(true);
                setPassword('');
                setPasswordComfire('');
            } else {
                setEmail('');
                setUsername('');
                setPassword('');
                setPasswordComfire('');
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'Login' }]
                });
            }
        })
    }

    const submitRegisterInfo = () => {
        setUniqueEmailFlg(false)
        if (checkSendValidation()) {
            return;
        }
        sendRegisterDataToDB({
            email: email,
            name: username,
            password: password
        })
    }
    return (
        <View>
            <Header />
            <View style={styles.register__wrap}>
                <View style={styles.register__title__wrap}>
                    <Text style={styles.register__title}>新規登録</Text>
                </View>
                <SafeAreaView>
                    <ScrollView style={styles.register__form}>
                        <View style={styles.register__form__items}>
                            <View style={styles.register__form__items}>
                                <Text style={styles.register__form__text}>メールアドレス<Text style={styles.register__form__required}>必須</Text></Text>
                                <TextInput style={styles.register__form__input} onChangeText={setEmail} autoCapitalize='none' value={email}/>
                                {emailValidationFlg ?
                                <Text style={styles.validation}>メールアドレスを入力してください</Text>
                                :
                                <></>
                                }
                                {uniqueEmailFlg ?
                                <Text style={styles.validation}>メールアドレスが既に使われています</Text>
                                :
                                <></>
                                }
                            </View>
                            <View style={styles.register__form__items}>
                                <Text style={styles.register__form__text}>ユーザー名<Text style={styles.register__form__required}>必須</Text></Text>
                                <TextInput style={styles.register__form__input} onChangeText={setUsername} autoCapitalize='none' value={username}/>
                                {nameValidationFlg ?
                                <Text style={styles.validation}>ユーザー名を入力してください</Text>
                                :
                                <></>
                                }
                            </View>
                            <View style={styles.register__form__items}>
                                <Text style={styles.register__form__text}>パスワード<Text style={styles.register__form__required}>必須</Text></Text>
                                <TextInput style={styles.register__form__input} onChangeText={setPassword} autoCapitalize='none' value={password}/>
                                {passwordValidationFlg ?
                                <Text style={styles.validation}>パスワードを入力してください</Text>
                                :
                                <></>
                                }
                            </View>
                            <View style={styles.register__form__items}>
                                <Text style={styles.register__form__text}>パスワード確認</Text>
                                <TextInput style={styles.register__form__input} onChangeText={setPasswordComfire} autoCapitalize='none' value={passwordComfire}/>
                                {passwordComfireValidationFlg ?
                                <Text style={styles.validation}>パスワードが一致しません</Text>
                                :
                                <></>
                                }
                            </View>
                            <TouchableOpacity style={styles.register__form__btn__wrap} onPress={submitRegisterInfo}>
                                <Text style={styles.register__form__btn__text}>新規登録</Text>
                            </TouchableOpacity>
                            <Text style={styles.register__form__to__register} onPress={() => navigation.reset({index: 0, routes: [{name: 'Login'}]})}>ログイン</Text>
                        </View>
                    </ScrollView>
                </SafeAreaView>
            </View>
            <FooterMenu />
        </View>
    )
}

const styles = StyleSheet.create({
    register__wrap: {
        backgroundColor: '#eee',
        paddingTop: 20,
    },
    register__title__wrap: {
        flexDirection: 'row',
        justifyContent: 'center',
        paddingBottom: 20
    },
    register__title: {
        color: '#6f6152',
        fontSize: 50,
        fontWeight: 'bold',
    },
    register__form: {
        backgroundColor: '#ddcaaf',
        height: '74%',
        marginRight: 'auto',
        marginLeft: 'auto',
        paddingBottom: 20,
        width: '85%'
    },
    register__form__items: {
        paddingTop: 20,
        paddingBottom: 20,
        marginRight: 'auto',
        marginLeft: 'auto',
        width: '80%'
    },
    register__form__text: {
        fontSize: 28
    },
    register__form__required: {
        color: 'red',
        display: 'flex',
        fontSize: 18,
        paddingLeft: 10
    },
    register__form__input: {
        backgroundColor: '#fff',
        borderRadius: 30,
        padding: 10,
        marginTop: 20
    },
    register__form__btn__wrap: {
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
    register__form__btn__text: {
        color: '#6f6152',
        textAlign: 'center',
        fontSize: 18,
        paddingTop: 15,
        paddingBottom: 15
    },
    register__form__to__register: {
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

export default Register;