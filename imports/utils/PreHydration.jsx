import { Meteor } from 'meteor/meteor';
import React from 'react';
import serialize from 'serialize-javascript';

/*
  Helper function to inject content from an input function as setContentFn on the client before hydration to resolve mismatches with SSR edge cases
  It delays setContentFn on the server render by serializing the function as an inline <script> so that it is executed on the client browser immediately before hydration
  to match with the client's setContentFn (without <script>) on hydration. Sanitised via serialize-javascript to reduce XSS potential on setContentFn's arguments
  dependencies is an object of all varName: varValue used to substitute each varName occurrence in setContentFn with its varValue in the inline script since serializing a function loses its original scope values
*/
export const injectPreHydration = (
  setContentFn, // function that sets the content before hydration to be serialized within inline script and when hydrated to match the same
  dependencies = {}, // object of {varName: varValue, ...} for unscoped variables dependencies on function serialization variable value substitution
  wrapSpan = false // whether the content should be wrapped with <span>...</span>, set as true to fix DOM structure hydration mismatch by ensuring both results are within same structure
) => {
  const injection = () => {
    if (Meteor.isClient) return setContentFn(); // Client on hydration simply returns setContentFn result, the rest is for server render only to serialize it as inline script

    // Serialize setContentFn body with all dependent (unscoped) variables substituted by its (sanitised) value in place so that it uses the value rather than its name in the inline script
    const setContentFnSerializedBody = Object.keys(dependencies).reduce(
      (body, varName) =>
        body.replace(varName, serialize(dependencies[varName])), // Each occurrence of dependent variables gets replaced with its value (serialized) since it's unscoped
      serialize(setContentFn).replace(/^function(\({|[^{])*|^.*?=>/s, '') // Regex pattern: strips function signature to get its body content only so that it works with different types (arrow etc).
    );

    // Inline script as literal string to inject and execute setContentFn in <script> on the client before hydration, sanitised via serialize-javascript
    const inlineScript = `
      (function() {
        const script = document.currentScript; // Reference to this <script> element on the DOM
        
        // Set content before <script> by running the setContentFn() in the client's browser rather than the server render
        script && (script.before(
          (() => ${setContentFnSerializedBody})()
        ));
        
        // Remove itself <script> to clean up DOM and avoid mismatch on hydration (as it won't have the <script>) 
        script && script.remove();
      })();
    `;

    return <script dangerouslySetInnerHTML={{ __html: inlineScript }} />; // Server render the script where it will execute setContentFn on the client before hydration to match client's setContentFn
  };

  return wrapSpan ? <span>{injection()}</span> : injection(); // return content of injection() either with wrapSpan or not
};
