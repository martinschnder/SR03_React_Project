import "./styles/login.css"

function Login() {
    return (
        <div className="text-center">
            <div className="logo">connexion</div>
            <div className="login-form-1">
                <form id="login-form" className="text-left">
                    <div className="login-form-main-message"></div>
                    <div className="main-login-form">
                        <div className="login-group">
                            <div className="form-group">
                                <input type="text" className="form-control" id="lg_username" name="lg_username" placeholder="username" />
                            </div>
                            <div className="form-group">
                                <input type="password" className="form-control" id="lg_password" name="lg_password" placeholder="password" />
                            </div>
                        </div>
                        <button type="submit" className="login-button"><i className="chevron">&gt;</i></button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;