import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Entypo } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';

const FooterMenu= () => {
    const navigation = useNavigation();
    return (
        <View style={styles.footerMenu__wrap}>
            <TouchableOpacity style={styles.footerMenu__item} onPress={() => navigation.navigate('Top')}>
                <Entypo name="home" size={24} color="#6f6152" />
                <Text style={styles.footerMenu__text}>一覧</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.footerMenu__item} onPress={() => navigation.navigate('CategoryList')}>
                <MaterialIcons name="category" size={24} color="#6f6152" />
                <Text style={styles.footerMenu__text}>カテゴリー</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.footerMenu__item} onPress={() => navigation.navigate('Post')}>
                <MaterialIcons name="post-add" size={24} color="#6f6152" />
                <Text style={styles.footerMenu__text}>投稿</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.footerMenu__item} onPress={() => navigation.navigate('Search')}>
                <Feather name="search" size={24} color="#6f6152" />
                <Text style={styles.footerMenu__text}>検索</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.footerMenu__item} onPress={() => navigation.navigate('Mylist')}>
                <Feather name="list" size={24} color="#6f6152" />
                <Text style={styles.footerMenu__text}>マイリスト</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    footerMenu__wrap: {
        alignItems: 'center',
        backgroundColor: '#fff',
        bottom: 0,
        flexDirection: 'row',
        position: 'absolute',
        justifyContent: 'space-between',
        paddingTop: 10,
        paddingBottom: 20,
        paddingRight: 30,
        paddingLeft: 30,
        width: '100%'
    },
    footerMenu__item: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    footerMenu__text: {
        marginTop: 5
    },
});

export default FooterMenu;