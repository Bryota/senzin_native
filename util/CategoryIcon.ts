interface IconItemsType {
    iconGruop: string,
    iconName: string,
    iconColor: string
}

const getCategoryIcon = (category_id: string) => {
    let iconItems: IconItemsType
    switch (category_id) {
        case '1':
            iconItems = { iconGruop: 'MaterialCommunityIcons', iconName: 'silverware-fork-knife', iconColor: 'red'}
            return iconItems
        case '2':
            iconItems = { iconGruop: 'FontAwesome5', iconName: 'broom', iconColor: 'green'}
            return iconItems
        case '3':
            iconItems = { iconGruop: 'Entypo', iconName: 'squared-plus', iconColor: 'blue'}
            return iconItems
        case '4':
            iconItems = { iconGruop: 'FontAwesome5', iconName: 'running', iconColor: 'orange'}
            return iconItems
        case '5':
            iconItems = { iconGruop: 'Entypo', iconName: 'tv', iconColor: 'purple'}
            return iconItems
        case '6':
            iconItems = { iconGruop: 'Entypo', iconName: 'dots-three-horizontal', iconColor: 'black'}
            return iconItems
        default:
            return;
        
    }
}

export default getCategoryIcon;