import React, { useState, useEffect } from 'react';
import { MASAlertToastGroup } from './MASAlertToastGroup';
import { AlertContext, AlertProps } from '@bf2/ui-shared';

type TimeOut = {
  key: string | undefined;
  timeOut: NodeJS.Timeout | undefined;
};

export const AlertProvider: React.FunctionComponent = ({ children }) => {
  const [alerts, setAlerts] = useState<AlertProps[]>([]);
  const [timers, setTimers] = useState<TimeOut[]>([]);

  useEffect(() => {
    const timersKeys = timers.map((timer) => timer.key);
    const timeOuts = alerts
      .filter((alert) => !timersKeys.includes(alert?.id))
      .map((alert) => {
        const { id = '' } = alert;
        const timeOut = setTimeout(() => hideAlert(id), 8000);
        return { key: alert.id, timeOut };
      });
    setTimers([...timers, ...timeOuts]);
    return () => timers.forEach((timer) => timer?.timeOut && clearTimeout(timer.timeOut));
  }, [alerts]);

  const createId = () => new Date().getTime();

  const hideAlert = (key: string) => {
    setAlerts((alerts) => [...alerts.filter((el) => el.id !== key)]);
    setTimers((timers) => [...timers.filter((timer) => timer.key === key)]);
  };

  const addAlert = (props: AlertProps) => {
    const id = createId().toString();
    setAlerts([...alerts, { ...props, id }]);
  };

  return (
    <AlertContext.Provider value={{ addAlert }}>
      <MASAlertToastGroup alerts={alerts} onCloseAlert={hideAlert} />
      {children}
    </AlertContext.Provider>
  );
};
