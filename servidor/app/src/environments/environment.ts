// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

const BASE_URL_API = 'http://134.122.8.119/api';
export const environment = {
  production: false,
  alerts_base_url: BASE_URL_API + '/alerts',
  configs_base_url: BASE_URL_API + '/configs',
  pets_base_url: BASE_URL_API + '/pets',
  tracks_base_url: BASE_URL_API + '/tracks',
  maps_api_key: 'AIzaSyACSBM2eHWCy-hqNmQAtEI8Nwws3yJGhJM',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
