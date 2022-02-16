import { SAssets } from 'servisofts-component'

import Logo, { ReactComponent as LogoW } from './svg/logo.svg';
import Billetera, { ReactComponent as BilleteraW } from './svg/billetera.svg';
const Assets: SAssets = {
    svg: {
        "Logo": { Native: Logo, Web: LogoW },
        "Billetera": { Native: Billetera, Web: BilleteraW }
    }
}

export default Assets;