import 'simplebar-react/dist/simplebar.min.css';

const simplebar = (theme) => ({
  '& .simplebar-track': {
    '&.simplebar-vertical, &.simplebar-horizontal': {
      '& .simplebar-scrollbar': {
        '&:before': {
          backgroundColor: theme.vars.palette.background.elevation4,
        },
        '&.simplebar-visible': {
          '&:before': {
            opacity: 1,
          },
        },
      },
    },
  },
});
export default simplebar;
