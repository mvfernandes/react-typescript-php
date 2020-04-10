import React from 'react';
import HomeIcon from '@material-ui/icons/Home';
import PersonIcon from '@material-ui/icons/Person';
import AppsRoundedIcon from '@material-ui/icons/AppsRounded';
import SettingsIcon from '@material-ui/icons/Settings';


interface IIconesProps {
    icone: string;
}

const objectIcons = (i: string) => {

    switch (i) {
        case 'home':
            return <HomeIcon />;
        case 'user':
            return <PersonIcon />;
        case 'settings':
            return <SettingsIcon />;


        default: return <AppsRoundedIcon />;
    }
};

const Icones: React.FC<IIconesProps> = ({ icone }) => (
    <>
        {
            objectIcons(icone)
        }
    </>
)


export default React.memo(Icones)