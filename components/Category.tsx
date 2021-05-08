import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { useRoute, RouteProp } from '@react-navigation/native';
import axios from 'axios';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons'; 
import Header from './Header';
import FooterMenu from './FooterMenu';
import PostListType from '../util/PostListType';
import OmitValue from '../util/OmitValue';
import getCategoryIcon from '../util/CategoryIcon';

type CategoryParamList = {
    Category: { categoryId: number}
}

type CategoryRouteProps = RouteProp<CategoryParamList, 'Category'>

interface IconItemsType {
    iconGruop: string,
    iconName: string,
    iconColor: string
}

const Category= () => {
    const [categoryIcon, setCategoryIcon] = useState<IconItemsType>();
    const [categoryName, setCategoryName] = useState<string>();
    const [postList, setPostList] = useState<PostListType[]>();
    const route = useRoute<CategoryRouteProps>();
    const categoryId = route.params.categoryId;
    useEffect(() => {
        axios.get(`http://senzin.site/api/getCategoryName/${categoryId}`)
        .then((res) => {
            setCategoryName(res.data.category_name);
        });
        setCategoryIcon(getCategoryIcon(categoryId.toString()));
        axios.get(`http://senzin.site/api/getPostDataInCategory/${categoryId}`)
        .then((res) => {
            setPostList(res.data.data);
        });
    },[categoryId]);
    return (
        <View>
            <Header />
            <View style={styles.category__wrap}>
                <View style={styles.category__title__wrap}>
                    {(() => {
                        if (categoryIcon?.iconGruop === 'MaterialCommunityIcons') {
                            return <MaterialCommunityIcons name={categoryIcon.iconName} size={50} color={categoryIcon.iconColor} />
                        }
                        if (categoryIcon?.iconGruop === 'FontAwesome5') {
                            return <FontAwesome5 name={categoryIcon.iconName} size={50} color={categoryIcon.iconColor} />
                        }
                        if (categoryIcon?.iconGruop === 'Entypo') {
                            return <Entypo name={categoryIcon.iconName} size={50} color={categoryIcon.iconColor} />
                        }
                    })()}
                    <Text style={styles.category__title}>{categoryName}</Text>
                </View>
                <SafeAreaView>
                    <ScrollView style={styles.category__items}>
                        {postList?.map((post) => {
                            return (
                                <View style={styles.category__item} key={post.post_id}>
                                    <View style={styles.category__item__balloon}>
                                        <Text style={styles.category__item__title}>{OmitValue(post.title, 6)}</Text>
                                        <Text style={styles.category__item__content}>{OmitValue(post.content, 40)}</Text>
                                    </View>
                                    <View style={styles.category__item__triangle} />
                                    <View>
                                        <Ionicons name="person-outline" size={80} color="white" />
                                    </View>
                                    <Text style={styles.category__item__username}>{post.username}</Text>
                                </View>
                            )
                        })}
                    </ScrollView>
                </SafeAreaView>
            </View>
            <FooterMenu />
        </View>
    )
}

const styles = StyleSheet.create({
    category__wrap: {
        backgroundColor: '#ddcaaf',
        paddingTop: 50,
    },
    category__title__wrap: {
        flexDirection: 'row',
        justifyContent: 'center'
    },
    category__title: {
        fontSize: 50,
        fontWeight: 'bold',
        marginLeft: 20
    },
    category__items: {
        height: '70%',
        marginTop: 35
    },
    category__item: {
        alignItems: 'center',
        marginBottom: 40,
        justifyContent: 'center',
    },
    category__item__balloon: {
        marginVertical: 'auto',
        marginHorizontal: 'auto',
        padding: 24,
        backgroundColor: '#fff',
        borderRadius: 150,
        width: 210,
        height: 210,
        alignItems: 'center',
        overflow: 'hidden'
    },
    category__item__triangle: {
        borderTopColor: '#fff',
        borderRightColor: 'transparent',
        borderLeftColor: 'transparent',
        borderTopWidth: 60,
        borderRightWidth: 40,
        borderLeftWidth: 40,
        marginTop: -30,
    },
    category__item__title: {
        fontSize: 22,
        fontWeight: 'bold',
    },
    category__item__category: {
        marginTop: 10
    },
    category__item__content: {
        overflow: 'hidden',
        marginTop: 30,
    },
    category__item__username: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 10,
    },
})

export default Category;