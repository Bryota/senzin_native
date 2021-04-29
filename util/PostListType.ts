interface PostListType {
    post_id: number;
    title: string;
    category_id: number;
    username: string;
    content: string;
    category: {
        category_id: number,
        category_name: string
    }
}

export default PostListType;