import { useEffect } from 'react';
import TelemetryDeck from '@telemetrydeck/sdk';
import Bowser from 'bowser';
import { getCountry } from '../utils/getCountryFromTz';
import { hash } from 'three/examples/jsm/nodes/Nodes.js';

const getRandomIdentifier = () => {
  return (
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15)
  );
};
const appID = process.env.NEXT_PUBLIC_TELEMETRY_DECK_APP_ID!;
const isLocal = process.env.NEXT_PUBLIC_ENV === 'local';
const signalForLocal = true; // for testing purposes - turn on locally to test signals
const td = new TelemetryDeck({
  appID: appID,
  clientUser: 'anonymous',
  testMode: isLocal,
});

export const useTelemetryDeck = () => {
  useEffect(() => {
    if (isLocal && !signalForLocal) return;

    // randomize user id
    // only allow it to be good for this month then reset
    const dateRecorded = Number(
      localStorage.getItem('userIdDateSet') || Date.now()
    );
    const date = new Date(dateRecorded);
    const year = date.getFullYear();
    const month = date.getMonth();
    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth();
    if (year !== currentYear || month !== currentMonth) {
      localStorage.removeItem('userId');
      localStorage.setItem('userIdDateSet', Date.now().toString());
    }
    const userId = localStorage.getItem('userId') || getRandomIdentifier();
    localStorage.setItem('userId', userId);

    // track the bare minimum: Ie "Apple Desktop, United States of America"
    // we can do without language, versions, or even browser
    const browser = Bowser.getParser(window.navigator.userAgent);
    const platform = browser.getPlatform() || '';
    const vendor = platform.vendor || '';
    const device = platform.type || '';
    const isIpad =
      device !== 'mobile' && vendor === 'Apple' && 'ontouchend' in document;
    const searchParams = new URLSearchParams(window.location.search);
    td.clientUser = userId; // not associated with any other data
    td.signal('LoadedHomePage', {
      'country or tz': getCountry(), // trying to obscure tz by using country - not using ip sniffing uses tz
      device: isIpad ? 'tablet' : device,
      // Site specific data:
      filteredBrowser: searchParams.get('browsers'), // what browsers are filtered?
      filteredSpecs: searchParams.get('specsOff'), // what specs are filtered?
      feature: window.location.hash, // which feature?
    });
  }, []);
};
