import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons'; 
import Header from './Header';
import FooterMenu from './FooterMenu';
import OmitValue from '../util/OmitValue';
import storage from '../util/Storage';

interface DataListType {
    mylist_id: number;
    post_id: number;
    user_id: number;
    post: {
        title: string;
        post_id: number;
        category_id: number;
        username: string;
        content: string;
        category: {
            category_id: number,
            category_name: string
        }
    }
}


const Mylist: React.FC = () => {
    const [postList, setPostList] = useState<DataListType[]>();
    const [userId, setUserId] = useState<number>();
    const navigation = useNavigation();
    useEffect(() => {
        storage.load({key: 'AUTH'})
        .then(res => setUserId(res.userId))
        .catch(_ => navigation.reset({
            index: 0,
            routes: [{ name: 'Login' }]
        }));
        axios.get(`http://senzin.site/api/getMylistData/${userId}`)
        .then((res) => {
            setPostList(res.data.data);
        })
    },[]);

    const handleLogout = () => {
        storage.remove({
            key: 'AUTH'
        });
        navigation.reset({
            index: 0,
            routes: [{ name: 'Login' }]
        })
    }

    const changeMylistPost = async(category_id: number) => {
        await axios.get(`http://senzin.site/api/getMylistDataFromCategoryId/${userId}/${category_id}`)
        .then((res) => {
            setPostList(res.data.data);
        })
    }
    return (
        <View style={styles.container}>
            <Header />
            <View style={styles.mylist__wrap}>
                <Text style={styles.mylist__title}>マイリスト</Text>
                <TouchableOpacity style={styles.mylist__logout__btn__wrap} onPress={handleLogout}>
                    <Text style={styles.mylist__logout__btn__text}>ログアウト</Text>
                </TouchableOpacity>
                <SafeAreaView>
                    <ScrollView style={styles.mylist__category__items} horizontal={true}>
                        <TouchableOpacity style={styles.mylist__category__item} onPress={() => changeMylistPost(1)}>
                            <MaterialCommunityIcons name="silverware-fork-knife" size={30} color="red" />
                            <Text style={styles.mylist__category__text}>食べ物</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.mylist__category__item} onPress={() => changeMylistPost(2)}>
                            <FontAwesome5 name="broom" size={30} color="green" />
                            <Text style={styles.mylist__category__text}>掃除</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.mylist__category__item} onPress={() => changeMylistPost(3)}>
                            <Entypo name="squared-plus" size={30} color="blue" />
                            <Text style={styles.mylist__category__text}>健康</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.mylist__category__item} onPress={() => changeMylistPost(4)}>
                            <FontAwesome5 name="running" size={30} color="orange" />
                            <Text style={styles.mylist__category__text}>スポーツ</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.mylist__category__item} onPress={() => changeMylistPost(5)}>
                            <Entypo name="tv" size={30} color="purple" />
                            <Text style={styles.mylist__category__text}>機械</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.mylist__category__item} onPress={() => changeMylistPost(6)}>
                            <Entypo name="dots-three-horizontal" size={30} color="black" />
                            <Text style={styles.mylist__category__text}>その他</Text>
                        </TouchableOpacity>
                    </ScrollView>
                </SafeAreaView>
                <SafeAreaView>
                    <ScrollView>
                        {postList?.map((post) => {
                            return (
                                <TouchableOpacity style={styles.mylist__item} key={post.post_id} onPress={() => { navigation.navigate('Single', { post_id: post.post_id}) }}>
                                    <View style={styles.mylist__item__balloon}>
                                        <Text style={styles.mylist__item__title}>{OmitValue(post.post.title, 6)}</Text>
                                        <Text style={styles.mylist__item__content}>{OmitValue(post.post.content, 40)}</Text>
                                    </View>
                                    <View style={styles.mylist__item__triangle} />
                                    <View>
                                        <Ionicons name="person-outline" size={80} color="white" />
                                    </View>
                                    <Text style={styles.mylist__item__username}>{post.post.username}</Text>
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
    mylist__wrap: {
        backgroundColor: '#ddcaaf',
        height: '83%',
        paddingTop: 20,
        paddingBottom: 40,
    },
    mylist__title: {
        fontSize: 40,
        fontWeight: 'bold',
        textAlign: 'center',
        marginRight: 'auto',
        marginLeft: 'auto',
        width: '70%'
    },
    mylist__logout__btn__wrap: {
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
        marginTop: 10,
        marginRight: 'auto',
        marginLeft: 'auto',
        width: '30%'
    },
    mylist__logout__btn__text: {
        color: 'red',
        textAlign: 'center',
        fontSize: 15,
        paddingTop: 15,
        paddingBottom: 15
    },
    mylist__category__items: {
        backgroundColor: '#fff',
        flexDirection: 'row',
        marginTop: 30
    },
    mylist__category__item: {
        flexDirection: 'row',
        paddingTop: 15,
        paddingBottom: 15,
        marginLeft: 15
    },
    mylist__category__text: {
        fontSize: 30
    },
    mylist__items: {
        height: '70%',
        marginTop: 35
    },
    mylist__item: {
        alignItems: 'center',
        marginTop: 30,
        marginBottom: 40,
        justifyContent: 'center',
    },
    mylist__item__balloon: {
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
    mylist__item__triangle: {
        borderTopColor: '#fff',
        borderRightColor: 'transparent',
        borderLeftColor: 'transparent',
        borderTopWidth: 60,
        borderRightWidth: 40,
        borderLeftWidth: 40,
        marginTop: -30,
    },
    mylist__item__title: {
        fontSize: 22,
        fontWeight: 'bold',
    },
    mylist__item__mylist: {
        marginTop: 10
    },
    mylist__item__content: {
        overflow: 'hidden',
        marginTop: 30,
    },
    mylist__item__username: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 10,
    },
})

export default Mylist;