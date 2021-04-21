import React from 'react';
import { useHistory } from 'react-router';
import { OpenshiftStreams } from './OpenshiftStreams';
import { AlertProvider } from '@app/common/MASAlerts/MASAlerts';
import { ApiContext } from '@app/api/ApiContext';

declare const __BASE_PATH__: string;

export const OpenshiftStreamsConnected = () => {
  const history = useHistory();

  const getConnectToRoutePath = (kafka, routePath) => {
    return history.createHref({ pathname: `/${routePath}` });
  };

  const onConnectToRoute = (kafka, routePath) => {
    history.push(`/${routePath}`);
  };

  return (
    <ApiContext.Provider
      value={{
        basePath: __BASE_PATH__,
      }}
    >
      <AlertProvider>
        <OpenshiftStreams
          onConnectToRoute={onConnectToRoute}
          getConnectToRoutePath={getConnectToRoutePath}
          preCreateInstance={(open) => Promise.resolve(open)}
          createDialogOpen={() => false}
          tokenEndPointUrl="fake-token-url"
        />
      </AlertProvider>
    </ApiContext.Provider>
  );
};