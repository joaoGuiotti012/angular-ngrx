// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
export const LOCAL_CART = 'products_cart';

export const environment = {
  production: false,
  URL_API: "http://localhost:3000",
  FIRBASE_API_KEY: 'AIzaSyA9HEOZrRHZP026VQObeDz2PVD_GLpMV50',
};

enum ToasterPosition {
  topRight = 'toast-top-right',
  topLeft = 'toast-top-left',
  bottomRight = 'toast-bottom-right',
  bottomLeft= 'toast-bottom-left',
  // Other positions you would like
}
export const TOAST_CONFIG: any = {
  timeOut: 1000,
  progressBar: true,
  progressAnimation: 'increasing',
  positionClass: ToasterPosition.bottomRight
}

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
