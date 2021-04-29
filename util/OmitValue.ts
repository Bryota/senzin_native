const OmitValue = (value: string, maxLength: number) => {
    const maxLength_char = maxLength;
    if (value.length > maxLength_char) {
        return value.substr(0, maxLength_char) + '...';
    }
    return value;
}

export default OmitValue;