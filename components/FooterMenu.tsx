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
            <TouchableOpacity style={styles.footerMenu__item} onPress={() => navigation.reset({ index: 0, routes: [{name: 'Top'}]})}>
                <Entypo name="home" size={24} color="#6f6152" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.footerMenu__item} onPress={() => navigation.reset({ index: 0, routes: [{name: 'CategoryList'}]})}>
                <MaterialIcons name="category" size={24} color="#6f6152" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.footerMenu__item} onPress={() => navigation.reset({ index: 0, routes: [{name: 'Post'}]})}>
                <MaterialIcons name="post-add" size={24} color="#6f6152" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.footerMenu__item} onPress={() => navigation.reset({ index: 0, routes: [{name: 'Search'}]})}>
                <Feather name="search" size={24} color="#6f6152" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.footerMenu__item} onPress={() => navigation.reset({ index: 0, routes: [{name: 'Mylist'}]})}>
                <Feather name="list" size={24} color="#6f6152" />
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
        paddingTop: 15,
        paddingBottom: 15,
        paddingRight: 30,
        paddingLeft: 30,
        width: '100%'
    },
    footerMenu__item: {
        alignItems: 'center',
        justifyContent: 'center'
    },
});

export default FooterMenu;