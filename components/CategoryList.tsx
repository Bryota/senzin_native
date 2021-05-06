import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import Header from './Header'
import FooterMenu from './FooterMenu'

const CategoryList: React.FC = () => {
    const navigation = useNavigation()
    return (
        <View>
            <Header />
            <View style={styles.categoryList__wrap}>
                <View style={styles.categoryList__items}>
                    <TouchableOpacity style={styles.categoryList__item} onPress={() => navigation.navigate('Category')}>
                        <MaterialCommunityIcons name="silverware-fork-knife" size={80} color="red" />
                        <Text style={styles.categoryList_text}>食べ物</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.categoryList__item} onPress={() => navigation.navigate('Category')}>
                        <FontAwesome5 name="broom" size={80} color="green" />
                        <Text style={styles.categoryList_text}>掃除</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.categoryList__items}>
                    <TouchableOpacity style={styles.categoryList__item} onPress={() => navigation.navigate('Category')}>
                        <Entypo name="squared-plus" size={80} color="blue" />
                        <Text style={styles.categoryList_text}>健康</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.categoryList__item} onPress={() => navigation.navigate('Category')}>
                        <FontAwesome5 name="running" size={80} color="orange" />
                        <Text style={styles.categoryList_text}>スポーツ</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.categoryList__items}>
                    <TouchableOpacity style={styles.CategoryList__item__last} onPress={() => navigation.navigate('Category')}>
                        <Entypo name="tv" size={80} color="purple" />
                        <Text style={styles.categoryList_text}>機械</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.CategoryList__item__last} onPress={() => navigation.navigate('Category')}>
                        <Entypo name="dots-three-horizontal" size={80} color="black" />
                        <Text style={styles.categoryList_text}>その他</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <FooterMenu />
        </View>
    )
}

const styles = StyleSheet.create({
    categoryList__wrap: {
        backgroundColor: '#ddcaaf',
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

export default CategoryList;