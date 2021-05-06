import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import Slick from 'react-native-slick';
import axios from 'axios';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons'; 
import Header from './Header';
import FooterMenu from './FooterMenu';
import PostListType from '../util/PostListType';
import OmitValue from '../util/OmitValue';


const Category: React.FC = () => {
    const [categoryId, setCategoryId] = useState(1);
    const [categoryIcon, setCategoryIcon] = useState<string>();
    const [categoryName, setCategoryName] = useState<string>();
    const [postList, setPostList] = useState<PostListType[]>();

    useEffect(() => {
        axios.get(`http://senzin.site/api/getCategoryName/1`)
        .then((res) => {
            setCategoryName(res.data.category_name);
        });
        axios.get(`http://senzin.site/api/getPostDataInCategory/1`)
        .then((res) => {
            setPostList(res.data.data);
        });
    },[]);

    return (
        <View>
            <Header />
            <View style={styles.category__wrap}>
                <View style={styles.category__title__wrap}>
                    <MaterialCommunityIcons name="silverware-fork-knife" size={50} color="red" />
                    <Text style={styles.category__title}>{categoryName}</Text>
                </View>
                <Slick style={styles.category__items} autoplay={true} autoplayTimeout={2} dotStyle={{display: 'none'}} activeDotStyle={{display: 'none'}}>
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
                </Slick>
            </View>
            <FooterMenu />
        </View>
    )
}

const styles = StyleSheet.create({
    category__wrap: {
        backgroundColor: '#ddcaaf',
        paddingTop: 50,
        paddingBottom: 100
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
        marginTop: 60
    },
    category__item: {
        alignItems: 'center',
        justifyContent: 'center'
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