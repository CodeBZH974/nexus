import { useState } from 'react';
import { Box, Button, Stack, Typography } from '@mui/material';
import IconifyIcon from 'components/base/IconifyIcon';
import AccountDialog from '../common/AccountDialog';
import InfoCard from '../common/InfoCard';

const Biometrics = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Stack direction="column" spacing={2}>
        <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
          Manage Touch ID Features
        </Typography>
        <Stack direction="column" spacing={1}>
          {Array.from({ length: 3 }).map((_, index) => (
            <InfoCard
              key={index}
              sx={{
                alignItems: 'center',
                '&:hover': {
                  cursor: 'pointer',
                  bgcolor: 'background.elevation2',
                  '& .iconify': {
                    visibility: 'visible',
                  },
                },
              }}
            >
              <Stack spacing={2} sx={{ alignItems: 'center' }}>
                <IconifyIcon icon="material-symbols-light:fingerprint" sx={{ fontSize: 40 }} />
                <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                  Fingerprint {index + 1}
                </Typography>
              </Stack>
              <IconifyIcon
                icon="material-symbols:delete-outline-rounded"
                sx={{ fontSize: 20, color: 'neutral.dark', visibility: 'hidden' }}
              />
            </InfoCard>
          ))}
        </Stack>
        <Button
          variant="soft"
          color="neutral"
          fullWidth
          startIcon={<IconifyIcon icon="material-symbols:add" sx={{ fontSize: 20 }} />}
          onClick={() => setOpen(true)}
        >
          Add Fingerprint
        </Button>
      </Stack>
      <AccountDialog
        open={open}
        handleDialogClose={() => setOpen(false)}
        title="Add Fingerprint"
        subtitle="Touch ID enrollment was interrupted"
        handleDiscard={() => setOpen(false)}
        handleConfirm={() => setOpen(false)}
        sx={{ width: 1 }}
      >
        <Stack
          direction="column"
          spacing={1}
          sx={{
            alignItems: 'center',
          }}
        >
          <Box
            sx={{
              position: 'relative',
              height: 120,
              width: 120,
              border: '4px solid',
              borderColor: 'success.main',
              borderRadius: '50%',
            }}
          >
            <IconifyIcon
              icon="material-symbols-light:fingerprint"
              sx={{
                fontSize: 80,
                color: 'success.main',
                position: 'absolute',
                top: 15,
                left: 15,
              }}
            />
          </Box>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Your fingerprint can be used to unlock your account
          </Typography>
        </Stack>
      </AccountDialog>
    </>
  );
};

export default Biometrics;
