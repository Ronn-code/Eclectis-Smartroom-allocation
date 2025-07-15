// material-ui
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// project imports
import MainCard from 'components/MainCard';
import AnalyticEcommerce from 'components/cards/statistics/AnalyticEcommerce';
import OrdersTable from 'sections/dashboard/default/OrdersTable';


import avatar1 from 'assets/images/users/avatar-1.png';
import avatar2 from 'assets/images/users/avatar-2.png';
import avatar3 from 'assets/images/users/avatar-3.png';
import avatar4 from 'assets/images/users/avatar-4.png';

// avatar style
const avatarSX = {
  width: 36,
  height: 36,
  fontSize: '1rem'
};

// action style
const actionSX = {
  mt: 0.75,
  ml: 1,
  top: 'auto',
  right: 'auto',
  alignSelf: 'flex-start',
  transform: 'none'
};



export default function DashboardDefault() {
  return (
    <Grid container rowSpacing={4.5} columnSpacing={2.75}>
      {/* row 1 */}
      <Grid sx={{ mb: -2.25 }} size={12}>
        <Typography variant="h5">Dashboard</Typography>
      </Grid>
      <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
        <AnalyticEcommerce title="Total Active Users" count="4,006" />
      </Grid>
      <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
        <AnalyticEcommerce title="Total Rooms Available" count="10,250"/>
      </Grid>
      <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
        <AnalyticEcommerce title="Upcoming Bookings" count="18,800" />
      </Grid>
      <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
        <AnalyticEcommerce title="Upcoming Bookings" count="18,800" />
      </Grid>
      
      <Grid sx={{ display: { sm: 'none', md: 'block', lg: 'none' } }} size={{ md: 8 }} />
      {/* row 3 */}
      <Grid size={{ xs: 12, md: 6, lg: 12 }}>
        <MainCard sx={{ mt: 2 }} content={false}>
          <OrdersTable />
        </MainCard>
      </Grid>            
      <Grid container spacing={2} sx={{ mt: 2 }}>
     <Grid item xs={12} md={6}>
    <MainCard>
      <Stack sx={{ gap: 6 }}>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item>
            <Stack>
              <Typography variant="h5" noWrap>
                Help & Support Chat
              </Typography>
              <Typography variant="caption" color="secondary" noWrap>
                Typical replay within 5 min
              </Typography>
            </Stack>
          </Grid>
          <Grid item>
            <AvatarGroup sx={{ '& .MuiAvatar-root': { width: 32, height: 32 } }}>
              <Avatar alt="Remy Sharp" src={avatar1} />
              <Avatar alt="Travis Howard" src={avatar2} />
              <Avatar alt="Cindy Baker" src={avatar3} />
              <Avatar alt="Agnes Walker" src={avatar4} />
            </AvatarGroup>
          </Grid>
        </Grid>
        <Button size="small" variant="contained" sx={{ textTransform: 'capitalize' }}>
          Need Help?
        </Button>
      </Stack>
    </MainCard>
  </Grid>
  </Grid>
</Grid>
    
  );
}
