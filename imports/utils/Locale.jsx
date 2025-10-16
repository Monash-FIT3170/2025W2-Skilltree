import { Meteor } from 'meteor/meteor';
import React from 'react';
import serialize from 'serialize-javascript';

// Helper function to format locale datetime as string which works with SSR via server rendering inline <script> to immediately set on the client browser before hydration!
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
  if (Meteor.isClient && !locales) locales = navigator.language; // Set default value to the user's locale on the client if not given
  const localeString = () => dateObj[formatMethod](locales, options); // Convert to string by input arguments on the client

  // Define client side inline script as literal string to inject before hydration, sanitised via serialize-javascript
  const inlineScript = `
    (function() {
      const script = document.currentScript; // Reference to this <script> element on the DOM

      // Pass arguments as serialized strings (sanitised) on server render for the client
      const inlineDateObj = ${serialize(dateObj)};
      const inlineFormatMethod = ${serialize(formatMethod)};
      const inlineLocales = !${serialize(locales)} ? navigator.language : ${serialize(locales)};
      const inlineOptions = ${serialize(options)};

      // Set the localeString before <script> using the client's browser locale rather than the server's
      script && (script.before(inlineDateObj[inlineFormatMethod](inlineLocales, inlineOptions)));
      
      // Remove itself <script> to clean up DOM and avoid hydration mismatch
      script && script.remove();
    })();
  `;

  return (
    <>
      {Meteor.isClient && localeString()}
      {Meteor.isServer && (
        <script dangerouslySetInnerHTML={{ __html: inlineScript }} />
      )}
    </>
  );
};
