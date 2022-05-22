import './styles/navbar.css';
// import { ReactComponent as SettingsLogo } from '../settings.svg';

function Navbar() {
    return (
        <nav id="sidebar">
            <div class="sidebar-header">
                <h3>Matterleast</h3>
            </div>
            <div class="content">
                <ul>
                    <li>ALL CHANNELS
                        <ul>
                            <li>Channel 1</li>
                            <li>Channel 2</li>
                            <li>Channel 3</li>
                        </ul>
                    </li>
                </ul>
            </div>



            <div class="sidebar-footer">
                <div class='user_infos_container'>
                    <h4>Martin Schneider</h4>
                    <h5>martin.schneider2001@gmail.com</h5>
                </div>
                {/* <SettingsLogo /> */}
            </div>
        </nav>
    );
}

export default Navbar;

