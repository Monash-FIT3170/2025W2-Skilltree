import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import {
  NavbarToggle,
  NavbarLink,
  Dropdown,
  DropdownHeader,
  DropdownItem,
  DropdownDivider,
  Avatar
} from 'flowbite-react';
import { FaSignOutAlt } from 'react-icons/fa';
import { UserContext } from '/imports/utils/contexts/UserContext';

export const UserDropdownMenu = () => {
  const user = useContext(UserContext);
  const username = user?.username ?? '';
  const email = user?.emails?.[0].address ?? '';

  return (
    <div className="flex md:order-2">
      <Dropdown
        className="shadow-lg"
        arrowIcon={false}
        inline
        label={
          <Avatar
            className="hover:brightness-90 transition duration-200"
            alt="User Profile Picture"
            icon={
              <svg>
                <path d="M10 10a4 4 0 100-8 4 4 0 000 8zM2 16a6 6 0 1112 0H2z" />
              </svg>
            }
            rounded
          />
        }
      >
        <DropdownHeader className="p-4">
          <span className="block text-sm font-semibold">@{username}</span>
          <span className="block truncate text-sm text-gray-500">{email}</span>
        </DropdownHeader>
        <DropdownDivider />
        <DropdownItem as={Link} to="/dashboard">
          Dashboard
        </DropdownItem>
        <DropdownDivider />
        <DropdownItem onClick={() => Meteor.logout()}>
          Logout
          <FaSignOutAlt className="text-gray-400 ml-2" />
        </DropdownItem>
      </Dropdown>
      <NavbarToggle />
    </div>
  );
};
