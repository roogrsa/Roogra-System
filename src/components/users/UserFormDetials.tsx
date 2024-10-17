import React, { useState } from 'react';
import useUser from '../../hooks/useGetUser';
import ReusableInput from '../products/ReusableInput';
import ReusableSelect from '../products/ReusableSelectProps';
import { useTranslation } from 'react-i18next';

//
interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  telephone: string;
  type: 'advertiser' | 'customer';
  isActivated: {
    account: boolean;
    email: boolean;
  };
  status: number; // Status of the account (e.g., 1 = Active)
  isBanned: boolean;
  ban_reason: string;
  regDate: string; // Registration date in "YYYY-MM-DD HH:MM:SS" format
  address: string;
  countery_id: number | null;
  bio: string;
  rating: number;
  image: string;
  alias: string;
}

interface ProfileAccordionProps {
  user: User;
  loading: boolean;
  error: string | null;
}

const UserForm: React.FC<ProfileAccordionProps> = ({
  user,
  loading,
  error,
}) => {
  const handleInputChange = (field: string, value: string | number) => {
    // Handle input change for user fields
    console.log(field, value);
    // Update the state of the user data accordingly
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!user) {
    return <p>No user found.</p>;
  }
  //
  const { t } = useTranslation();
  return (
    <div className="my-3  bg-secondaryBG-light dark:bg-secondaryBG-dark p-6 ">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-y-10">
        {/* ID */}
        <ReusableInput
          label={t('profile.id')}
          type="text"
          value={user.id}
          onChange={(e) => handleInputChange('id', e.target.value)}
          extraClass="bg-Input-gray w-40"
        />
        <ReusableSelect
          label="Type"
          value={user.type}
          options={[
            { value: 'advertiser', label: 'advertiser' },
            { value: 'customer', label: 'customer' },
          ]}
          onChange={(e) => handleInputChange('Type', e.target.value)}
          extraClass="bg-Input-blue text-Input-TextBlue  w-40 "
        />

        {/* Username */}
        <ReusableInput
          label="Username"
          type="text"
          value={user.name}
          onChange={(e) => handleInputChange('name', e.target.value)}
          extraClass="bg-Input-blue  w-40"
        />

        {/* Alias */}
        <ReusableInput
          label="Alias"
          type="text"
          value={user.alias}
          onChange={(e) => handleInputChange('alias', e.target.value)}
          extraClass="bg-Input-blue  w-40"
        />
        {/* Phone */}
        <ReusableInput
          label="Phone"
          type="tel"
          value={user.phone}
          onChange={(e) => handleInputChange('phone', e.target.value)}
          extraClass="bg-Input-blue  w-40"
        />
        {/* Phone Activation */}
        <ReusableSelect
          label="Phone Activation"
          value={user.isActivated.account ? '1' : '0'}
          options={[
            { value: '1', label: 'Activated' },
            { value: '0', label: 'Deactivated' },
          ]}
          onChange={(e) =>
            handleInputChange('accountActivation', e.target.value)
          }
          extraClass="bg-Input-green text-Input-TextGreen  w-40 "
        />
        {/* Status
        <ReusableSelect
          label="Status"
          value={user.status.toString()}
          options={[
            { value: '1', label: 'Active' },
            { value: '0', label: 'Inactive' },
          ]}
          onChange={(e) => handleInputChange('status', e.target.value)}
          extraClass="bg-Input-green text-Input-TextGreen "
        /> */}
        {/* Registration Date */}
        <ReusableInput
          label="Registration Date"
          type="text"
          value={user.regDate}
          onChange={(e) => handleInputChange('regDate', e.target.value)}
          extraClass="bg-Input-gray w-40"
        />
        {/* Country */}
        <ReusableInput
          label="Country"
          type="text"
          value={user.address}
          onChange={(e) => handleInputChange('country', e.target.value)}
          extraClass="bg-Input-gray  w-40"
        />

        {/* Email */}
        <ReusableInput
          label="Email"
          type="email"
          value={user.email}
          onChange={(e) => handleInputChange('email', e.target.value)}
          extraClass="bg-Input-blue  w-40"
        />
        {/* Email Activation */}
        <ReusableSelect
          label="Email Activation"
          value={user.isActivated.email ? '1' : '0'}
          options={[
            { value: '1', label: 'Activated' },
            { value: '0', label: 'Deactivated' },
          ]}
          onChange={(e) => handleInputChange('emailActivation', e.target.value)}
          extraClass="bg-Input-red text-Input-TextRed  w-40"
        />
      </div>
    </div>
  );
};

export default UserForm;
