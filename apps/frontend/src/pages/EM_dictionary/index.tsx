import Copyright from '@/components/Copyright';
import DefaultLayout from '@/layouts/default-layout';
import { Container } from '@mui/material';
import DictionaryLookup from './DictionaryLookup';
export default function App() {
  return (
    <DefaultLayout>
      <Container maxWidth="xl">
        <div className="my-4 text-center">
          <DictionaryLookup />
          <Copyright />
        </div>
      </Container>
    </DefaultLayout>
  );
}
