import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Header from './Header';
import FooterMenu from './FooterMenu';

const Register: React.FC = () => {
    const [email, setEmail] = useState<string>();
    const [username, setUsername] = useState<string>();
    const [password, setPassword] = useState<string>();
    const navigation = useNavigation();
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
                                <TextInput style={styles.register__form__input} />
                            </View>
                            <View style={styles.register__form__items}>
                                <Text style={styles.register__form__text}>ユーザー名<Text style={styles.register__form__required}>必須</Text></Text>
                                <TextInput style={styles.register__form__input} />
                            </View>
                            <View style={styles.register__form__items}>
                                <Text style={styles.register__form__text}>パスワード<Text style={styles.register__form__required}>必須</Text></Text>
                                <TextInput style={styles.register__form__input} />
                            </View>
                            <View style={styles.register__form__items}>
                                <Text style={styles.register__form__text}>パスワード確認</Text>
                                <TextInput style={styles.register__form__input} />
                            </View>
                            <View style={styles.register__form__btn__wrap}>
                                <Text style={styles.register__form__btn__text}>新規登録</Text>
                            </View>
                            <Text style={styles.register__form__to__register} onPress={() => navigation.navigate('Login')}>ログイン</Text>
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
    }
})

export default Register;