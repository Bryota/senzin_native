import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useRoute, RouteProp } from '@react-navigation/native';
import axios from 'axios';
import { Ionicons } from '@expo/vector-icons'; 
import FooterMenu from './FooterMenu';
import Header from './Header';
import PostListType from '../util/PostListType'
import OmitValue from '../util/OmitValue';

type SearchParamList = {
    Search: { category: string, freeword: string }
}

type SearchRouteProps = RouteProp<SearchParamList, 'Search'>


const Result: React.FC = () => {
    const [postList, setPostList] = useState<PostListType[]>();
    const navigation = useNavigation();
    const route = useRoute<SearchRouteProps>()
    const searchData = {
        category_id: route.params.category,
        freeword: route.params.freeword
    }
    useEffect(() => {
        axios.post(`http://senzin.site/api/getResultPostData`, searchData)
        .then((res) => {
            setPostList(res.data.data);
        })
    },[])


    return (
        <View style={styles.container}>
            <Header />
            <View style={styles.result__ideas}>
                <View style={styles.result__ideas__title}>
                    <Text style={styles.result__ideas__title__text}>検索結果</Text>
                </View>
                <SafeAreaView>
                    <ScrollView>
                        {postList?.map((post) => {
                            return (
                                <TouchableOpacity style={styles.result__ideas__item} key={post.post_id} onPress={() => {navigation.navigate('Single', { post_id: post.post_id })}}>
                                    <View style={styles.result__ideas__item__balloon}>
                                        <Text style={styles.result__ideas__item__title}>{OmitValue(post.title, 6)}</Text>
                                        <Text style={styles.result__ideas__item__category}>{post.category.category_name}</Text>
                                        <Text style={styles.result__ideas__item__content}>{OmitValue(post.content, 40)}</Text>
                                    </View>
                                    <View style={styles.result__ideas__item__triangle} />
                                    <View>
                                        <Ionicons name="person-outline" size={80} color="white" />
                                    </View>
                                    <Text style={styles.result__ideas__item__username}>{post.username}</Text>
                                </TouchableOpacity>
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
    container: {
        flex: 1
    },
    result__bgimg__title:  {
        color: '#fff',
        fontSize: 50,
        fontWeight: 'bold',
        fontFamily: 'Palatino-Bold',
        textAlign: 'center',
        paddingTop: 50,
        paddingBottom: 10
    },
    result__ideas: {
        backgroundColor: '#ddcaaf',
        height: '82%',
        paddingTop: 50,
        paddingBottom: 50
    },
    result__ideas__title: {
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 50
    },
    result__ideas__title__text: {
        fontSize: 40,
        fontWeight: 'bold'
    },
    result__ideas__item: {
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 30
    },
    result__ideas__item__balloon: {
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
    result__ideas__item__triangle: {
        borderTopColor: '#fff',
        borderRightColor: 'transparent',
        borderLeftColor: 'transparent',
        borderTopWidth: 60,
        borderRightWidth: 40,
        borderLeftWidth: 40,
        marginTop: -30,
    },
    result__ideas__item__title: {
        fontSize: 22,
        fontWeight: 'bold',
    },
    result__ideas__item__category: {
        marginTop: 10
    },
    result__ideas__item__content: {
        overflow: 'hidden',
        marginTop: 30,
    },
    result__ideas__item__username: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 10,
    },
})

export default Result;