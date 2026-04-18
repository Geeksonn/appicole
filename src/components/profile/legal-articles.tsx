import { Text } from 'react-native';

export type ArticleProps = {
    title: string;
    article: string;
};

const Article: React.FunctionComponent<ArticleProps> = ({ title, article }) => {
    return (
        <>
            <Text className='mt-6 font-semibold text-accent-green'>{title}</Text>
            <Text className='mt-2 text-accent-green last:mb-4'>{article}</Text>
        </>
    );
};

export default Article;
