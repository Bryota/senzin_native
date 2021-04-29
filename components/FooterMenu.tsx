import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';





const FooterMenu: React.FC = () => {
    return (
        <View style={styles.footerMenu__wrap}>
            <View style={styles.footerMenu__item}>
                <Entypo name="home" size={24} color="#6f6152" />
                <Text style={styles.footerMenu__text}>一覧</Text>
            </View>
            <View style={styles.footerMenu__item}>
                <MaterialIcons name="category" size={24} color="#6f6152" />
                <Text style={styles.footerMenu__text}>カテゴリー</Text>
            </View>
            <View style={styles.footerMenu__item}>
                <MaterialIcons name="post-add" size={24} color="#6f6152" />
                <Text style={styles.footerMenu__text}>投稿</Text>
            </View>
            <View style={styles.footerMenu__item}>
                <Feather name="search" size={24} color="#6f6152" />
                <Text style={styles.footerMenu__text}>検索</Text>
            </View>
            <View style={styles.footerMenu__item}>
                <Feather name="list" size={24} color="#6f6152" />
                <Text style={styles.footerMenu__text}>マイリスト</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    footerMenu__wrap: {
        alignItems: 'center',
        backgroundColor: '#fff',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 10,
        paddingBottom: 20,
        paddingRight: 30,
        paddingLeft: 30
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