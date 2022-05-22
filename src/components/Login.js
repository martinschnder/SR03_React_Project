import "./styles/login.css"

function Login() {
    return (
        <div class="text-center">
            <div class="logo">connexion</div>
            <div class="login-form-1">
                <form id="login-form" class="text-left">
                    <div class="login-form-main-message"></div>
                    <div class="main-login-form">
                        <div class="login-group">
                            <div class="form-group">
                                <input type="text" class="form-control" id="lg_username" name="lg_username" placeholder="username" />
                            </div>
                            <div class="form-group">
                                <input type="password" class="form-control" id="lg_password" name="lg_password" placeholder="password" />
                            </div>
                        </div>
                        <button type="submit" class="login-button"><i class="chevron">&gt;</i></button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;