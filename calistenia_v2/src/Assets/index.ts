import { SAssets } from 'servisofts-component';

import Bag, { ReactComponent as BagW } from './svg/Bag.svg';
import Comment, { ReactComponent as CommentW } from './svg/Comment.svg';
import HbCake, { ReactComponent as HbCakeW } from './svg/HbCake.svg';
import Heart, { ReactComponent as HeartW } from './svg/Heart.svg';
import Home, { ReactComponent as HomeW } from './svg/Home.svg';
import Profile, { ReactComponent as ProfileW } from './svg/Profile.svg';
import Search, { ReactComponent as SearchW } from './svg/Search.svg';
import Add, { ReactComponent as AddW } from './svg/add.svg';
import Billetera, { ReactComponent as BilleteraW } from './svg/billetera.svg';
import Chat, { ReactComponent as ChatW } from './svg/chat.svg';
import Fp, { ReactComponent as FpW } from './svg/fp.svg';
import Hb_footer_left, { ReactComponent as Hb_footer_leftW } from './svg/hb_footer_left.svg';
import Hb_footer_right, { ReactComponent as Hb_footer_rightW } from './svg/hb_footer_right.svg';
import Hb_header_left, { ReactComponent as Hb_header_leftW } from './svg/hb_header_left.svg';
import Hb_header_right, { ReactComponent as Hb_header_rightW } from './svg/hb_header_right.svg';
import Logo, { ReactComponent as LogoW } from './svg/logo.svg';
import LogoClean, { ReactComponent as LogoCleanW } from './svg/logoclean.svg';
import Pdf, { ReactComponent as PdfW } from './svg/pdf.svg';
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
    "Pdf": { Native: Pdf, Web: PdfW },
    "HbCake": { Native: HbCake, Web: HbCakeW },
    "Hb_footer_left": { Native: Hb_footer_left, Web: Hb_footer_leftW },
    "Hb_footer_right": { Native: Hb_footer_right, Web: Hb_footer_rightW },
    "Hb_header_left": { Native: Hb_header_left, Web: Hb_header_leftW },
    "Hb_header_right": { Native: Hb_header_right, Web: Hb_header_rightW },
  }
}

export default Assets;