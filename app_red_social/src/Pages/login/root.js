import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SHr, SIcon, SNavigation, SPage, SPopup, SText, STheme, SView } from 'servisofts-component';
import { AccentBar, Container } from '../../Components';
import SectionApis from './components/SectionApis';
import SectionFooter from './components/SectionFooter';
import SectionForm from './components/SectionForm';
import SectionHeader from './components/SectionHeader';
import SectionRegister from './components/SectionRegister';

class login extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {

        return (
            <SPage center>
                <SView col={"xs-12"} center>
                    <SView col={"xs-12"}>
                        <Container>
                            {/* <SHr height={8} /> */}
                            <SectionHeader />
                            <SHr height={16} />
                        </Container>
                    </SView>
                    <Container>
                        <SHr height={16} />
                        <SectionForm ref={ref => this._sectionForm = ref} />
                        <SHr height={25} /> 
                        <SectionFooter onPress={() => {
                            this._sectionForm.submit();
                        }} />
                        <SHr height={55} />
                        <SectionApis/>
                        <SHr height={35} />
                        <SectionRegister/>
                        <SHr height={50} />
                    </Container>
                </SView>
            </SPage>
        );
    }
}
const initStates = (state) => {
    return { state }
};
export default connect(initStates)(login);