const getCategoryIcon = (category_id: string) => {
    switch (category_id) {
        case '1':
            return "fas fa-utensils icon__food";
        case '2':
            return "fas fa-broom icon__clean";
        case '3':
            return "fas fa-plus-square icon__health";
        case '4':
            return "fas fa-running icon__sport";
        case '5':
            return "fas fa-tv icon__machine";
        case '6':
            return "fas fa-ellipsis-h icon__other";
        default:
            return;
        
    }
}

export default getCategoryIcon;