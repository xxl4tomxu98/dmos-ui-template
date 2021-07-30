import { Box, Button, Heading, useDisclosure } from '@chakra-ui/react';
import { ErrorDrawer } from 'src/components/ErrorDrawer';

export function Home(): JSX.Element {
  const { isOpen, onClose, onOpen } = useDisclosure();
  return (
    <Box>
      <Heading as='h1'>Startpack Homepage</Heading>
      <Button onClick={onOpen}>Open Drawer</Button>
      <ErrorDrawer isOpen={isOpen} closeDrawerFn={onClose} />
    </Box>
  );
}
