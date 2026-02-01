import MainScreenContainer from '@/components/common/main-screen-container';
import BeersList from '@/components/menu/beers-list';
import { beers$ as _beers$ } from '@/lib/SupaLegend';

export default function Menu() {
    return (
        <MainScreenContainer title={`La carte`}>
            <BeersList beers$={_beers$} />
        </MainScreenContainer>
    );
}
