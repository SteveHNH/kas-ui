import React from 'react';
import { OpenshiftStreams, OpenShiftStreamsProps } from '@app/modules/OpenshiftStreams/OpenshiftStreams';
import { AuthContext, IAuthContext } from '@app/auth/AuthContext';
import { AlertVariant } from '@patternfly/react-core';
import { AlertContext, AlertContextProps } from '@app/common/MASAlerts/MASAlerts';
import { ApiContext } from '@app/api/ApiContext';
import { BrowserRouter } from 'react-router-dom';
import kasi18n from '../../../i18n/i18n';
import { I18nextProvider } from 'react-i18next';

// Version of OpenshiftStreams for federation

export type OpenshiftStreamsFederatedProps = OpenShiftStreamsProps & {
  getToken: () => Promise<string>;
  getUsername: () => Promise<string>;
  addAlert: (message: string, variant?: AlertVariant) => void;
  basePath: string;
};

const OpenshiftStreamsFederated = ({
  getUsername,
  getToken,
  onConnectToRoute,
  getConnectToRoutePath,
  addAlert,
  basePath,
  preCreateInstance,
  createDialogOpen,
  tokenEndPointUrl,
}: OpenshiftStreamsFederatedProps) => {
  const authContext = {
    getToken,
    getUsername,
  } as IAuthContext;

  const alertContext = {
    addAlert,
  } as AlertContextProps;

  return (
    // TODO don't add BrowserRouter here - see  https://github.com/bf2fc6cc711aee1a0c2a/mk-ui-frontend/issues/74
    <BrowserRouter>
      <I18nextProvider i18n={kasi18n}>
        <ApiContext.Provider
          value={{
            basePath: basePath,
          }}
        >
          <AlertContext.Provider value={alertContext}>
            <AuthContext.Provider value={authContext}>
              <OpenshiftStreams
                onConnectToRoute={onConnectToRoute}
                getConnectToRoutePath={getConnectToRoutePath}
                preCreateInstance={preCreateInstance}
                createDialogOpen={createDialogOpen}
                tokenEndPointUrl={tokenEndPointUrl}
              />
            </AuthContext.Provider>
          </AlertContext.Provider>
        </ApiContext.Provider>
      </I18nextProvider>
    </BrowserRouter>
  );
};

export default OpenshiftStreamsFederated;