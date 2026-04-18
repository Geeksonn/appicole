import { FlatList, Text, View } from 'react-native';
import Article, { ArticleProps } from './legal-articles';

type Props = {
    updated: string;
    articles: ArticleProps[];
};

const Legal: React.FC<Props> = ({ updated, articles }) => {
    return (
        <View className='p-4 my-4'>
            <Text className='italic font-light text-gray-400'>Mise à jour le {updated}</Text>
            <FlatList
                data={articles}
                renderItem={({ item }) => <Article {...item} />}
                keyExtractor={(item, index) => `article_${index}`}
                contentContainerClassName='pb-56'
            />
        </View>
    );
};

export default Legal;
