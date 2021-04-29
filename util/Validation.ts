const Validation = (value: string, validationFlg: React.Dispatch<React.SetStateAction<boolean>>) => {
    if (value) {
        validationFlg(false);
    } else {
        validationFlg(true);
    }
}

export default Validation;