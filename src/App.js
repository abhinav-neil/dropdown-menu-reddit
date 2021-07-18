import './index.css';
import { ReactComponent as BellIcon } from './icons/bell.svg';
import { ReactComponent as CaretIcon } from './icons/caret.svg';
import { ReactComponent as PlusIcon } from './icons/plus.svg';
import { ReactComponent as CogIcon } from './icons/cog.svg';
import { ReactComponent as RedditIcon } from './icons/reddit.svg';
import { ReactComponent as HomeIcon } from './icons/home.svg';
import { ReactComponent as CommentIcon } from './icons/comment-dots.svg';
import { ReactComponent as ProfileIcon } from './icons/profile.svg';
import { ReactComponent as DotIcon } from './icons/dot.svg';
import { ReactComponent as ChevronRightIcon } from './icons/chevron-right.svg';
import { ReactComponent as ChevronLeftIcon } from './icons/chevron-left.svg';

import React, { useState, useEffect, useRef } from 'react';
import { CSSTransition } from 'react-transition-group';

function App() {
  return (
    <Navbar>
      <NavItem icon={<RedditIcon />}/>
      <NavItem icon={<HomeIcon />} />
      <NavItem icon={<CommentIcon />} />
      <NavItem icon={<BellIcon />} />
      <NavItem icon={<PlusIcon />} />
      <NavItem id={'dropdown'} icon={<CaretIcon />}>
        <DropdownMenu></DropdownMenu>
      </NavItem>
    </Navbar>
  );
}

function Navbar(props) {
  return (
    <nav className="navbar">
      <ul className="navbar-nav">{props.children}</ul>
    </nav>
  );
}

function NavItem(props) {
  const [open, setOpen] = useState(false);

  return (
    <li className="nav-item">
      <a href="/#" className="icon-button icon-nav" id={props.id} onClick={() => setOpen(!open)}>
        {props.icon}
      </a>

      {open && props.children}
    </li>
  );
}

function DropdownMenu() {
  const [activeMenu, setActiveMenu] = useState('main');
  const [menuHeight, setMenuHeight] = useState(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    setMenuHeight(dropdownRef.current?.firstChild.offsetHeight)
  }, [])

  function calcHeight(el) {
    const height = el.offsetHeight;
    setMenuHeight(height);
  }

  function DropdownItem(props) {
    return (
      <a href="/#" className="menu-item" onClick={() => props.goToMenu && setActiveMenu(props.goToMenu)}>
        <span className="icon-button icon-left">{props.leftIcon}</span>
        {props.children}
        <span className="icon-button icon-right">{props.rightIcon}</span>
      </a>
    );
  }

  return (
    <div className="dropdown" style={{ height: menuHeight }} ref={dropdownRef}>

      <CSSTransition
        in={activeMenu === 'main'}
        timeout={500}
        classNames="menu-primary"
        unmountOnExit
        onEnter={calcHeight}>
        <div className="menu">
          <DropdownItem
            leftIcon={<DotIcon/>}
            rightIcon={
              <div>
                <label className="switch">
                  <input type="checkbox"/>
                  <span className="slider"></span>
                </label>
              </div>
            }>               
            Online Status</DropdownItem>
          <DropdownItem
            leftIcon={<ProfileIcon />}>
            Profile
          </DropdownItem>
          <DropdownItem
            leftIcon={<CogIcon />}
            rightIcon={<ChevronRightIcon />}
            goToMenu="settings">
            User Settings
          </DropdownItem>
          {/* <DropdownItem
            leftIcon="🦧"
            rightIcon={<ChevronRightIcon />}
            goToMenu="animals">
            Animals
          </DropdownItem> */}

        </div>
      </CSSTransition>

      <CSSTransition
        in={activeMenu === 'settings'}
        timeout={500}
        classNames="menu-secondary"
        unmountOnExit
        onEnter={calcHeight}>
        <div className="menu">
          <DropdownItem goToMenu="main" leftIcon={<ChevronLeftIcon />}>Main Menu</DropdownItem>
          <DropdownItem leftIcon={<CogIcon />}>Account</DropdownItem>
          <DropdownItem leftIcon={<CogIcon />}>Feed</DropdownItem>
          <DropdownItem leftIcon={<CogIcon />}>Notifications</DropdownItem>
          <DropdownItem leftIcon={<CogIcon />}>Safety & Privacy</DropdownItem>
        </div>
      </CSSTransition>

    </div>
  );
}

export default App;
