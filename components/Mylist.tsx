import React from 'react';
import { StyleSheet, Text, View, ScrollView, SafeAreaView } from 'react-native';
import Header from './Header';
import FooterMenu from './FooterMenu';


const Mylist: React.FC = () => {
    return (
        <View>
            <Header />
            <View style={styles.mylist__wrap}>

            </View>
            <FooterMenu />
        </View>
    )
}

const styles = StyleSheet.create({
    mylist__wrap: {
        backgroundColor: '#ddcaaf',
        height: '83%',
        paddingTop: 40,
        paddingBottom: 40,
        paddingRight: 30,
        paddingLeft: 30
    },
    categoryList__items: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    categoryList__item: {
        backgroundColor: '#ffffff',
        borderRadius: 40,
        marginBottom: 15,
        paddingTop: 30,
        paddingBottom: 30,
        paddingRight: 40,
        paddingLeft: 40
    },
    CategoryList__item__last:  {
        backgroundColor: '#ffffff',
        borderRadius: 40,
        marginBottom: 0,
        paddingTop: 30,
        paddingBottom: 30,
        paddingRight: 40,
        paddingLeft: 40
    },
    categoryList_text: {
        textAlign: 'center',
        fontSize: 25,
        fontWeight: 'bold',
        marginTop: 5
    }
})

export default Mylist;