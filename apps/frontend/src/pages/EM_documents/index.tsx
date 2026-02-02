import Copyright from '@/components/Copyright';
import DefaultLayout from '@/layouts/default-layout';
import { Container, Typography } from '@mui/material';
export default function App() {
  return (
    <DefaultLayout>  
     <Container maxWidth="sm">
        <div className="my-4 text-center">
          <Typography variant="h4" component="h1" className='m-auto'>
            COMING SOON
          </Typography>
          <Copyright />
        </div>
      </Container>
    </DefaultLayout>
  );
}