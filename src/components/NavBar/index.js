import { Link } from 'react-router-dom';
import './style.scss';
export default function NavBar() {
  //Only shows up if user is logged in
  //TODO: build an enclosure menu
  return (
    <nav>
      <ul>
        <li>
          <p>Username</p>
        </li>
        <li>
          <details>
            <summary>Menu</summary>
            <ul className='menu'>
              <li>Profile/User Settings</li>
              <li>Edit Links</li>
              <li>Edit Sections</li>
              <li>Logout</li>
            </ul>
          </details>
        </li>
      </ul>
    </nav>
  )
}