import { SAssets } from 'servisofts-component'

import Logo, { ReactComponent as LogoW } from './svg/logo.svg';
import Billetera, { ReactComponent as BilleteraW } from './svg/billetera.svg';
import Fp, { ReactComponent as FpW } from './svg/fp.svg';
const Assets: SAssets = {
    svg: {
        "Logo": { Native: Logo, Web: LogoW },
        "Billetera": { Native: Billetera, Web: BilleteraW },
        "Fp": { Native: Fp, Web: FpW }
    }
}

export default Assets;