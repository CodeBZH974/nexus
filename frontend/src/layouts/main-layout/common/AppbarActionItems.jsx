import { Stack } from '@mui/material';
import LanguageMenu from './LanguageMenu';
import NotificationMenu from './NotificationMenu';
import ProfileMenu from './ProfileMenu';
import ThemeToggler from './ThemeToggler';

const AppbarActionItems = ({ type = 'default', sx, searchComponent }) => {
  return (
    <Stack
      className="action-items"
      spacing={1}
      sx={{
        alignItems: 'center',
        ml: 'auto',
        ...sx,
      }}
    >
      {searchComponent}
      <LanguageMenu type={type} />
      <ThemeToggler type={type} />
      <NotificationMenu type={type} />
      <ProfileMenu type={type} />
    </Stack>
  );
};

export default AppbarActionItems;
