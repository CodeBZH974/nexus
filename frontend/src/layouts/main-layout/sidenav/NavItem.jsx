import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink, useLocation } from 'react-router';
import { Badge, Box, Chip, Collapse, badgeClasses } from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon, { listItemIconClasses } from '@mui/material/ListItemIcon';
import ListItemText, { listItemTextClasses } from '@mui/material/ListItemText';
import DocSearch from 'layouts/main-layout/sidenav/doc-search/DocSearch';
import { cssVarRgba } from 'lib/utils';
import { useBreakpoints } from 'providers/BreakpointsProvider';
import { useSettingsContext } from 'providers/SettingsProvider';
import { COLLAPSE_NAVBAR } from 'reducers/SettingsReducer';
import paths from 'routes/paths';
import IconifyIcon from 'components/base/IconifyIcon';
import { useNavContext } from '../NavProvider';
import NavItemPopper from './NavItemPopper';

const NavItem = ({ item, level }) => {
  const { t } = useTranslation();
  const [anchorEl, setAnchorEl] = useState(null);
  const [openPopperMenu, setOpenPopperMenu] = useState(false);
  const { pathname } = useLocation();
  const { setOpenItems, openItems, isNestedItemOpen } = useNavContext();
  const { currentBreakpoint, up } = useBreakpoints();
  const upMd = up('md');
  const upLg = up('lg');
  const {
    config: { sidenavCollapsed, sidenavType, navColor, openNavbarDrawer },
    configDispatch,
    handleDrawerToggle,
  } = useSettingsContext();

  const hasNestedItems = useMemo(() => Object.prototype.hasOwnProperty.call(item, 'items'), [item]);
  const isStackedSideNav = useMemo(() => upMd && sidenavType === 'stacked', [sidenavType, upMd]);

  const expandIcon = (
    <IconifyIcon
      icon="material-symbols:expand-more-rounded"
      className="expand-icon"
      sx={[
        {
          fontSize: 12,
          transition: (theme) =>
            theme.transitions.create('transform', {
              duration: theme.transitions.duration.shorter,
            }),
        },
        openItems[level] === item.pathName && {
          transform: 'rotate(180deg)',
        },
        sidenavCollapsed &&
          !isStackedSideNav && {
            transform: (theme) =>
              theme.direction === 'rtl' ? 'rotate(-270deg)' : 'rotate(270deg)',
            position: 'absolute',
            right: 8,
          },
      ]}
    />
  );

  const toggleCollapseItem = () => {
    if (!hasNestedItems) {
      if (openNavbarDrawer) {
        handleDrawerToggle();
      } else if (!upLg && !sidenavCollapsed) {
        configDispatch({ type: COLLAPSE_NAVBAR });
      }
      return;
    }

    if (!sidenavCollapsed || isStackedSideNav) {
      if (hasNestedItems) {
        if (openItems[level] === item.pathName) {
          setOpenItems(openItems.slice(0, level));
        } else {
          const updatedOpenItems = [...openItems];
          updatedOpenItems[level] = item.pathName;
          setOpenItems(updatedOpenItems);
        }
      }
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
    setOpenPopperMenu(false);
  };

  const handleMouseEnter = (event) => {
    setAnchorEl(event.currentTarget);
    setOpenPopperMenu(true);
  };

  useEffect(() => {
    if (isNestedItemOpen(item.items)) {
      setOpenItems((prev) => {
        const updatedOpenItems = [...prev];
        updatedOpenItems[level] = item.pathName;
        return updatedOpenItems;
      });
    }
  }, [currentBreakpoint]);

  return (
    <>
      <ListItem key={item.pathName} disablePadding sx={[isStackedSideNav && { mb: 0.25 }]}>
        <ListItemButton
          component={item.items ? 'div' : NavLink}
          to={item.path}
          onClick={toggleCollapseItem}
          onMouseEnter={sidenavCollapsed ? handleMouseEnter : undefined}
          onMouseLeave={sidenavCollapsed ? handleClose : undefined}
          aria-expanded={openPopperMenu}
          selected={
            pathname !== paths.comingSoon &&
            (pathname === item.path ||
              (item.selectionPrefix && pathname.includes(item.selectionPrefix)) ||
              (sidenavCollapsed && sidenavType === 'default' && isNestedItemOpen(item.items)) ||
              (openItems[level] !== item.pathName && isNestedItemOpen(item.items)))
          }
          sx={[
            {
              '&.Mui-selected': {
                [`& .${listItemTextClasses.primary}`]: {
                  color: 'primary.main',
                },
              },
            },
            !item.active && {
              [`& .${listItemTextClasses.primary}`]: {
                color: ({ palette }) =>
                  navColor === 'vibrant'
                    ? `${palette.vibrant.text.disabled} !important`
                    : 'text.disabled',
              },
              [`& .${listItemIconClasses.root}`]: {
                color: ({ palette }) =>
                  navColor === 'vibrant'
                    ? `${palette.vibrant.text.disabled} !important`
                    : 'text.disabled',
              },
            },
            sidenavCollapsed &&
              !isStackedSideNav && {
                flexDirection: 'column',
                justifyContent: 'flex-start',
                alignItems: 'center',
                textAlign: 'center',
                p: 1,
              },
            (!sidenavCollapsed || level !== 0) &&
              ((theme) => ({
                minWidth: !isStackedSideNav ? 180 : 'auto',
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'center',
                textAlign: 'left',
                p: theme.spacing('3.5px', 2),
              })),
            openPopperMenu && {
              backgroundColor: ({ vars }) =>
                level === 0 && navColor === 'vibrant'
                  ? cssVarRgba(vars.palette.primary.mainChannel, 0.36)
                  : 'action.hover',
            },
          ]}
        >
          {item.icon && !isStackedSideNav && (
            <Badge
              variant="dot"
              color="warning"
              invisible={sidenavCollapsed && (item.hasNew || item.new) ? false : true}
              sx={{
                [`& .${badgeClasses.badge}`]: {
                  top: 4,
                  right: -8,
                  transition: 'none',
                },
              }}
            >
              <ListItemIcon
                sx={{
                  '& .iconify': {
                    fontSize: sidenavCollapsed ? 24 : 14,
                  },
                }}
              >
                <IconifyIcon icon={item.icon} sx={item.iconSx} />
              </ListItemIcon>
            </Badge>
          )}

          <Box
            sx={[
              {
                flex: 1,
                width: '100%',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              },
              level === 0 &&
                sidenavCollapsed && {
                  px: 1,
                },
            ]}
          >
            <ListItemText
              sx={{
                [`& .${listItemTextClasses.primary}`]: {
                  typography: 'caption',
                  fontWeight: 'medium',
                  lineHeight: 1.3,
                  color: level === 0 ? 'text.primary' : 'text.secondary',
                  ...(!sidenavCollapsed || level > 0 || isStackedSideNav
                    ? { whiteSpace: 'nowrap' }
                    : { whiteSpace: 'normal', lineClamp: 1, wordBreak: 'break-all' }),
                },
              }}
            >
              {(!sidenavCollapsed || level > 0 || isStackedSideNav) && item.hasNew ? (
                <Badge
                  variant="dot"
                  color="warning"
                  sx={{ [`& .${badgeClasses.badge}`]: { top: 6, right: -8 } }}
                >
                  {t(item.key || item.name)}
                </Badge>
              ) : (
                t(item.key || item.name)
              )}

              {item.new && (!sidenavCollapsed || level > 0 || isStackedSideNav) && (
                <Chip
                  size="xsmall"
                  label="new"
                  color="warning"
                  sx={{ textTransform: 'capitalize', ml: 1 }}
                />
              )}
            </ListItemText>

            {hasNestedItems && expandIcon}
          </Box>
          {hasNestedItems && sidenavCollapsed && !isStackedSideNav && (
            <NavItemPopper
              handleClose={handleClose}
              anchorEl={anchorEl}
              open={!!anchorEl && openPopperMenu}
              level={level + 1}
            >
              {(item.pathName === 'doc-guide' || item.pathName === 'doc-components') &&
                openPopperMenu && <DocSearch key={item.name} filterGroup={item.name} />}
              <List
                dense
                disablePadding
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '2px',
                }}
              >
                {item.items.map((nestedItem) => (
                  <NavItem key={nestedItem.pathName} item={nestedItem} level={level + 1} />
                ))}
              </List>
            </NavItemPopper>
          )}
        </ListItemButton>
      </ListItem>

      {hasNestedItems && (!sidenavCollapsed || isStackedSideNav) && (
        <NavItemCollapse item={item} level={level} />
      )}
    </>
  );
};

export default NavItem;

const NavItemCollapse = ({ item, level }) => {
  const { openItems } = useNavContext();

  return (
    <Collapse in={openItems[level] === item.pathName} timeout="auto" unmountOnExit>
      <List
        dense
        disablePadding
        sx={{ pl: level === 0 ? 4 : 2, display: 'flex', flexDirection: 'column', gap: '2px' }}
      >
        {item.items.map((nestedItem) => (
          <NavItem key={nestedItem.pathName} item={nestedItem} level={level + 1} />
        ))}
      </List>
    </Collapse>
  );
};
