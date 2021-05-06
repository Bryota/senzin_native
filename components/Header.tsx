import React from 'react'
import { StyleSheet, ImageBackground, Text } from 'react-native'

const Header: React.FC = () => {
    const bgimg = require('../assets/bgimg.png');

    return (
        <ImageBackground source={bgimg} style={{width: '100%', height: 150}}>
            <Text style={styles.top_bgimg__title}>先人の知恵</Text>
        </ImageBackground>
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
})

export default Header;