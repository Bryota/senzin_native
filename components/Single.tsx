import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, SafeAreaView } from 'react-native';
import { useRoute, RouteProp } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import axios from 'axios'
import FooterMenu from './FooterMenu';
import Header from './Header';
import getCategoryIcon from '../util/CategoryIcon';
import PostListType from '../util/PostListType';

type CategoryParamList = {
    Single: { post_id: number}
}

type SingleRouteProps = RouteProp<CategoryParamList, 'Single'>

interface IconItemsType {
    iconGruop: string,
    iconName: string,
    iconColor: string
}

const Single: React.FC = () => {
    const [postData, setPostData] = useState<PostListType>();
    const [categoryIcon, setCategoryIcon] = useState<IconItemsType>();
    const route = useRoute<SingleRouteProps>();
    const postId = route.params.post_id;

    useEffect(() => {
        axios.get(`http://senzin.site/api/getSinglePostData/${postId}`)
        .then((res) => {
            setPostData(res.data)
            setCategoryIcon(getCategoryIcon(res.data.category_id.toString()));
        });
        // if (cookies.loginState) {
        //     setCanSetMylist(true);
        // }
        // axios.get(`/api/checkMylistData/${cookies.userId}/${id.id}`)
        // .then((res) => {
        //     if (res.data === "saved") {
        //         setCanSetMylist(false);
        //     }
        // })
    },[postId]);

    return (
        <View>
            <Header />
            <View style={styles.single__wrap}>
                <Text style={styles.single__title}>{postData?.title}</Text>
                <Text style={styles.single__username}>{postData?.username}</Text>
                <Text style={styles.single__category}>
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
                    <Text style={styles.single__category__text}>{postData?.category.category_name}</Text>
                </Text>
                <SafeAreaView>
                    <ScrollView>
                        <Text style={styles.single__content}>{postData?.content}</Text>
                    </ScrollView>
                </SafeAreaView>
                <View style={styles.single__addmylist__btn__wrap}>
                    <Text style={styles.single__addmylist__btn__text}>マイリストに追加</Text>
                </View>
                <View style={styles.single__back__btn__wrap}>
                    <Text style={styles.single__back__btn__text}>戻る</Text>
                </View>
            </View>
            <FooterMenu />
        </View>
    )
}

const styles = StyleSheet.create({
    single__wrap: {
        backgroundColor: '#ddcaaf',
        height: '82%',
        paddingTop: 30,
    },
    single__title: {
        fontSize: 40,
        fontWeight: 'bold',
        textAlign: 'center',
        marginRight: 'auto',
        marginLeft: 'auto',
        width: '70%'
    },
    single__username: {
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 20
    },
    single__category: {
        textAlign: 'center',
        marginTop: 30
    },
    single__category__text: {
        fontSize: 40,
        fontWeight: 'bold'
    },
    single__content: {
        fontSize: 18,
        lineHeight: 25,
        height: 130,
        marginTop: 50,
        marginRight: 'auto',
        marginLeft: 'auto',
        width: '70%'
    },
    single__addmylist__btn__wrap: {
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
        marginTop: 60,
        marginRight: 'auto',
        marginLeft: 'auto',
        width: '50%'
    },
    single__addmylist__btn__text: {
        color: '#6f6152',
        textAlign: 'center',
        fontSize: 18,
        paddingTop: 15,
        paddingBottom: 15
    },
    single__back__btn__wrap: {
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
        marginTop: 30,
        marginRight: 'auto',
        marginLeft: 'auto',
        width: '50%'
    },
    single__back__btn__text: {
        color: '#6f6152',
        textAlign: 'center',
        fontSize: 18,
        paddingTop: 15,
        paddingBottom: 15
    }
})

export default Single;