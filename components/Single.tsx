import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import { useRoute, RouteProp } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios'
import FooterMenu from './FooterMenu';
import Header from './Header';
import getCategoryIcon from '../util/CategoryIcon';
import PostListType from '../util/PostListType';
import storage from '../util/Storage';

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
    const [userId, setUserId] = useState<number>();
    const [canSetMylist, setCanSetMylist] = useState<boolean>(false);
    const route = useRoute<SingleRouteProps>();
    const postId = route.params.post_id;
    const navigation = useNavigation();
    useEffect(() => {
        axios.get(`http://senzin.site/api/getSinglePostData/${postId}`)
        .then((res) => {
            setPostData(res.data)
            setCategoryIcon(getCategoryIcon(res.data.category_id.toString()));
        });
        storage.load({ key: 'AUTH' })
        .then((res) => {
            setUserId(res.userId);
            axios.get(`http://senzin.site/api/checkMylistData/${userId}/${postId}`)
            .then((res) => {
                if (res.data === "saved") {
                    setCanSetMylist(false);
                } else {
                    setCanSetMylist(true);
                }
            })
        });
    },[postId,canSetMylist]);

    const sendMylistDataToDB = () => {
        axios.post('http://senzin.site/api/setMylistData', {
            postId: postId,
            userId: userId
        })
        .then(() => {
            setCanSetMylist(false);
        })
    }

    return (
        <View style={styles.container}>
            <Header />
            <View style={styles.single__wrap}>
                <Text style={styles.single__title}>{postData?.title}</Text>
                <Text style={styles.single__username}>{postData?.username}</Text>
                <Text style={styles.single__category}>
                {(() => {
                        if (categoryIcon?.iconGruop === 'MaterialCommunityIcons') {
                            return <MaterialCommunityIcons name={categoryIcon.iconName} size={20} color={categoryIcon.iconColor} />
                        }
                        if (categoryIcon?.iconGruop === 'FontAwesome5') {
                            return <FontAwesome5 name={categoryIcon.iconName} size={20} color={categoryIcon.iconColor} />
                        }
                        if (categoryIcon?.iconGruop === 'Entypo') {
                            return <Entypo name={categoryIcon.iconName} size={20} color={categoryIcon.iconColor} />
                        }
                    })()}
                    <Text style={styles.single__category__text}>{postData?.category.category_name}</Text>
                </Text>
                <SafeAreaView>
                    <ScrollView>
                        <Text style={styles.single__content}>{postData?.content}</Text>
                    </ScrollView>
                </SafeAreaView>
                {canSetMylist ?
                <View style={styles.single__addmylist__btn}>
                    <TouchableOpacity style={styles.single__addmylist__btn__wrap} onPress={sendMylistDataToDB}>
                        <Text style={styles.single__addmylist__btn__text}>????????????????????????</Text>
                    </TouchableOpacity>
                </View>
                :
                <View style={styles.single__addmylist__btn}>
                    <TouchableOpacity style={styles.single__addmylist__btn__wrap__disable} disabled={true}>
                        <Text style={styles.single__addmylist__btn__text}>????????????????????????</Text>
                    </TouchableOpacity>
                </View>
                }
                <View style={styles.single__back__btn}>
                    <TouchableOpacity style={styles.single__back__btn__wrap} onPress={() => navigation.goBack()}>
                        <Text style={styles.single__back__btn__text}>??????</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <FooterMenu />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    single__wrap: {
        backgroundColor: '#ddcaaf',
        height: '82%',
        paddingTop: 30,
    },
    single__title: {
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
        marginRight: 'auto',
        marginLeft: 'auto',
        width: '70%'
    },
    single__username: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 20
    },
    single__category: {
        textAlign: 'center',
        marginTop: 20
    },
    single__category__text: {
        fontSize: 30,
        fontWeight: 'bold'
    },
    single__content: {
        fontSize: 18,
        lineHeight: 20,
        height: 170,
        marginTop: 20,
        marginRight: 'auto',
        marginLeft: 'auto',
        width: '70%'
    },
    single__addmylist__btn: {
        alignItems: 'center',
        bottom: 120,
        left: 0,
        right: 0,
        position: 'absolute',
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
        width: '50%'
    },
    single__addmylist__btn__wrap__disable: {
        textAlign: 'center',
        backgroundColor: '#eee',
        borderRadius: 30,
        width: '50%',
    },
    single__addmylist__btn__text: {
        color: '#6f6152',
        textAlign: 'center',
        fontSize: 18,
        paddingTop: 15,
        paddingBottom: 15,
    },
    single__back__btn: {
        alignItems: 'center',
        bottom: 50,
        left: 0,
        right: 0,
        position: 'absolute',
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