import React from 'react';
import { injectPreHydration } from '/imports/utils/PreHydration';

// Helper function to format locale datetime as string which works with SSR via injectPreHydration utils to server render inline <script> that immediately sets on the client browser before hydration!
export const toLocale = (
  dateObj, // Date Object
  format = 'DateTime', // 'DateTime', 'Date', 'Time', 'DateTimeShort', 'DateLong', 'DateTimeLong' -- Long formats dateStyle: 'long'
  options = { dateStyle: 'short', timeStyle: 'short' }, // Format options, overridable but can just be omitted
  locales = '' // User's locale, overridable but can just be omitted
) => {
  const formatMethod = (() => {
    switch (format) {
      case 'Date':
      case 'DateLong':
        if (options.timeStyle) delete options.timeStyle; // Remove timeStyle for 'Date' & 'DateLong'
        return 'toLocaleDateString';
      case 'Time':
        if (options.dateStyle) delete options.dateStyle; // Remove dateStyle for 'Time'
        return 'toLocaleTimeString';
      default: // Default 'DateTime'
        if (format == 'DateTimeShort') {
          options = {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          };
        }

        return 'toLocaleString';
    }
  })();

  if (['DateLong', 'DateTimeLong'].includes(format)) options.dateStyle = 'long'; // '...Long' formats dateStyle: 'long'

  // Use injectPreHydration utils to set locale string after server render but before hydration so that it matches to resolve timezone SSR mismatch
  return injectPreHydration(
    () =>
      dateObj[formatMethod](!locales ? navigator.language : locales, options),
    {
      dateObj, // pass unscoped variables dependencies on function serialization
      formatMethod,
      locales,
      options
    }
  );
};
