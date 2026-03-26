import MainScreenContainer from '@/components/common/main-screen-container';
import BeersList from '@/components/menu/beers-list';

export default function Menu() {
    return (
        <MainScreenContainer title={`La carte`}>
            <BeersList />
        </MainScreenContainer>
    );
}
