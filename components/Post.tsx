import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import Header from './Header';
import FooterMenu from './FooterMenu';

interface CategoryType {
    category: '1' | '2' | '3' | '4' | '5' | '6';
}

const Post: React.FC = () => {
    const [title, setTitle] = useState<string>();
    const [category, setCotegory] = useState<CategoryType | string>("1");
    const [username, setUsername] = useState<string>('匿名希望');
    const [content, setContent] = useState<string>();
    return (
        <View>
            <Header />
            <View style={styles.post__wrap}>
                <View style={styles.post__title__wrap}>
                    <Text style={styles.post__title}>投稿フォーム</Text>
                </View>
                <SafeAreaView>
                    <ScrollView style={styles.post__form}>
                        <View style={styles.post__form__items}>
                            <View style={styles.post__form__items}>
                                <Text style={styles.post__form__text}>投稿タイトル<Text style={styles.post__form__required}>必須</Text></Text>
                                <TextInput style={styles.post__form__input} />
                            </View>
                            <View style={styles.post__form__items}>
                                <Text style={styles.post__form__text}>カテゴリ<Text style={styles.post__form__required}>必須</Text></Text>
                                <RNPickerSelect
                                    placeholder={{ label: 'カテゴリを選択してください', value: '' }}
                                    value={category}
                                    onValueChange={(e) => setCotegory(e)}
                                    style={selectStyle}
                                    items={[
                                        { label: '食べ物', value: '1' },
                                        { label: '掃除', value: '2' },
                                        { label: '健康', value: '3' },
                                        { label: 'スポーツ', value: '4' },
                                        { label: 'その他', value: '5' }
                                    ]}
                                />
                            </View>
                            <View style={styles.post__form__items}>
                                <Text style={styles.post__form__text}>投稿者名<Text style={styles.post__form__required}>必須</Text></Text>
                                <TextInput style={styles.post__form__input} value={username} />
                            </View>
                            <View style={styles.post__form__items}>
                                <Text style={styles.post__form__text}>内容<Text style={styles.post__form__required}>必須</Text></Text>
                                <TextInput style={styles.post__form__textarea} multiline/>
                            </View>
                            <View style={styles.post__form__btn__wrap}>
                                <Text style={styles.post__form__btn__text}>投稿する</Text>
                            </View>
                        </View>
                    </ScrollView>
                </SafeAreaView>
            </View>
            <FooterMenu />
        </View>
    )
}

const styles = StyleSheet.create({
    post__wrap: {
        backgroundColor: '#eee',
        paddingTop: 20,
    },
    post__title__wrap: {
        flexDirection: 'row',
        justifyContent: 'center',
        paddingBottom: 20
    },
    post__title: {
        color: '#6f6152',
        fontSize: 50,
        fontWeight: 'bold',
    },
    post__form: {
        backgroundColor: '#ddcaaf',
        height: '74%',
        marginRight: 'auto',
        marginLeft: 'auto',
        paddingBottom: 20,
        width: '85%'
    },
    post__form__items: {
        paddingTop: 20,
        paddingBottom: 20,
        marginRight: 'auto',
        marginLeft: 'auto',
        width: '80%'
    },
    post__form__text: {
        fontSize: 28
    },
    post__form__required: {
        color: 'red',
        display: 'flex',
        fontSize: 18,
        paddingLeft: 10
    },
    post__form__input: {
        backgroundColor: '#fff',
        borderRadius: 30,
        padding: 10,
        marginTop: 20
    },
    post__form__textarea: {
        backgroundColor: '#fff',
        borderRadius: 30,
        height: 200,
        paddingTop: 20,
        padding: 20,
        marginTop: 20
    },
    post__form__btn__wrap: {
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
        marginRight: 'auto',
        marginLeft: 'auto',
        width: '50%'
    },
    post__form__btn__text: {
        color: '#6f6152',
        textAlign: 'center',
        fontSize: 18,
        paddingTop: 15,
        paddingBottom: 15
    }
})

const selectStyle = StyleSheet.create({
    inputIOS: {
        backgroundColor: '#fff',
        borderRadius: 30,
        padding: 10,
        marginTop: 20
    },
})
export default Post;