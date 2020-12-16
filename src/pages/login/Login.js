import './Login.css';
import './highlighters.css';
import './typography.css';
import Nav from './Nav';
import {useRef} from 'react';
import {useAuth} from '../../contexts/AuthContext';
import {useHistory} from 'react-router-dom';
import {useAlertBox} from '../../contexts/AlertBoxContext';


function login(){

    const history = useHistory();
    const {currentUser, login} = useAuth();

    // Not showing the login page if the user is already logged in!
    if(currentUser) history.push('/');
    
    const usernameRef = useRef();
    const passwordRef = useRef();

    const {showAlertBox} = useAlertBox();
    function authenticate(e){
        e.preventDefault();
        console.log("Authenticating User: " + usernameRef.current.value);

        login(usernameRef.current.value, passwordRef.current.value).then(()=>{
            console.log("Successful:  " + (currentUser? currentUser.username : ''))
            showAlertBox('You are logged in...')
            history.push('/');
        });
    };

    return(
        <div>
            <Nav></Nav>

            {/* <!-- Body section of login page -->
                <!-- Flex direction:row
                        Justify: Space-evenly --> */}
            <div className="main-container">

                {/* <!-- Heading 'Woodlands University College' -->
                        <!-- Flex direction:column --> */}

                <div className="first-half">
                    <div className="page-heading">
                        <h1>Woodlands</h1>
                        <h2>University</h2>
                        <h3>College</h3>
                    </div>
                </div>

                {/* <!-- Login Part -->
                        <!-- Flex direction:row --> */}
                <div className="second-half">
                    {/* <!-- Three rounded rectangles on left of login box --> */}
                    <div className="highlighters-container">
                        <div className="label-highlighter"></div>
                        <div className="input-highlighter"></div>
                        <div className="input-highlighter"></div>
                    </div>

                    {/* <!-- The main login box -->
                            <!-- Flex direction:column
                                Justify: flex-start --> */}
                    <div className="login-box">
                        <form className="login-form" onSubmit={authenticate}>
                            <h2>Login</h2>
                            <div className="username">
                                <label><h4>Username</h4> </label>
                                    <input type="text" name="username" id="username-input" ref={usernameRef}></input>
                            </div>
                            <div className="password">
                                <label><h4>Password</h4> </label>
                                    <input type="password" name="password" id="password-input" ref={passwordRef}></input>
                            </div>
                            <input type="submit" id="submit-input" value="Continue"></input>
                        </form>
                    </div>
                </div>
                
            </div>

        </div>
    );
}

export default login;