import classes from './Alertbox.module.css';
import { useAlertBox } from '../contexts/AlertBoxContext';

function Alertbox() {
    const { alertMsg } = useAlertBox();

    if (!alertMsg) return ('');
    return (
        <div className={classes.Alertbox}><h3>{alertMsg}</h3></div>
    );
}

export default Alertbox;