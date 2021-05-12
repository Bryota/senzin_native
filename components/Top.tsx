import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import axios from 'axios';
import Slick from 'react-native-slick';
import { Ionicons } from '@expo/vector-icons'; 
import FooterMenu from './FooterMenu';
import Header from './Header';
import PostListType from '../util/PostListType'
import OmitValue from '../util/OmitValue';


const Top: React.FC = () => {
    const [postList, setPostList] = useState<PostListType[]>();

    useEffect(() => {
        axios.get(`http://senzin.site/api/getPostData`)
        .then((res) => {
            setPostList(res.data);
        })
    },[])

    return (
        <View>
            <Header />
            {/* <View style={styles.top_ideas}>
                <View style={styles.top_ideas__title}>
                    <Text style={styles.top_ideas__title__text}>投稿一覧</Text>
                </View>
                <Slick style={styles.top_ideas__items} autoplay={true} autoplayTimeout={2} dotStyle={{display: 'none'}} activeDotStyle={{display: 'none'}}>
                    {postList?.map((post) => {
                        return (
                            <View style={styles.top_ideas__item} key={post.post_id}>
                                <View style={styles.top_ideas__item__balloon}>
                                    <Text style={styles.top_ideas__item__title}>{OmitValue(post.title, 6)}</Text>
                                    <Text style={styles.top_ideas__item__category}>{post.category.category_name}</Text>
                                    <Text style={styles.top_ideas__item__content}>{OmitValue(post.content, 40)}</Text>
                                </View>
                                <View style={styles.top_ideas__item__triangle} />
                                <View>
                                    <Ionicons name="person-outline" size={80} color="white" />
                                </View>
                                <Text style={styles.top_ideas__item__username}>{post.username}</Text>
                            </View>
                        )
                    })}
                </Slick>
            </View> */}
            <FooterMenu />
        </View>
    )
}

const styles = StyleSheet.create({
    top_bgimg__title:  {
        color: '#fff',
        fontSize: 50,
        fontWeight: 'bold',
        fontFamily: 'Palatino-Bold',
        textAlign: 'center',
        paddingTop: 50,
        paddingBottom: 10
    },
    top_ideas: {
        backgroundColor: '#ddcaaf',
        height: '82%',
        paddingTop: 50,
        paddingBottom: 50
    },
    top_ideas__title: {
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 50
    },
    top_ideas__title__text: {
        fontSize: 40,
        fontWeight: 'bold'
    },
    top_ideas__items: {
    },
    top_ideas__item: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    top_ideas__item__balloon: {
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
    top_ideas__item__triangle: {
        borderTopColor: '#fff',
        borderRightColor: 'transparent',
        borderLeftColor: 'transparent',
        borderTopWidth: 60,
        borderRightWidth: 40,
        borderLeftWidth: 40,
        marginTop: -30,
    },
    top_ideas__item__title: {
        fontSize: 22,
        fontWeight: 'bold',
    },
    top_ideas__item__category: {
        marginTop: 10
    },
    top_ideas__item__content: {
        overflow: 'hidden',
        marginTop: 30,
    },
    top_ideas__item__username: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 10,
    },
})

export default Top;