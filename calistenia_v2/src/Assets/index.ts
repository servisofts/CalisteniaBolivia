import { SAssets } from 'servisofts-component'

import Logo, { ReactComponent as LogoW } from './svg/logo.svg';
import LogoClean, { ReactComponent as LogoCleanW } from './svg/logoclean.svg';
import Billetera, { ReactComponent as BilleteraW } from './svg/billetera.svg';
import Fp, { ReactComponent as FpW } from './svg/fp.svg';
import Heart, { ReactComponent as HeartW } from './svg/Heart.svg';
import Comment, { ReactComponent as CommentW } from './svg/Comment.svg';
import Add, { ReactComponent as AddW } from './svg/add.svg';
import Chat, { ReactComponent as ChatW } from './svg/chat.svg';
import Profile, { ReactComponent as ProfileW } from './svg/Profile.svg';
import Bag, { ReactComponent as BagW } from './svg/Bag.svg';
import Search, { ReactComponent as SearchW } from './svg/Search.svg';
import Home, { ReactComponent as HomeW } from './svg/Home.svg';
const Assets: SAssets = {
    svg: {
        "Logo": { Native: Logo, Web: LogoW },
        "Billetera": { Native: Billetera, Web: BilleteraW },
        "Fp": { Native: Fp, Web: FpW },
        "Heart": { Native: Heart, Web: HeartW },
        "Comment": { Native: Comment, Web: CommentW },
        "LogoClean": { Native: LogoClean, Web: LogoCleanW },
        "Add2": { Native: Add, Web: AddW },
        "Chat": { Native: Chat, Web: ChatW },
        "Profile": { Native: Profile, Web: ProfileW },
        "Bag": { Native: Bag, Web: BagW },
        "Search2": { Native: Search, Web: SearchW },
        "Home": { Native: Home, Web: HomeW },
    }
}

export default Assets;