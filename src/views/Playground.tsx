import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  Spinner,
  Text,
  VStack,
} from '@chakra-ui/react';
import { useMachine } from '@xstate/react';
import React from 'react';
import { stopLightMachine } from 'src/machines/stopLightMachine';
import {
  decrement,
  increment,
  incrementAndLog,
} from 'src/store/counter/counter.actions';
import { selectCount } from 'src/store/counter/counter.reducers';
import { fetchUser } from 'src/store/user/user.actions';
import {
  selectIsUserLoading,
  selectUserName,
} from 'src/store/user/user.reducers';
import { useAppDispatch, useAppSelector } from 'src/utils/redux-hooks';

export function Playground(): JSX.Element {
  const dispatch = useAppDispatch();
  const currentCount = useAppSelector(selectCount);
  const userName = useAppSelector(selectUserName);
  const isLoading = useAppSelector(selectIsUserLoading);
  const [current] = useMachine(stopLightMachine);
  React.useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);
  const messageAndRetryBtn = (
    <>
      <Text>Name Unknown</Text>{' '}
      <Box>
        <Button onClick={() => dispatch(fetchUser())}>Retry</Button>
      </Box>
    </>
  );
  return (
    <Box p='6'>
      <VStack alignItems='start' spacing='5'>
        <Box>
          <Heading mb='3' variant='2xl'>
            Redux Example
          </Heading>
          <Box>
            {!isLoading ? userName ?? messageAndRetryBtn : <Spinner />}
            <br />
            {currentCount}
            <Button onClick={() => dispatch(increment())}>Increment</Button>
            <Button onClick={() => dispatch(incrementAndLog())}>
              Increment and Log
            </Button>
            <Button onClick={() => dispatch(decrement())}>Decrement</Button>
          </Box>
        </Box>
        <Divider />
        <Box>
          <Heading mb='3' variant='2xl'>
            XState Example
          </Heading>
          <Flex
            h={150}
            w={150}
            justifyContent='center'
            alignItems='center'
            backgroundColor={current.context.colorSwatchValue}
            textAlign='center'
          >
            current state:
            <br /> {current.value}
          </Flex>
        </Box>
      </VStack>
    </Box>
  );
}
