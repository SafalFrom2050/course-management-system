import './Alertbox.css';
import {useAlertBox} from '../contexts/AlertBoxContext';

function alertbox(){
    const {alertMsg} = useAlertBox();

    if(!alertMsg) return('');
    return(
        <div className="alert-box"><h3>{alertMsg}</h3></div>
    );
}

export default alertbox;