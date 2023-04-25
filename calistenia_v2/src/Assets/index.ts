import { SAssets } from "servisofts-component";

import Bag, { ReactComponent as BagW } from "./svg/Bag.svg";
import Comment, { ReactComponent as CommentW } from "./svg/Comment.svg";
import HbCake1, { ReactComponent as HbCake1W } from "./svg/HbCake1.svg";
import HbFooterLeft1, {
  ReactComponent as HbFooterLeft1W,
} from "./svg/HbFooterLeft1.svg";
import HbFooterRight1, {
  ReactComponent as HbFooterRight1W,
} from "./svg/HbFooterRight1.svg";
import HbHeaderLeft1, {
  ReactComponent as HbHeaderLeft1W,
} from "./svg/HbHeaderLeft1.svg";
import HbHeaderRight1, {
  ReactComponent as HbHeaderRight1W,
} from "./svg/HbHeaderRight1.svg";
import Heart, { ReactComponent as HeartW } from "./svg/Heart.svg";
import Home, { ReactComponent as HomeW } from "./svg/Home.svg";
import Profile, { ReactComponent as ProfileW } from "./svg/Profile.svg";
import Search, { ReactComponent as SearchW } from "./svg/Search.svg";
import Add, { ReactComponent as AddW } from "./svg/add.svg";
import Billetera, { ReactComponent as BilleteraW } from "./svg/billetera.svg";
import Chat, { ReactComponent as ChatW } from "./svg/chat.svg";
import Fp, { ReactComponent as FpW } from "./svg/fp.svg";
import Logo, { ReactComponent as LogoW } from "./svg/logo.svg";
import LogoClean, { ReactComponent as LogoCleanW } from "./svg/logoclean.svg";
import Pdf, { ReactComponent as PdfW } from "./svg/pdf.svg";
const Assets: SAssets = {
  svg: {
    Logo: { Native: Logo, Web: LogoW },
    Billetera: { Native: Billetera, Web: BilleteraW },
    Fp: { Native: Fp, Web: FpW },
    Heart: { Native: Heart, Web: HeartW },
    Comment: { Native: Comment, Web: CommentW },
    LogoClean: { Native: LogoClean, Web: LogoCleanW },
    Add2: { Native: Add, Web: AddW },
    Chat: { Native: Chat, Web: ChatW },
    Profile: { Native: Profile, Web: ProfileW },
    Bag: { Native: Bag, Web: BagW },
    Search2: { Native: Search, Web: SearchW },
    Home: { Native: Home, Web: HomeW },
    Pdf: { Native: Pdf, Web: PdfW },
    HbCake1: { Native: HbCake1, Web: HbCake1W },
    HbFooterLeft1: { Native: HbFooterLeft1, Web: HbFooterLeft1W },
    HbFooterRight1: { Native: HbFooterRight1, Web: HbFooterRight1W },
    HbHeaderLeft1: { Native: HbHeaderLeft1, Web: HbHeaderLeft1W },
    HbHeaderRight1: { Native: HbHeaderRight1, Web: HbHeaderRight1W },
    // HbHeaderRight1: { Native: HbHeaderRight1, Web: HbHeaderRight1W },
  },
};

export default Assets;
